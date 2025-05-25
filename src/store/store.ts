// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import cartReducer from './cartSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
});

// Типізація для RootState (використовується у useSelector)
export type RootState = ReturnType<typeof store.getState>;

// Тип для dispatch (для використання у thunk або у компонентах)
export type AppDispatch = typeof store.dispatch;
