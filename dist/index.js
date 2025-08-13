var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import express2 from "express";
import dotenv3 from "dotenv";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  cartItems: () => cartItems,
  cartItemsRelations: () => cartItemsRelations,
  categoryEnum: () => categoryEnum,
  insertCartItemSchema: () => insertCartItemSchema,
  insertOrderItemSchema: () => insertOrderItemSchema,
  insertOrderSchema: () => insertOrderSchema,
  insertProductSchema: () => insertProductSchema,
  insertUserSchema: () => insertUserSchema,
  orderItems: () => orderItems,
  orderItemsRelations: () => orderItemsRelations,
  orderStatusEnum: () => orderStatusEnum,
  orders: () => orders,
  ordersRelations: () => ordersRelations,
  paymentMethodEnum: () => paymentMethodEnum,
  products: () => products,
  productsRelations: () => productsRelations,
  users: () => users,
  usersRelations: () => usersRelations
});
import { sql, relations } from "drizzle-orm";
import { pgTable, text, varchar, decimal, integer, timestamp, boolean, jsonb, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var categoryEnum = pgEnum("category", [
  "leather-jackets",
  "hoodies",
  "pants",
  "womens-wear",
  "mens-wear"
]);
var orderStatusEnum = pgEnum("order_status", [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled"
]);
var paymentMethodEnum = pgEnum("payment_method", [
  "jazzcash",
  "easypaisa",
  "cod"
]);
var users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clerkId: varchar("clerk_id").notNull().unique(),
  email: text("email").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  isAdmin: boolean("is_admin").default(false),
  createdAt: timestamp("created_at").defaultNow()
});
var products = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  category: categoryEnum("category").notNull(),
  images: jsonb("images").$type().default([]),
  sizes: jsonb("sizes").$type().default([]),
  stock: integer("stock").default(0),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var orders = pgTable("orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  total: decimal("total", { precision: 10, scale: 2 }).notNull(),
  status: orderStatusEnum("status").default("pending"),
  paymentMethod: paymentMethodEnum("payment_method").notNull(),
  shippingAddress: jsonb("shipping_address").$type().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var orderItems = pgTable("order_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orderId: varchar("order_id").notNull().references(() => orders.id),
  productId: varchar("product_id").notNull().references(() => products.id),
  quantity: integer("quantity").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  size: text("size")
});
var cartItems = pgTable("cart_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  productId: varchar("product_id").notNull().references(() => products.id),
  quantity: integer("quantity").notNull(),
  size: text("size"),
  createdAt: timestamp("created_at").defaultNow()
});
var usersRelations = relations(users, ({ many }) => ({
  orders: many(orders),
  cartItems: many(cartItems)
}));
var productsRelations = relations(products, ({ many }) => ({
  orderItems: many(orderItems),
  cartItems: many(cartItems)
}));
var ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id]
  }),
  orderItems: many(orderItems)
}));
var orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id]
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id]
  })
}));
var cartItemsRelations = relations(cartItems, ({ one }) => ({
  user: one(users, {
    fields: [cartItems.userId],
    references: [users.id]
  }),
  product: one(products, {
    fields: [cartItems.productId],
    references: [products.id]
  })
}));
var insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true
});
var insertProductSchema = createInsertSchema(products).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertOrderItemSchema = createInsertSchema(orderItems).omit({
  id: true
});
var insertCartItemSchema = createInsertSchema(cartItems).omit({
  id: true,
  createdAt: true
});

// server/db.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import dotenv from "dotenv";
import ws from "ws";
dotenv.config();
neonConfig.webSocketConstructor = ws;
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var pool = new Pool({ connectionString: process.env.DATABASE_URL });
var db = drizzle({ client: pool, schema: schema_exports });

