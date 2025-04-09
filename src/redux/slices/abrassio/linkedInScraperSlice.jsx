import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../components/axiosConfig";

// Async Thunk for scraping LinkedIn
export const scrapeLinkedIn = createAsyncThunk(
  "linkedInScraper/scrapeLinkedIn",
  async ({ hashtag, useCache }, { rejectWithValue }) => {
    if (!hashtag.trim()) {
      return rejectWithValue("Please enter a hashtag to search.");
    }

    try {
      const response = await api.post("/abrassio/scrape_linkedin", { hashtag, use_cache: useCache });
      const posts = response.data || [];
      if (!posts.length) {
        return rejectWithValue("No posts found for the given hashtag.");
      }
      return posts;
    } catch (error) {
      if (error.response?.status === 401) {
        return rejectWithValue("Session expired. Redirecting to login...");
      }
      return rejectWithValue(
        error.response?.data?.message || "An error occurred while scraping LinkedIn."
      );
    }
  }
);

// Slice
const linkedInScraperSlice = createSlice({
  name: "linkedInScraper",
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
      .addCase(scrapeLinkedIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(scrapeLinkedIn.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(scrapeLinkedIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPosts } = linkedInScraperSlice.actions;
export default linkedInScraperSlice.reducer;