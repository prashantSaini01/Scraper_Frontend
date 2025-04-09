import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../components/axiosConfig";

// Async Thunk for scraping TikTok
export const scrapeTikTok = createAsyncThunk(
  "tikTokScraper/scrapeTikTok",
  async ({ hashtag, postCount, useCache }, { rejectWithValue }) => {
    if (!hashtag.trim()) {
      return rejectWithValue("Please enter a hashtag to search.");
    }

    try {
      const response = await api.post("/abrassio/scrape_tiktok", {
        hashtag,
        post_count: postCount,
        use_cache: useCache,
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        return rejectWithValue("Session expired. Please log in again.");
      }
      return rejectWithValue("An error occurred while scraping TikTok.");
    }
  }
);

// Slice
const tikTokScraperSlice = createSlice({
  name: "tikTokScraper",
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
      .addCase(scrapeTikTok.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(scrapeTikTok.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(scrapeTikTok.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPosts } = tikTokScraperSlice.actions;
export default tikTokScraperSlice.reducer;