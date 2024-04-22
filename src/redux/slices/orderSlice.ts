
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { BASE_URL } from '../../misc/constants';
import { Order,OrderState } from '../../types/order';
import { CartItem } from '../../types/cart';
import { User } from '../../types/user';

const initialState: OrderState = {
  orders: [],
  loading: false,
  error: null,
};

export const submitOrderFromCart = createAsyncThunk(
  'order/submitOrderFromCart',
  async ({ cartItems, user }: { cartItems: CartItem[], user: User }, { rejectWithValue }) => {
    if (cartItems.length === 0) {
      return rejectWithValue('Cart is empty');
    }

    const orderItems = cartItems.map(item => ({
      product: item.id,
      quantity: item.quantity
    }));

    const order = { user: user?.id, items: orderItems };

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${BASE_URL}/orders`, order, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data || 'Failed to create order');
    }
  }
);

export const getOrdersByUserId = createAsyncThunk(
  'order/getOrdersByUserId',
  async (userId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BASE_URL}/orders/getOrdersByuser/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data || 'Failed to fetch orders');
    }
  }
);



export const deleteOrder = createAsyncThunk(
  'order/deleteOrder',
  async (orderId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${BASE_URL}/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 200) {
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


const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitOrderFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitOrderFromCart.fulfilled, (state, action) => {
        state.loading = false;
        if (state.orders) {
          state.orders.push(action.payload);
          console.log('state.orders:', state.orders);
        }
      })
      .addCase(submitOrderFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getOrdersByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrdersByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getOrdersByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;

        if (state.orders) {
          state.orders = state.orders.filter(order => order.id !== action.payload);
        }
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  
    
  }
});

export default orderSlice.reducer;