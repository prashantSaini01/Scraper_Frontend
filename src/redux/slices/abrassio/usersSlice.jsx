import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import api from "../../../components/axiosConfig";

// Async Thunk for fetching users
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/auth/get_users");
      const sanitizedUsers = (response.data.users || []).map((user) => ({
        _id: user._id || "",
        username: user.username || "Unknown",
        email: user.email || "N/A",
        role: typeof user.role === "string" ? user.role : "N/A",
      }));
      return sanitizedUsers;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to fetch users.";
      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
      } else {
        toast.error(errorMessage);
      }
      return rejectWithValue(errorMessage);
    }
  }
);

// Async Thunk for adding a user
export const addUser = createAsyncThunk(
  "users/addUser",
  async (newUser, { rejectWithValue }) => {
    if (!newUser.username || !newUser.email || !newUser.password) {
      toast.error("Please fill in all required fields.");
      return rejectWithValue("Missing required fields.");
    }

    try {
      const response = await api.post("/auth/add_user", newUser);
      toast.success(response.data.message);
      return {
        _id: response.data.user_id,
        username: response.data.username || "Unknown",
        email: response.data.email || "N/A",
        role: typeof response.data.role === "string" ? response.data.role : "N/A",
      };
    } catch (error) {
      const errorMessage = error.response?.data.message || "Failed to add user.";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Async Thunk for removing a user
export const removeUser = createAsyncThunk(
  "users/removeUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/remove_user", { user_id: userId });
      toast.success(response.data.message);
      return userId;
    } catch (error) {
      const errorMessage = error.response?.data.message || "Failed to remove user.";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Slice
const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    filteredUsers: [],
    loading: false,
    error: null,
  },
  reducers: {
    filterUsers: (state, action) => {
      const query = action.payload.toLowerCase();
      state.filteredUsers = state.users.filter((user) => {
        const username = user.username || "";
        const email = user.email || "";
        const role = user.role || "N/A";
        return (
          username.toLowerCase().includes(query) ||
          email.toLowerCase().includes(query) ||
          role.toLowerCase().includes(query)
        );
      });
    },
    clearUsers: (state) => {
      state.users = [];
      state.filteredUsers = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.filteredUsers = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add User
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
        state.filteredUsers.push(action.payload);
      })
      // Remove User
      .addCase(removeUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload);
        state.filteredUsers = state.filteredUsers.filter((user) => user._id !== action.payload);
      });
  },
});

export const { filterUsers, clearUsers } = usersSlice.actions;
export default usersSlice.reducer;