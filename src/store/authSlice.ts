// src/store/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  name: string;
  email: string;
  password: string;
}

interface AuthState {
  user: User | null;
}

const persistedUser = localStorage.getItem('user');

const initialState: AuthState = {
  user: persistedUser ? JSON.parse(persistedUser) : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem('user');
    },
    register(state, action: PayloadAction<User>) {
      // Приклад просто реєструє користувача як логін
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
  },
});

export const { login, logout, register } = authSlice.actions;
export default authSlice.reducer;
