import { createContext, useReducer, useContext } from 'react';
import type { ReactNode } from 'react';
import type { Product, CartState, CartItem, CartAction } from '../types/product';


const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const calculateTotals = (items: CartItem[]): { totalQuantity: number; totalPrice: number } => {
  const totalQuantity = items.reduce ((sum, item) => sum + item.quantity, 0 );
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return { totalQuantity, totalPrice };
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);
      let updatedItems;
      if (existingItem) {
        updatedItems = state.items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        updatedItems = [...state.items, { ...product, quantity }];
      }
      const totals = calculateTotals(updatedItems);
      return { items: updatedItems, ...totals };
    }
    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => item.id !== action.payload.productId);
      const totals = calculateTotals(updatedItems);
      return { items: updatedItems, ...totals };
    }
    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: { productId } });
      }
      const updatedItems = state.items.map(item =>
        item.id === productId ? { ...item, quantity } : item
      );
      const totals = calculateTotals(updatedItems);
      return { items: updatedItems, ...totals };
    }
    default:
      return state;
  }
};

interface CartContextValue extends CartState {
  addItem: (product: Product, quantity: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (product: Product, quantity: number) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity } });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };

  return (
    <CartContext.Provider value={{ ...state, addItem, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('');
  }
  return context;
};