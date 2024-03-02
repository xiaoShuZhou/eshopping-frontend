import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice';
import userReducer from './slices/userSlice';
import categoryReducer from './slices/categorySlice';

export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    user: userReducer,
    category: categoryReducer
  },
});
console.log(store.getState())

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;