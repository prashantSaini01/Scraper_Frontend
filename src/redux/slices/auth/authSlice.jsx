import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios"; // Use raw axios for signup and login (no token required)
import API_URL from "../../../components/config"

// Async Thunk for signup
export const signup = createAsyncThunk(
  "auth/signup",
  async (formData, { rejectWithValue }) => {
    const { email, password, fullname, username } = formData;

    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        email,
        password,
        fullname,
        username,
      });

      if (response.status === 201) {
        toast.success("Signup successful!");
        return true; // Indicate success without storing a token
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data.message);
      } else {
        toast.error("An error occurred during signup. Please try again.");
        return rejectWithValue("An error occurred during signup. Please try again.");
      }
    }
  }
);

// Async Thunk for login
export const login = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    if (!formData.username || !formData.password) {
      toast.warn("Please fill in both fields.");
      return rejectWithValue("Please fill in both fields.");
    }

    try {
      const response = await axios.post(`${API_URL}/auth/login`, formData);
      localStorage.setItem("token", response.data.token);
      toast.success("Login successful!");
      return response.data.token;
    } catch (error) {
      console.error("Login failed", error);
      toast.error("Invalid credentials. Please try again.");
      return rejectWithValue("Invalid credentials. Please try again.");
    }
  }
);

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state) => {
        state.isLoading = false;
        // No token stored here, as signup typically doesn’t return one
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;