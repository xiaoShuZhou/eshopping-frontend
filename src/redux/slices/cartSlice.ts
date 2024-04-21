import { PayloadAction, createSlice } from "@reduxjs/toolkit";


import { CartItem, CartState } from "../../types/cart";


const initialState: CartState = {
  items: [],
};


export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state,action: PayloadAction<{item: CartItem;}>) => {
      const { item } = action.payload;
      state.items.push({ ...item, quantity: item.quantity });
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const itemIndex = state.items.findIndex((item) => item.id === action.payload);
      if (itemIndex !== -1) {
        state.items.splice(itemIndex, 1);
      }
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity++;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity--;
      }
    },
    emptyCart: (state) => {
      state.items = [];
    },
  },
});

const cartReducer = cartSlice.reducer;
export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  emptyCart,
} = cartSlice.actions;
export default cartReducer;