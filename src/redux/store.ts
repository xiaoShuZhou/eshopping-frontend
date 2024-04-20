import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice';
import userReducer from './slices/userSlice';
import categoryReducer from './slices/categorySlice';
import orderReducer from './slices/orderSlice';
import orderItmeRducer from './slices/orderItemSlice';

export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    user: userReducer,
    category: categoryReducer,
    order: orderReducer,
    orderItem: orderItmeRducer,
  },
});
// console.log(store.getState())

export const testStore = () => {
  return configureStore({
    reducer: {
      product: productReducer,
      user: userReducer,
      cart: cartReducer,
      category: categoryReducer,
    },
  });
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;