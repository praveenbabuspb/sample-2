import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Product } from '@/data/products';

export interface CartItem extends Product {
  quantity: number;
}

export interface ShopCart {
  shopName: string;
  shopCategory: string;
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

interface MultiCartState {
  carts: { [shopName: string]: ShopCart };
  isOpen: boolean;
  lastActivityShop: string | null;
  toggleCart: () => void;
  setCartOpen: (isOpen: boolean) => void;
  addItem: (product: Product) => void;
  updateQuantity: (productId: string, shopName: string, quantity: number) => void;
  clearCart: (shopName: string) => void;
  clearAllCarts: () => void;
}

const calculateShopCartTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return { totalItems, totalPrice };
};

export const useCartStore = create<MultiCartState>()(
  persist(
    (set) => ({
      carts: {},
      isOpen: false,
      lastActivityShop: null,

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      setCartOpen: (isOpen) => set({ isOpen }),
      
      addItem: (product) => {
        set((state) => {
          const { shopName, shopCategory } = product;
          
          const originalShopCart = state.carts[shopName];
          
          const newItems = originalShopCart
            ? originalShopCart.items.find(p => p.id === product.id)
              ? originalShopCart.items.map(p => p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p)
              : [...originalShopCart.items, { ...product, quantity: 1 }]
            : [{ ...product, quantity: 1 }];

          const { totalItems, totalPrice } = calculateShopCartTotals(newItems);
          
          const newShopCart = {
            shopName,
            shopCategory,
            items: newItems,
            totalItems,
            totalPrice,
          };
          
          const newCarts = {
            ...state.carts,
            [shopName]: newShopCart,
          };

          return { carts: newCarts, lastActivityShop: shopName };
        });
      },
    
      updateQuantity: (productId, shopName, quantity) => {
        set((state) => {
          const originalShopCart = state.carts[shopName];
          if (!originalShopCart) return {};

          // Create a new items array by updating quantity, then filtering out any with quantity <= 0
          const newItems = originalShopCart.items
            .map(item => item.id === productId ? { ...item, quantity } : item)
            .filter(item => item.quantity > 0);

          // If the new items list is empty, this shop cart should be removed.
          if (newItems.length === 0) {
            const newCarts = { ...state.carts };
            delete newCarts[shopName];
            const remainingShopKeys = Object.keys(newCarts);
            const lastActivityShop = remainingShopKeys.length > 0 ? remainingShopKeys[remainingShopKeys.length - 1] : null;
            return { carts: newCarts, lastActivityShop, isOpen: remainingShopKeys.length > 0 };
          }

          // Otherwise, update the shop cart with the new items list.
          const { totalItems, totalPrice } = calculateShopCartTotals(newItems);
          const newShopCart = {
            ...originalShopCart,
            items: newItems,
            totalItems,
            totalPrice,
          };
          const newCarts = {
            ...state.carts,
            [shopName]: newShopCart,
          };

          return { carts: newCarts, lastActivityShop: shopName };
        });
      },
    
      clearCart: (shopName) => {
        set((state) => {
          // Create a new carts object with the specified shop removed.
          const newCarts = { ...state.carts };
          delete newCarts[shopName];
          const remainingShopKeys = Object.keys(newCarts);
          const lastActivityShop = remainingShopKeys.length > 0 ? remainingShopKeys[remainingShopKeys.length - 1] : null;
          return { carts: newCarts, lastActivityShop, isOpen: remainingShopKeys.length > 0 };
        });
      },
    
      clearAllCarts: () => set({ carts: {}, lastActivityShop: null, isOpen: false }),
    }),
    {
      name: 'multi-cart-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ carts: state.carts, lastActivityShop: state.lastActivityShop }),
    }
  )
);
