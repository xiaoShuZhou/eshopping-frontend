import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
  },
});
console.log(store.getState())

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;