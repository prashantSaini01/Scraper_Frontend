import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../components/axiosConfig";

// Async Thunk for scraping Twitch
export const scrapeTwitch = createAsyncThunk(
  "twitchScraper/scrapeTwitch",
  async ({ keyword, numVideos, useCache }, { rejectWithValue }) => {
    if (!keyword.trim()) {
      return rejectWithValue("Please enter a keyword to search.");
    }

    try {
      const response = await api.post("/abrassio/scrape_twitch", {
        keyword,
        num_videos: parseInt(numVideos, 10),
        use_cache: useCache,
      });
      return response.data || [];
    } catch (error) {
      if (error.response?.status === 401) {
        return rejectWithValue("Session expired. Please log in again.");
      }
      return rejectWithValue("Failed to fetch data from the server.");
    }
  }
);

// Slice
const twitchScraperSlice = createSlice({
  name: "twitchScraper",
  initialState: {
    videos: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearVideos: (state) => {
      state.videos = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(scrapeTwitch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(scrapeTwitch.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload;
      })
      .addCase(scrapeTwitch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearVideos } = twitchScraperSlice.actions;
export default twitchScraperSlice.reducer;