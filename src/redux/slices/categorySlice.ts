import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { CategoryState } from '../../types/category';

const BASE_URL = 'https://api.escuelajs.co/api/v1';

// Define the initial state
const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

// Async thunk for fetching all categories
export const getCategories = createAsyncThunk(
  'category/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/categories`);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        return rejectWithValue(err.response.data);
      } else {
        return rejectWithValue('An unexpected error occurred fetching categories');
      }
    }
  }
);

// Async thunk for fetching category detail
export const getCategoryDetail = createAsyncThunk(
  'category/fetchCategoryDetail',
  async (categoryId: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/categories/${categoryId}`);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        return rejectWithValue(err.response.data);
      } else {
        return rejectWithValue('An unexpected error occurred fetching category details');
      }
    }
  }
);

// Create the slice
const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.loading = false;
    });
    builder.addCase(getCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Something went wrong fetching categories';
    });

    builder.addCase(getCategoryDetail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCategoryDetail.fulfilled, (state, action) => {
      const index = state.categories.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.categories[index] = action.payload;
      } else {
        state.categories.push(action.payload);
      }
      state.loading = false;
    });
    builder.addCase(getCategoryDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Something went wrong fetching the category details';
    });
  },
});

export default categorySlice.reducer;
