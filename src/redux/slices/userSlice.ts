import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { UserState, LoginRequest, RegisterRequest,AuthTokens } from '../../types/user';
import { createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '../../misc/constants';



// Async thunk for user login
export const login = createAsyncThunk(
  'user/login',
  async (credentials: LoginRequest, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/login`, credentials);
      const token= response.data
      console.log(token)
      localStorage.setItem("token", token);
      console.log(token)
      dispatch(getProfile(token));
      return response.data;

    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data || 'Login failed');
    }
  }
);

// Async thunk for user registration
export const register = createAsyncThunk(
  'user/register',
  async (userData: RegisterRequest, { rejectWithValue }) => {
    try {
      console.log (userData, "userData")
      const response = await axios.post(`${BASE_URL}/users`, userData);
      console.log(response.data, "response.data")
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data || 'Registration failed');
    }
  }
);

// Async thunk for getting user profile
export const getProfile = createAsyncThunk(
  'user/getProfile',
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/profile`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data || 'Failed to fetch profile');
    }
  }
);


const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle login
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle registration
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle getProfile
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions and reducer
export const { logout } = userSlice.actions;
export default userSlice.reducer;
