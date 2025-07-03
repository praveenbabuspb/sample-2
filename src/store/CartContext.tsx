import React, {createContext, useContext, useReducer, ReactNode} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CartItem, ShopCart, Product} from '../types';

interface CartState {
  carts: {[shopName: string]: ShopCart};
  isOpen: boolean;
}

type CartAction =
  | {type: 'SET_CARTS'; payload: {[shopName: string]: ShopCart}}
  | {type: 'ADD_ITEM'; payload: Product}
  | {type: 'UPDATE_QUANTITY'; payload: {productId: string; shopName: string; quantity: number}}
  | {type: 'CLEAR_CART'; payload: string}
  | {type: 'CLEAR_ALL_CARTS'}
  | {type: 'TOGGLE_CART'}
  | {type: 'SET_CART_OPEN'; payload: boolean};

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  addItem: (product: Product) => void;
  updateQuantity: (productId: string, shopName: string, quantity: number) => void;
  clearCart: (shopName: string) => void;
  clearAllCarts: () => void;
  toggleCart: () => void;
  setCartOpen: (isOpen: boolean) => void;
} | null>(null);

const calculateShopCartTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return {totalItems, totalPrice};
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'SET_CARTS':
      return {...state, carts: action.payload};

    case 'ADD_ITEM': {
      const product = action.payload;
      const {shopName, shopCategory} = product;
      const originalShopCart = state.carts[shopName];

      const newItems = originalShopCart
        ? originalShopCart.items.find(p => p.id === product.id)
          ? originalShopCart.items.map(p =>
              p.id === product.id ? {...p, quantity: p.quantity + 1} : p,
            )
          : [...originalShopCart.items, {...product, quantity: 1}]
        : [{...product, quantity: 1}];

      const {totalItems, totalPrice} = calculateShopCartTotals(newItems);

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

      // Save to AsyncStorage
      AsyncStorage.setItem('cart-storage', JSON.stringify({carts: newCarts}));

      return {
        ...state,
        carts: newCarts,
      };
    }

    case 'UPDATE_QUANTITY': {
      const {productId, shopName, quantity} = action.payload;
      const originalShopCart = state.carts[shopName];
      if (!originalShopCart) return state;

      const newItems = originalShopCart.items
        .map(item => (item.id === productId ? {...item, quantity} : item))
        .filter(item => item.quantity > 0);

      if (newItems.length === 0) {
        const newCarts = {...state.carts};
        delete newCarts[shopName];
        AsyncStorage.setItem('cart-storage', JSON.stringify({carts: newCarts}));
        return {
          ...state,
          carts: newCarts,
          isOpen: Object.keys(newCarts).length > 0,
        };
      }

      const {totalItems, totalPrice} = calculateShopCartTotals(newItems);
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

      AsyncStorage.setItem('cart-storage', JSON.stringify({carts: newCarts}));

      return {
        ...state,
        carts: newCarts,
      };
    }

    case 'CLEAR_CART': {
      const shopName = action.payload;
      const newCarts = {...state.carts};
      delete newCarts[shopName];
      AsyncStorage.setItem('cart-storage', JSON.stringify({carts: newCarts}));
      return {
        ...state,
        carts: newCarts,
        isOpen: Object.keys(newCarts).length > 0,
      };
    }

    case 'CLEAR_ALL_CARTS':
      AsyncStorage.setItem('cart-storage', JSON.stringify({carts: {}}));
      return {
        ...state,
        carts: {},
        isOpen: false,
      };

    case 'TOGGLE_CART':
      return {...state, isOpen: !state.isOpen};

    case 'SET_CART_OPEN':
      return {...state, isOpen: action.payload};

    default:
      return state;
  }
};

export const CartProvider = ({children}: {children: ReactNode}) => {
  const [state, dispatch] = useReducer(cartReducer, {
    carts: {},
    isOpen: false,
  });

  // Load cart from AsyncStorage on mount
  React.useEffect(() => {
    const loadCart = async () => {
      try {
        const stored = await AsyncStorage.getItem('cart-storage');
        if (stored) {
          const parsed = JSON.parse(stored);
          dispatch({type: 'SET_CARTS', payload: parsed.carts || {}});
        }
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    };
    loadCart();
  }, []);

  const addItem = (product: Product) => {
    dispatch({type: 'ADD_ITEM', payload: product});
  };

  const updateQuantity = (productId: string, shopName: string, quantity: number) => {
    dispatch({type: 'UPDATE_QUANTITY', payload: {productId, shopName, quantity}});
  };

  const clearCart = (shopName: string) => {
    dispatch({type: 'CLEAR_CART', payload: shopName});
  };

  const clearAllCarts = () => {
    dispatch({type: 'CLEAR_ALL_CARTS'});
  };

  const toggleCart = () => {
    dispatch({type: 'TOGGLE_CART'});
  };

  const setCartOpen = (isOpen: boolean) => {
    dispatch({type: 'SET_CART_OPEN', payload: isOpen});
  };

  return (
    <CartContext.Provider
      value={{
        state,
        dispatch,
        addItem,
        updateQuantity,
        clearCart,
        clearAllCarts,
        toggleCart,
        setCartOpen,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};