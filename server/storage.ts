import { 
  users, products, orders, orderItems, cartItems,
  type User, type InsertUser,
  type Product, type InsertProduct,
  type Order, type InsertOrder,
  type OrderItem, type InsertOrderItem,
  type CartItem, type InsertCartItem
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, sql } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByClerkId(clerkId: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<InsertUser>): Promise<User | undefined>;

  // Product methods
  getAllProducts(): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, updates: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: string): Promise<boolean>;
  getFeaturedProducts(): Promise<Product[]>;
  searchProducts(query: string): Promise<Product[]>;

  // Cart methods
  getCartItems(userId: string): Promise<CartItem[]>;
  addToCart(cartItem: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: string, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: string): Promise<boolean>;
  clearCart(userId: string): Promise<boolean>;

  // Order methods
  createOrder(order: InsertOrder, items: InsertOrderItem[]): Promise<Order>;
  getUserOrders(userId: string): Promise<Order[]>;
  getOrder(id: string): Promise<Order | undefined>;
  getAllOrders(): Promise<Order[]>;
  updateOrderStatus(id: string, status: string): Promise<Order | undefined>;
  getOrderItems(orderId: string): Promise<OrderItem[]>;

  // Admin stats
  getAdminStats(): Promise<{
    totalProducts: number;
    totalOrders: number;
    totalRevenue: number;
    totalCustomers: number;
  }>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByClerkId(clerkId: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.clerkId, clerkId));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async updateUser(id: string, updates: Partial<InsertUser>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set(updates)
      .where(eq(users.id, id))
      .returning();
    return user || undefined;
  }

  // Product methods
  async getAllProducts(): Promise<Product[]> {
    return await db.select().from(products).orderBy(desc(products.createdAt));
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return await db
      .select()
      .from(products)
      .where(eq(products.category, category as any))
      .orderBy(desc(products.createdAt));
  }

  async getProduct(id: string): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product || undefined;
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const [product] = await db.insert(products).values(insertProduct).returning();
    return product;
  }

  async updateProduct(id: string, updates: Partial<InsertProduct>): Promise<Product | undefined> {
    const [product] = await db
      .update(products)
      .set(updates)
      .where(eq(products.id, id))
      .returning();
    return product || undefined;
  }

  async deleteProduct(id: string): Promise<boolean> {
    const result = await db.delete(products).where(eq(products.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return await db
      .select()
      .from(products)
      .where(eq(products.featured, true))
      .limit(8);
  }

  async searchProducts(query: string): Promise<Product[]> {
    return await db
      .select()
      .from(products)
      .where(sql`${products.name} ILIKE ${'%' + query + '%'} OR ${products.description} ILIKE ${'%' + query + '%'}`)
      .orderBy(desc(products.createdAt));
  }

  // Cart methods
  async getCartItems(userId: string): Promise<CartItem[]> {
    return await db
      .select()
      .from(cartItems)
      .where(eq(cartItems.userId, userId))
      .orderBy(desc(cartItems.createdAt));
  }

  async addToCart(insertCartItem: InsertCartItem): Promise<CartItem> {
    // Check if item already exists in cart
    const [existingItem] = await db
      .select()
      .from(cartItems)
      .where(
        and(
          eq(cartItems.userId, insertCartItem.userId),
          eq(cartItems.productId, insertCartItem.productId),
          eq(cartItems.size, insertCartItem.size || '')
        )
      );

    if (existingItem) {
      // Update quantity
      const [updatedItem] = await db
        .update(cartItems)
        .set({ quantity: existingItem.quantity + insertCartItem.quantity })
        .where(eq(cartItems.id, existingItem.id))
        .returning();
      return updatedItem;
    } else {
      // Create new cart item
      const [cartItem] = await db.insert(cartItems).values(insertCartItem).returning();
      return cartItem;
    }
  }

  async updateCartItem(id: string, quantity: number): Promise<CartItem | undefined> {
    const [cartItem] = await db
      .update(cartItems)
      .set({ quantity })
      .where(eq(cartItems.id, id))
      .returning();
    return cartItem || undefined;
  }

  async removeFromCart(id: string): Promise<boolean> {
    const result = await db.delete(cartItems).where(eq(cartItems.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async clearCart(userId: string): Promise<boolean> {
    const result = await db.delete(cartItems).where(eq(cartItems.userId, userId));
    return (result.rowCount ?? 0) >= 0;
  }

  // Order methods
  async createOrder(insertOrder: InsertOrder, items: InsertOrderItem[]): Promise<Order> {
    const [order] = await db.insert(orders).values(insertOrder).returning();
    
    // Insert order items
    const orderItemsWithOrderId = items.map(item => ({ ...item, orderId: order.id }));
    await db.insert(orderItems).values(orderItemsWithOrderId);
    
    return order;
  }

  async getUserOrders(userId: string): Promise<Order[]> {
    return await db
      .select()
      .from(orders)
      .where(eq(orders.userId, userId))
      .orderBy(desc(orders.createdAt));
  }

  async getOrder(id: string): Promise<Order | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    return order || undefined;
  }

  async getAllOrders(): Promise<Order[]> {
    return await db.select().from(orders).orderBy(desc(orders.createdAt));
  }

  async updateOrderStatus(id: string, status: string): Promise<Order | undefined> {
    const [order] = await db
      .update(orders)
      .set({ status: status as any, updatedAt: new Date() })
      .where(eq(orders.id, id))
      .returning();
    return order || undefined;
  }

  async getOrderItems(orderId: string): Promise<OrderItem[]> {
    return await db
      .select()
      .from(orderItems)
      .where(eq(orderItems.orderId, orderId));
  }

  // Admin stats
  async getAdminStats(): Promise<{
    totalProducts: number;
    totalOrders: number;
    totalRevenue: number;
    totalCustomers: number;
  }> {
    const [productsCount] = await db.select({ count: sql<number>`count(*)` }).from(products);
    const [ordersCount] = await db.select({ count: sql<number>`count(*)` }).from(orders);
    const [revenueSum] = await db.select({ sum: sql<number>`COALESCE(sum(${orders.total}), 0)` }).from(orders);
    const [customersCount] = await db.select({ count: sql<number>`count(*)` }).from(users);

    return {
      totalProducts: productsCount.count,
      totalOrders: ordersCount.count,
      totalRevenue: revenueSum.sum,
      totalCustomers: customersCount.count,
    };
  }
}

export const storage = new DatabaseStorage();
