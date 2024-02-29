import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    user: userReducer,
  },
});
console.log(store.getState())

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;