// server/storage.ts
import { eq, and, desc, sql as sql2 } from "drizzle-orm";
var DatabaseStorage = class {
  // User methods
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || void 0;
  }
  async getUserByClerkId(clerkId) {
    const [user] = await db.select().from(users).where(eq(users.clerkId, clerkId));
    return user || void 0;
  }
  async createUser(insertUser) {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  async updateUser(id, updates) {
    const [user] = await db.update(users).set(updates).where(eq(users.id, id)).returning();
    return user || void 0;
  }
  // Product methods
  async getAllProducts() {
    return await db.select().from(products).orderBy(desc(products.createdAt));
  }
  async getProductsByCategory(category) {
    return await db.select().from(products).where(eq(products.category, category)).orderBy(desc(products.createdAt));
  }
  async getProduct(id) {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product || void 0;
  }
  async createProduct(insertProduct) {
    const [product] = await db.insert(products).values(insertProduct).returning();
    return product;
  }
  async updateProduct(id, updates) {
    const [product] = await db.update(products).set(updates).where(eq(products.id, id)).returning();
    return product || void 0;
  }
  async deleteProduct(id) {
    const result = await db.delete(products).where(eq(products.id, id));
    return (result.rowCount ?? 0) > 0;
  }
  async getFeaturedProducts() {
    return await db.select().from(products).where(eq(products.featured, true)).limit(8);
  }
  async searchProducts(query) {
    return await db.select().from(products).where(sql2`${products.name} ILIKE ${"%" + query + "%"} OR ${products.description} ILIKE ${"%" + query + "%"}`).orderBy(desc(products.createdAt));
  }
  // Cart methods
  async getCartItems(userId) {
    return await db.select().from(cartItems).where(eq(cartItems.userId, userId)).orderBy(desc(cartItems.createdAt));
  }
  async addToCart(insertCartItem) {
    const [existingItem] = await db.select().from(cartItems).where(
      and(
        eq(cartItems.userId, insertCartItem.userId),
        eq(cartItems.productId, insertCartItem.productId),
        eq(cartItems.size, insertCartItem.size || "")
      )
    );
    if (existingItem) {
      const [updatedItem] = await db.update(cartItems).set({ quantity: existingItem.quantity + insertCartItem.quantity }).where(eq(cartItems.id, existingItem.id)).returning();
      return updatedItem;
    } else {
      const [cartItem] = await db.insert(cartItems).values(insertCartItem).returning();
      return cartItem;
    }
  }
  async updateCartItem(id, quantity) {
    const [cartItem] = await db.update(cartItems).set({ quantity }).where(eq(cartItems.id, id)).returning();
    return cartItem || void 0;
  }
  async removeFromCart(id) {
    const result = await db.delete(cartItems).where(eq(cartItems.id, id));
    return (result.rowCount ?? 0) > 0;
  }
  async clearCart(userId) {
    const result = await db.delete(cartItems).where(eq(cartItems.userId, userId));
    return (result.rowCount ?? 0) >= 0;
  }
  // Order methods
  async createOrder(insertOrder, items) {
    const [order] = await db.insert(orders).values(insertOrder).returning();
    const orderItemsWithOrderId = items.map((item) => ({ ...item, orderId: order.id }));
    await db.insert(orderItems).values(orderItemsWithOrderId);
    return order;
  }
  async getUserOrders(userId) {
    return await db.select().from(orders).where(eq(orders.userId, userId)).orderBy(desc(orders.createdAt));
  }
  async getOrder(id) {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    return order || void 0;
  }
  async getAllOrders() {
    return await db.select().from(orders).orderBy(desc(orders.createdAt));
  }
  async updateOrderStatus(id, status) {
    const [order] = await db.update(orders).set({ status, updatedAt: /* @__PURE__ */ new Date() }).where(eq(orders.id, id)).returning();
    return order || void 0;
  }
  async getOrderItems(orderId) {
    return await db.select().from(orderItems).where(eq(orderItems.orderId, orderId));
  }
  // Admin stats
  async getAdminStats() {
    const [productsCount] = await db.select({ count: sql2`count(*)` }).from(products);
    const [ordersCount] = await db.select({ count: sql2`count(*)` }).from(orders);
    const [revenueSum] = await db.select({ sum: sql2`COALESCE(sum(${orders.total}), 0)` }).from(orders);
    const [customersCount] = await db.select({ count: sql2`count(*)` }).from(users);
    return {
      totalProducts: productsCount.count,
      totalOrders: ordersCount.count,
      totalRevenue: revenueSum.sum,
      totalCustomers: customersCount.count
    };
  }
};
var storage = new DatabaseStorage();

