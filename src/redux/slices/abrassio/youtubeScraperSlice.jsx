import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import api from "../../../components/axiosConfig";

// Async Thunk for scraping YouTube videos
export const scrapeYoutube = createAsyncThunk(
  "youtubeScraper/scrapeYoutube",
  async ({ hashtag, maxResults, useCache }, { rejectWithValue }) => {
    try {
      const response = await api.post("/abrassio/scrape_youtube", {
        hashtag,
        max_results: useCache ? null : Number(maxResults),
        use_cache: useCache,
      });

      if (response.data.response || response.data) {
        return response.data.response || response.data;
      } else {
        return rejectWithValue("No valid data found.");
      }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        return rejectWithValue("Session expired. Please log in again.");
      }
      return rejectWithValue("An error occurred while scraping YouTube.");
    }
  }
);

// Async Thunk for fetching summary
export const getSummary = createAsyncThunk(
  "youtubeScraper/getSummary",
  async (output, { rejectWithValue }) => {
    try {
      const response = await api.post("/get-summary", { output });
      if (response.data.summary) {
        return response.data.summary;
      } else {
        return rejectWithValue("No summary generated.");
      }
    } catch (error) {
      return rejectWithValue("An error occurred while fetching the summary.");
    }
  }
);

// Async Thunk for subscribing to newsletter
export const subscribeNewsletter = createAsyncThunk(
  "youtubeScraper/subscribeNewsletter",
  async ({ platform, tag }, { rejectWithValue }) => {
    try {
      const response = await api.post("/subscribe_newsletter", { platform, tag });
      toast.success(`"${tag}" subscribed for daily newsletter!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return response.data.subscription;
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error("You are already subscribed to this tag.", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
      return rejectWithValue("Failed to subscribe to newsletter.");
    }
  }
);

// Slice
const youtubeScraperSlice = createSlice({
  name: "youtubeScraper",
  initialState: {
    output: [],
    summary: "",
    loading: false,
    summaryLoading: false,
    error: null,
  },
  reducers: {
    clearOutput: (state) => {
      state.output = [];
      state.summary = "";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Scrape YouTube
      .addCase(scrapeYoutube.pending, (state) => {
        state.loading = true;
        state.output = [];
        state.summary = "";
        state.error = null;
      })
      .addCase(scrapeYoutube.fulfilled, (state, action) => {
        state.loading = false;
        state.output = action.payload;
      })
      .addCase(scrapeYoutube.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Summary
      .addCase(getSummary.pending, (state) => {
        state.summaryLoading = true;
        state.summary = "";
        state.error = null;
      })
      .addCase(getSummary.fulfilled, (state, action) => {
        state.summaryLoading = false;
        state.summary = action.payload;
      })
      .addCase(getSummary.rejected, (state, action) => {
        state.summaryLoading = false;
        state.error = action.payload;
      })
      // Subscribe Newsletter
      .addCase(subscribeNewsletter.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearOutput } = youtubeScraperSlice.actions;
export default youtubeScraperSlice.reducer;