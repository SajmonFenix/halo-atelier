import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import type { Product, CartItemVariation } from '../data/products';
import { getDefaultVariation } from '../data/products';

export interface CartItem {
  product: Product;
  variation: CartItemVariation;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD_ITEM'; product: Product; variation?: CartItemVariation; quantity?: number }
  | { type: 'REMOVE_ITEM'; key: string }
  | { type: 'UPDATE_QUANTITY'; key: string; quantity: number }
  | { type: 'CLEAR_CART' };

function itemKey(productId: number, sku: string): string {
  return `${productId}-${sku}`;
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const variation = action.variation || getDefaultVariation(action.product);
      const key = itemKey(action.product.id, variation.sku);
      const existing = state.items.find(i => itemKey(i.product.id, i.variation.sku) === key);
      if (existing) {
        return {
          items: state.items.map(i =>
            itemKey(i.product.id, i.variation.sku) === key
              ? { ...i, quantity: i.quantity + (action.quantity || 1) }
              : i
          ),
        };
      }
      return { items: [...state.items, { product: action.product, variation, quantity: action.quantity || 1 }] };
    }
    case 'REMOVE_ITEM':
      return { items: state.items.filter(i => itemKey(i.product.id, i.variation.sku) !== action.key) };
    case 'UPDATE_QUANTITY': {
      if (action.quantity <= 0) {
        return { items: state.items.filter(i => itemKey(i.product.id, i.variation.sku) !== action.key) };
      }
      return {
        items: state.items.map(i =>
          itemKey(i.product.id, i.variation.sku) === action.key
            ? { ...i, quantity: action.quantity }
            : i
        ),
      };
    }
    case 'CLEAR_CART':
      return { items: [] };
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  addItem: (product: Product, variation?: CartItemVariation, quantity?: number) => void;
  removeItem: (productId: number, sku: string) => void;
  updateQuantity: (productId: number, sku: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  total: number;
}

const CartContext = createContext<CartContextValue | null>(null);

function getInitialState(): CartState {
  try {
    const saved = localStorage.getItem('halo-cart');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && Array.isArray(parsed.items)) return parsed;
    }
  } catch {}
  return { items: [] };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, getInitialState);

  useEffect(() => {
    localStorage.setItem('halo-cart', JSON.stringify(state));
  }, [state]);

  const addItem = (product: Product, variation?: CartItemVariation, quantity?: number) =>
    dispatch({ type: 'ADD_ITEM', product, variation, quantity });

  const removeItem = (productId: number, sku: string) =>
    dispatch({ type: 'REMOVE_ITEM', key: `${productId}-${sku}` });

  const updateQuantity = (productId: number, sku: string, quantity: number) =>
    dispatch({ type: 'UPDATE_QUANTITY', key: `${productId}-${sku}`, quantity });

  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = state.items.reduce((sum, i) => sum + i.variation.price * i.quantity, 0);
  const total = subtotal;

  return (
    <CartContext.Provider value={{ items: state.items, addItem, removeItem, updateQuantity, clearCart, itemCount, subtotal, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
