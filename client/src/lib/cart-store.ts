import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  size?: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  total: number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      total: 0,
      
      addItem: (item) => {
        const existingItem = get().items.find(
          (i) => i.productId === item.productId && i.size === item.size
        );
        
        if (existingItem) {
          set((state) => {
            const updatedItems = state.items.map((i) =>
              i.id === existingItem.id
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            );
            return {
              items: updatedItems,
              total: updatedItems.reduce((total, item) => total + item.price * item.quantity, 0)
            };
          });
        } else {
          const newItem = {
            ...item,
            id: Math.random().toString(36).substr(2, 9),
          };
          set((state) => {
            const updatedItems = [...state.items, newItem];
            return {
              items: updatedItems,
              total: updatedItems.reduce((total, item) => total + item.price * item.quantity, 0)
            };
          });
        }
      },
      
      removeItem: (id) => {
        set((state) => {
          const updatedItems = state.items.filter((item) => item.id !== id);
          return {
            items: updatedItems,
            total: updatedItems.reduce((total, item) => total + item.price * item.quantity, 0)
          };
        });
      },
      
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        
        set((state) => {
          const updatedItems = state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          );
          return {
            items: updatedItems,
            total: updatedItems.reduce((total, item) => total + item.price * item.quantity, 0)
          };
        });
      },
      
      clearCart: () => {
        set({ items: [], total: 0 });
      },
      
      openCart: () => {
        set({ isOpen: true });
      },
      
      closeCart: () => {
        set({ isOpen: false });
      },
      
      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },
      
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'stylish-hub-cart',
    }
  )
);
