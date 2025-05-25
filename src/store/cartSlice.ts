// src/store/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

// Отримати ключ користувача
const getCartKey = (): string | null => {
  const user = localStorage.getItem('user');
  if (!user) return null;
  try {
    const parsed = JSON.parse(user);
    return `cart_${parsed.email}`;
  } catch {
    return null;
  }
};

// Отримати початковий стан кошика
const getInitialCart = (): CartItem[] => {
  const cartKey = getCartKey();
  if (cartKey) {
    const saved = localStorage.getItem(cartKey);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
  }
  return [];
};

// Зберегти кошик у localStorage
const saveCartToStorage = (items: CartItem[]) => {
  const cartKey = getCartKey();
  if (cartKey) {
    localStorage.setItem(cartKey, JSON.stringify(items));
  }
};

const initialState: CartState = {
  items: getInitialCart(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      saveCartToStorage(state.items);
    },
    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter(item => item.id !== action.payload);
      saveCartToStorage(state.items);
    },
    clearCart(state) {
      state.items = [];
      saveCartToStorage([]);
    },
    loadCart(state) {
      // вручну завантажити cart (наприклад після login)
      state.items = getInitialCart();
    },
  },
});

export const { addItem, removeItem, clearCart, loadCart } = cartSlice.actions;
export default cartSlice.reducer;