// server/routes.ts
import dotenv2 from "dotenv";
import { z } from "zod";

// server/gemini.ts
import { GoogleGenAI } from "@google/genai";
var ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY || "test-key" });
async function generateAIResponse(message) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `You are a helpful fashion assistant for Stylish Hub, an e-commerce store specializing in premium leather jackets, hoodies, pants, and fashion wear for men and women. 

Your role:
- Help customers find the right products
- Provide styling advice
- Answer questions about sizing, materials, and care
- Suggest complementary items
- Assist with order-related queries
- Maintain a friendly, professional tone

Product Categories:
- Leather Jackets: Premium quality, various styles
- Hoodies: Comfortable, stylish casual wear  
- Pants: Tailored fits, designer styles
- Women's Wear: Elegant, contemporary fashion
- Men's Wear: Sharp, sophisticated styles

Keep responses concise but helpful. If you don't know specific product details, acknowledge this and suggest browsing the product catalog.

Customer message: ${message}`
            }
          ]
        }
      ]
    });
    return response.text || "I'm here to help! Could you please rephrase your question?";
  } catch (error) {
    console.error("Gemini API error:", error);
    return "I'm experiencing some technical difficulties right now. Please try again in a moment, or feel free to browse our product catalog directly.";
  }
}

// server/routes.ts
import Stripe from "stripe";
dotenv2.config();
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing required Stripe secret: STRIPE_SECRET_KEY");
}
var stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-11-20.acacia"
});
async function registerRoutes(app2) {
  app2.get("/api/products", async (req, res) => {
    try {
      const { category, search, featured } = req.query;
      let products2;
      if (featured === "true") {
        products2 = await storage.getFeaturedProducts();
      } else if (category) {
        products2 = await storage.getProductsByCategory(category);
      } else if (search) {
        products2 = await storage.searchProducts(search);
      } else {
        products2 = await storage.getAllProducts();
      }
      res.json(products2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });
  app2.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });
  app2.post("/api/admin/products", async (req, res) => {
    try {
      const productData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(productData);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ message: error?.message || "Failed to create product" });
    }
  });
  app2.put("/api/admin/products/:id", async (req, res) => {
    try {
      const updates = insertProductSchema.partial().parse(req.body);
      const product = await storage.updateProduct(req.params.id, updates);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(400).json({ message: error?.message || "Failed to update product" });
    }
  });
  app2.delete("/api/admin/products/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteProduct(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete product" });
    }
  });
  app2.get("/api/cart/:userId", async (req, res) => {
    try {
      const cartItems2 = await storage.getCartItems(req.params.userId);
      res.json(cartItems2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch cart items" });
    }
  });
  app2.post("/api/cart", async (req, res) => {
    try {
      const cartItemData = insertCartItemSchema.parse(req.body);
      const cartItem = await storage.addToCart(cartItemData);
      res.status(201).json(cartItem);
    } catch (error) {
      res.status(400).json({ message: error?.message || "Failed to add to cart" });
    }
  });
  app2.put("/api/cart/:id", async (req, res) => {
    try {
      const { quantity } = req.body;
      if (typeof quantity !== "number" || quantity < 1) {
        return res.status(400).json({ message: "Invalid quantity" });
      }
      const cartItem = await storage.updateCartItem(req.params.id, quantity);
      if (!cartItem) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      res.json(cartItem);
    } catch (error) {
      res.status(500).json({ message: "Failed to update cart item" });
    }
  });
  app2.delete("/api/cart/:id", async (req, res) => {
    try {
      const deleted = await storage.removeFromCart(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      res.json({ message: "Item removed from cart" });
    } catch (error) {
      res.status(500).json({ message: "Failed to remove cart item" });
    }
  });
  app2.delete("/api/cart/user/:userId", async (req, res) => {
    try {
      await storage.clearCart(req.params.userId);
      res.json({ message: "Cart cleared" });
    } catch (error) {
      res.status(500).json({ message: "Failed to clear cart" });
    }
  });
  app2.post("/api/orders", async (req, res) => {
    try {
      const orderSchema = insertOrderSchema.extend({
        items: z.array(z.object({
          productId: z.string(),
          quantity: z.number(),
          price: z.string(),
          size: z.string().optional()
        }))
      });
      const { items, ...orderData } = orderSchema.parse(req.body);
      const orderItems2 = items.map((item) => ({ ...item, orderId: "" }));
      const order = await storage.createOrder(orderData, orderItems2);
      await storage.clearCart(orderData.userId);
      res.status(201).json(order);
    } catch (error) {
      res.status(400).json({ message: error?.message || "Failed to create order" });
    }
  });
  app2.get("/api/orders/user/:userId", async (req, res) => {
    try {
      const orders2 = await storage.getUserOrders(req.params.userId);
      res.json(orders2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });
  app2.get("/api/orders/:id", async (req, res) => {
    try {
      const order = await storage.getOrder(req.params.id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      const orderItems2 = await storage.getOrderItems(req.params.id);
      res.json({ ...order, items: orderItems2 });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch order" });
    }
  });
  app2.get("/api/admin/orders", async (req, res) => {
    try {
      const orders2 = await storage.getAllOrders();
      res.json(orders2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });
  app2.put("/api/admin/orders/:id/status", async (req, res) => {
    try {
      const { status } = req.body;
      const order = await storage.updateOrderStatus(req.params.id, status);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: "Failed to update order status" });
    }
  });
  app2.get("/api/admin/stats", async (req, res) => {
    try {
      const stats = await storage.getAdminStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch admin stats" });
    }
  });
  app2.post("/api/users", async (req, res) => {
    try {
      const userData = req.body;
      const existingUser = await storage.getUserByClerkId(userData.clerkId);
      if (existingUser) {
        return res.json(existingUser);
      }
      const user = await storage.createUser(userData);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  app2.get("/api/users/clerk/:clerkId", async (req, res) => {
    try {
      const user = await storage.getUserByClerkId(req.params.clerkId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });
  app2.post("/api/chatbot", async (req, res) => {
    try {
      const { message } = req.body;
      if (!message) {
        return res.status(400).json({ message: "Message is required" });
      }
      const response = await generateAIResponse(message);
      res.json({ response });
    } catch (error) {
      res.status(500).json({ message: "Chatbot service temporarily unavailable" });
    }
  });
  app2.post("/api/create-payment-intent", async (req, res) => {
    try {
      const { amount, items } = req.body;
      if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
        return res.status(400).json({ error: "Invalid amount" });
      }
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(parseFloat(amount) * 100),
        // Convert to cents
        currency: "usd",
        metadata: {
          items: JSON.stringify(items)
        }
      });
      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error("Stripe payment intent error:", error);
      res.status(500).json({
        error: "Payment processing error",
        message: error?.message || "Failed to create payment intent"
      });
    }
  });
  app2.post("/api/stripe-webhook", async (req, res) => {
    try {
      const event = req.body;
      if (event.type === "payment_intent.succeeded") {
        const paymentIntent = event.data.object;
        console.log("Payment succeeded:", paymentIntent.id);
      }
      res.json({ received: true });
    } catch (error) {
      console.error("Webhook error:", error);
      res.status(400).json({ error: "Webhook processing failed" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
dotenv3.config();
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
