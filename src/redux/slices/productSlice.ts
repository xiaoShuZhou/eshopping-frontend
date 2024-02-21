import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ProductState } from '../../types/product';
import axios from 'axios';

// Define the initial state
const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

// Async thunk for fetching products
export const fetchProducts = createAsyncThunk('product/fetchProducts', async () => {
  const response = await axios.get('https://api.escuelajs.co/api/v1/products');
  return response.data;
});

// Create the slice
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Something went wrong';
    });
  },
});

export default productSlice.reducer;
