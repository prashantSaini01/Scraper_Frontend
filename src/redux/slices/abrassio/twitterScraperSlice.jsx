import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../components/axiosConfig";

// Async Thunk for scraping Twitter
export const scrapeTwitter = createAsyncThunk(
  "twitterScraper/scrapeTwitter",
  async ({ keyword, useCache }, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return rejectWithValue("You are not logged in. Please log in to continue.");
    }
    if (!keyword.trim()) {
      return rejectWithValue("Please enter a keyword to search.");
    }

    try {
      const response = await api.post("/abrassio/scrape_twitter", { keyword, use_cache: useCache });
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        return rejectWithValue("Session expired. Redirecting to login...");
      }
      return rejectWithValue("An error occurred while scraping Twitter.");
    }
  }
);

// Slice
const twitterScraperSlice = createSlice({
  name: "twitterScraper",
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearPosts: (state) => {
      state.posts = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(scrapeTwitter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(scrapeTwitter.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(scrapeTwitter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPosts } = twitterScraperSlice.actions;
export default twitterScraperSlice.reducer;