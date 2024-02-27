import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Product, ProductState,NewProduct } from '../../types/product';

import axios, { AxiosError } from 'axios';

import { BASE_URL } from '../../misc/constants';

// Define the initial state
const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

// Async thunk for fetching products
export const getProducts = createAsyncThunk(
  'product/fetchProducts',
  async () => {
    const response = await axios.get(BASE_URL + '/products');
    return response.data;
  }
);

export const getProductDetail = createAsyncThunk(
  'product/fetchProductDetail',
  async (productId: number) => {
    const response = await axios.get(BASE_URL + `/products/${productId}`);
    return response.data;
  }
);

export const createProduct = createAsyncThunk(
  'product/createProduct',
  async (newProduct: NewProduct, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/products`, newProduct);
      return response.data;
    } catch (error) {
      const err = error as AxiosError; // Type assertion here
      if (err.response) {
        console.error(err.response.data);
        return rejectWithValue(err.response.data);
      } else {
        // Handle case where the error does not come from Axios
        console.error('An unexpected error occurred');
        return rejectWithValue('An unexpected error occurred');
      }
    }
  }
);


// Create the slice
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //get all products
    builder.addCase(getProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.loading = false;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Something went wrong';
    });
    //get a product detail
    builder.addCase(getProductDetail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProductDetail.fulfilled, (state, action) => {
      // Assuming you want to add this to the products array or update an existing one
      const index = state.products.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      } else {
        state.products.push(action.payload);
      }
      state.loading = false;
    });
    builder.addCase(getProductDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Something went wrong fetching the product details';
    });

    //create a product
    builder.addCase(createProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.products.push(action.payload);
      state.loading = false;
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Something went wrong creating the product';
    });
  },
});

export default productSlice.reducer;
