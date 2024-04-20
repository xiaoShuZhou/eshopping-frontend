
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { BASE_URL } from '../../misc/constants';
import { Order,OrderState } from '../../types/order';

const initialState: OrderState = {
  order: null,
  loading: false,
  error: null,
};

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (order: Order, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/orders`, order);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data || 'Failed to create order');
    }
  }
);

export const getOrder = createAsyncThunk(
  'order/getOrder',
  async (orderId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/orders/${orderId}`);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data || 'Failed to fetch order');
    }
  }
);

export const deleteOrder = createAsyncThunk(
  'order/deleteOrder',
  async (orderId: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/orders/${orderId}`);
      if (response.status === 204) {
        return orderId;
      } else {
        return rejectWithValue('Failed to delete the order');
      }
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data || 'Failed to delete the order');
    }
  }
);

export const addOrderItemToOrder = createAsyncThunk(
  'order/addOrderItemToOrder',
  async ({ orderId, orderItem }: { orderId: string; orderItem: any }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/orders/${orderId}/items`, orderItem);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data || 'Failed to add order item');
    }
  }
);

export const deleteOrderItemFromOrder = createAsyncThunk(
  'order/removeOrderItemFromOrder',
  async ({ orderId, orderItemId }: { orderId: string; orderItemId: string }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/orders/${orderId}/items/${orderItemId}`);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data || 'Failed to remove order item');
    }
  }
);

export const getOrderById = createAsyncThunk(
  'order/getOrderById',
  async (orderId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/orders/${orderId}`);
      if (response.status === 200) {
        return response.data;
      } else {
        return rejectWithValue('Order not found');
      }
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data || 'Failed to fetch order');
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createOrder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.order = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(createOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(getOrder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOrder.fulfilled, (state, action) => {
      state.order = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(deleteOrder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteOrder.fulfilled, (state, action) => {
      state.order = null;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(deleteOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(addOrderItemToOrder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addOrderItemToOrder.fulfilled, (state, action) => {
      state.order = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(addOrderItemToOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(deleteOrderItemFromOrder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteOrderItemFromOrder.fulfilled, (state, action) => {
      state.order = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(deleteOrderItemFromOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(getOrderById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOrderById.fulfilled, (state, action) => {
      state.order = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getOrderById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  }
});

export default orderSlice.reducer;