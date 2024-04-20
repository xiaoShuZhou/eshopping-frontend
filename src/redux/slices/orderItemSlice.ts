import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { BASE_URL } from '../../misc/constants';
import { OrderItem, OrderItemState } from '../../types/order';

const initialState: OrderItemState = {
  items: [],
  loading: false,
  error: null,
};

export const createOrderItem = createAsyncThunk(
  'orderItem/createOrderItem',
  async (data: { orderItem: OrderItem, orderId: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/orderItems`, data.orderItem);
      if (response.status === 201) {
        // Assuming the backend also updates the order and sends back the order item
        return response.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data || 'Failed to create order item');
    }
  }
);


export const deleteOrderItem = createAsyncThunk(
  'orderItem/deleteOrderItem',
  async (orderItemId: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/orderItems/${orderItemId}`);
      if (response.status === 204) {
        return orderItemId;
      } else {
        return rejectWithValue('Failed to delete the order item');
      }
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data || 'Failed to delete the order item');
    }
  }
);

// increase quantitiy of order item by 1 using put request
export const increaseOrderItemQuantity = createAsyncThunk(
  'orderItem/increaseOrderItemQuantity',
  async (orderItemId: string, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_URL}/orderItems/${orderItemId}/increase`);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data || 'Failed to increase order item quantity');
    }
  }
);

export const decreaseOrderItemQuantity = createAsyncThunk(
  'orderItem/decreaseOrderItemQuantity',
  async (orderItemId: string, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_URL}/orderItems/${orderItemId}/decrease`);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data || 'Failed to decrease order item quantity');
    }
  }
);

const orderItemSlice = createSlice({
  name: 'orderItem',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createOrderItem.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createOrderItem.fulfilled, (state, action) => {
      state.loading = false;
      state.items.push(action.payload);
    });
    builder.addCase(createOrderItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(deleteOrderItem.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteOrderItem.fulfilled, (state, action) => {
      state.loading = false;
      state.items = state.items.filter((item) => item.id !== action.payload);
    });
    builder.addCase(deleteOrderItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(increaseOrderItemQuantity.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(increaseOrderItemQuantity.fulfilled, (state, action) => {
      state.loading = false;
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
      );
    });
    builder.addCase(increaseOrderItemQuantity.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(decreaseOrderItemQuantity.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(decreaseOrderItemQuantity.fulfilled, (state, action) => {
      state.loading = false;
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
      );
    });
    builder.addCase(decreaseOrderItemQuantity.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default orderItemSlice.reducer;