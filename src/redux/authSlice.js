import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;

// Define API base URL
const API_URL = "http://localhost:5000/api/auth";

// Async Thunk for Login
export const loginUser = createAsyncThunk("auth/loginUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData, { withCredentials: true });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Async Thunk for Signup
export const signupUser = createAsyncThunk("auth/signupUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData, { withCredentials: true });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const logoutUser = createAsyncThunk("/logoutUser", async (_, rejectWithValue) => {
  try {
    await axios.post(`${API_URL}/logout`, { withCredentials: true });
    return null; //No user after logout
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
})

// Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      });
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
