import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import api from "../../../components/axiosConfig"
// Async Thunk for scraping Instagram
export const scrapeInstagram = createAsyncThunk(
  "instagramScraper/scrapeInstagram",
  async ({ hashtag, useCache }, { rejectWithValue }) => {
    if (!hashtag.trim()) {
      toast.error("Please enter a hashtag to search.");
      return rejectWithValue("No hashtag provided.");
    }

    try {
      const response = await api.post("/abrassio/scrape_instagram", { hashtag, use_cache: useCache });
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        return rejectWithValue("Session expired.");
      }
      return rejectWithValue("An error occurred while scraping Instagram.");
    }
  }
);

// Slice
const instagramScraperSlice = createSlice({
  name: "instagramScraper",
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
      .addCase(scrapeInstagram.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(scrapeInstagram.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(scrapeInstagram.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPosts } = instagramScraperSlice.actions;
export default instagramScraperSlice.reducer;