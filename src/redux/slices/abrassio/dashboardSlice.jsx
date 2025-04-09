import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import api from "../../../components/axiosConfig"

// Async Thunks
export const fetchDashboardData = createAsyncThunk(
  "dashboard/fetchDashboardData",
  async (_, { rejectWithValue }) => {
    try {
      const [queriesResponse, tagsResponse, usersResponse] = await Promise.all([
        api.get("/abrassio_newsletter/get_queries"),
        api.get("/abrassio_newsletter/get_subscribed_tags"),
        api.get("/auth/get_users"),
      ]);
      return {
        queries: queriesResponse.data.queries || [],
        subscribedTags: tagsResponse.data.subscribed_tags || [],
        users: usersResponse.data.users || [],
      };
    } catch (error) {
      const message = error.response?.data.message || "An error occurred while fetching data.";
      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
      }
      return rejectWithValue(message);
    }
  }
);

export const fetchSentimentData = createAsyncThunk(
  "dashboard/fetchSentimentData",
  async ({ platform, query }, { rejectWithValue }) => {
    try {
      const response = await api.post("/abrassio_newsletter/get_sentiment_data", { platform, query });
      const sentiment = response.data.sentiment || {};
      return {
        sentimentData: {
          labels: ["Positive", "Negative", "Neutral"],
          datasets: [
            {
              data: [sentiment.Positive || 0, sentiment.Negative || 0, sentiment.Neutral || 0],
              backgroundColor: ["#10B981", "#EF4444", "#F59E0B"],
              hoverBackgroundColor: ["#059669", "#DC2626", "#D97706"],
              borderWidth: 2,
              borderColor: "#fff",
            },
          ],
        },
        mostSearchedHashtag: response.data.most_searched_hashtag || "N/A",
        sentimentSummary: response.data.summary || "No summary available.",
      };
    } catch (error) {
      return rejectWithValue(error.response?.data.message || "An error occurred while fetching sentiment data.");
    }
  }
);

export const unsubscribeTag = createAsyncThunk(
  "dashboard/unsubscribeTag",
  async ({ platform, tag }, { rejectWithValue }) => {
    try {
      const response = await api.post("/abrassio_newsletter/unsubscribe_newsletter", { platform, tag });
      toast.success(response.data.message);
      return { platform, tag };
    } catch (error) {
      toast.error(error.response?.data.message || "Failed to unsubscribe.");
      return rejectWithValue(error.response?.data.message);
    }
  }
);

export const addUser = createAsyncThunk(
  "dashboard/addUser",
  async (newUser, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/add_user", newUser);
      toast.success(response.data.message);
      return {
        _id: response.data.user_id,
        username: response.data.username,
        email: response.data.email,
        role: response.data.role,
      };
    } catch (error) {
      toast.error(error.response?.data.message || "Failed to add user.");
      return rejectWithValue(error.response?.data.message);
    }
  }
);

export const removeUser = createAsyncThunk(
  "dashboard/removeUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/remove_user", { user_id: userId });
      toast.success(response.data.message);
      return userId;
    } catch (error) {
      toast.error(error.response?.data.message || "Failed to remove user.");
      return rejectWithValue(error.response?.data.message);
    }
  }
);

export const getNewsletter = createAsyncThunk(
  "dashboard/getNewsletter",
  async (_, { rejectWithValue, getState }) => {
    const { subscribedTags } = getState().dashboard;
    if (subscribedTags.length === 0) {
      toast.info("No subscribed tags available to fetch newsletters.");
      return rejectWithValue("No subscribed tags.");
    }
    try {
      const response = await api.post("/abrassio_newsletter/get_newsletter_now", {});
      toast.success(response.data.message);
      return;
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
      } else if (error.response?.status === 404) {
        toast.info(error.response.data.message);
      } else {
        toast.error("Wait for sometime, the newsletter is on its way ...");
      }
      return rejectWithValue(error.response?.data.message || "Failed to fetch newsletter.");
    }
  }
);

// Slice
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    loading: false,
    error: null,
    queries: [],
    subscribedTags: [],
    users: [],
    sentimentData: null,
    mostSearchedHashtag: "",
    sentimentSummary: "",
    newsletterLoading: false,
  },
  reducers: {
    clearSentimentData: (state) => {
      state.sentimentData = null;
      state.mostSearchedHashtag = "";
      state.sentimentSummary = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Dashboard Data
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.queries = action.payload.queries;
        state.subscribedTags = action.payload.subscribedTags;
        state.users = action.payload.users;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Sentiment Data
      .addCase(fetchSentimentData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSentimentData.fulfilled, (state, action) => {
        state.loading = false;
        state.sentimentData = action.payload.sentimentData;
        state.mostSearchedHashtag = action.payload.mostSearchedHashtag;
        state.sentimentSummary = action.payload.sentimentSummary;
      })
      .addCase(fetchSentimentData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Unsubscribe Tag
      .addCase(unsubscribeTag.fulfilled, (state, action) => {
        state.subscribedTags = state.subscribedTags.filter(
          (sub) => !(sub.platform === action.payload.platform && sub.tag === action.payload.tag)
        );
      })
      // Add User
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      // Remove User
      .addCase(removeUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload);
      })
      // Get Newsletter
      .addCase(getNewsletter.pending, (state) => {
        state.newsletterLoading = true;
        state.error = null;
      })
      .addCase(getNewsletter.fulfilled, (state) => {
        state.newsletterLoading = false;
      })
      .addCase(getNewsletter.rejected, (state, action) => {
        state.newsletterLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSentimentData } = dashboardSlice.actions;
export default dashboardSlice.reducer;