import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ProductState,NewProduct,UpdatedProduct, PriceRangeParams  } from '../../types/product';

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
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(BASE_URL + '/products');
      return response.data;
    } catch (error) {
      const err = error as AxiosError; 
      if (err.response) {
        return rejectWithValue(err.response.data);
      } else {
        return rejectWithValue('An unexpected error occurred fetching products');
      }
    }
  }
);

export const getProductDetail = createAsyncThunk(
  'product/fetchProductDetail',
  async (productId: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(BASE_URL + `/products/${productId}`);
      return response.data;
    } catch (error) {
      const err = error as AxiosError; // Type assertion here
      if (err.response) {
        return rejectWithValue(err.response.data);
      } else {
        return rejectWithValue('An unexpected error occurred fetching product details');
      }
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async (productId: number, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`https://api.escuelajs.co/api/v1/products/${productId}`);
      if (response.data === true) {
        return productId;
      } else {
        return rejectWithValue('Failed to delete the product');
      }
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        return rejectWithValue(err.response.data);
      } else {
        return rejectWithValue('An unexpected error occurred deleting the product');
      }
    }
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
        console.error('An unexpected error occurred');
        return rejectWithValue('An unexpected error occurred');
      }
    }
  }
);

export const updateProduct = createAsyncThunk(
  'product/updateProduct',
  async ({ id, updateData }: { id: number; updateData: UpdatedProduct }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_URL}/products/${id}`, updateData);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        return rejectWithValue(err.response.data);
      } else {
        return rejectWithValue('An unexpected error occurred updating the product');
      }
    }
  }
);

// Async thunk for fetching products by title
export const getProductsByTitle = createAsyncThunk(
  'product/fetchProductsByTitle',
  async (title: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/products?title=${title}`);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        return rejectWithValue(err.response.data);
      } else {
        return rejectWithValue('An unexpected error occurred fetching products by title');
      }
    }
  }
);

// Async thunk for fetching products by price range
export const getProductsByPriceRange = createAsyncThunk(
  'product/fetchProductsByPriceRange',
  async ({ price_min, price_max }: PriceRangeParams, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/products?price_min=${price_min}&price_max=${price_max}`);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        return rejectWithValue(err.response.data);
      } else {
        return rejectWithValue('An unexpected error occurred fetching products by price range');
      }
    }
  }
);

export const getProductsByCategory = createAsyncThunk(
  'product/fetchProductsByCategory',
  async (categoryId: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/products?categoryId=${categoryId}`);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        return rejectWithValue(err.response.data);
      } else {
        return rejectWithValue('An unexpected error occurred fetching products by category');
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

    //delete a product
    builder.addCase(deleteProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.products = state.products.filter(product => product.id !== action.payload);
      state.loading = false;
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Something went wrong deleting the product';
    });

    //update a product
    builder.addCase(updateProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      const index = state.products.findIndex(product => product.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Something went wrong updating the product';
    });

    //get products by title
    builder.addCase(getProductsByTitle.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProductsByTitle.fulfilled, (state, action) => {
      state.products = action.payload;
      state.loading = false;
    });
    builder.addCase(getProductsByTitle.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Something went wrong fetching products by title';
    });

      // Handle products filtered by price range
  
    builder.addCase(getProductsByPriceRange.fulfilled, (state, action) => {
    state.products = action.payload;
    state.loading = false;
  });

  // Handle products filtered by category
    builder.addCase(getProductsByCategory.fulfilled, (state, action) => {
    state.products = action.payload;
    state.loading = false;
  });
  },
});

export default productSlice.reducer;
