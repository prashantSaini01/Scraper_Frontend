import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../components/axiosConfig";

// Async Thunk for fetching sessions
export const fetchSessions = createAsyncThunk(
  "lawbot/fetchSessions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("docu_chat/sessions");
      return response.data;
    } catch (error) {
      console.error("Failed to fetch sessions:", error);
      return rejectWithValue("Failed to fetch sessions.");
    }
  }
);

// Async Thunk for creating a new session
export const createNewSession = createAsyncThunk(
  "lawbot/createNewSession",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post("docu_chat/sessions");
      return response.data.session_id;
    } catch (error) {
      console.error("Failed to create new session:", error);
      return rejectWithValue("Failed to create new session.");
    }
  }
);

// Async Thunk for renaming a session
export const renameSession = createAsyncThunk(
  "lawbot/renameSession",
  async ({ oldSessionId, newName }, { rejectWithValue }) => {
    try {
      const response = await api.put(`docu_chat/sessions/${oldSessionId}/rename`, {
        new_name: newName,
      });
      return { oldSessionId, newName };
    } catch (error) {
      console.error("Failed to rename session:", error);
      return rejectWithValue("Failed to rename session.");
    }
  }
);

// Async Thunk for selecting a session (fetching messages and PDFs)
export const selectSession = createAsyncThunk(
  "lawbot/selectSession",
  async (sessionId, { rejectWithValue }) => {
    try {
      const messagesResponse = await api.get(`docu_chat/sessions/${sessionId}/messages`);
      const pdfsResponse = await api.get(`docu_chat/sessions/${sessionId}/pdfs`);
      return {
        sessionId,
        chatHistory: messagesResponse.data,
        uploadedPdfs: pdfsResponse.data,
      };
    } catch (error) {
      console.error("Failed to load session:", error);
      return rejectWithValue("Failed to load session.");
    }
  }
);

// Async Thunk for deleting a session
export const deleteSession = createAsyncThunk(
  "lawbot/deleteSession",
  async (sessionId, { rejectWithValue }) => {
    try {
      await api.delete(`docu_chat/sessions/${sessionId}`);
      return sessionId;
    } catch (error) {
      console.error("Failed to delete session:", error);
      return rejectWithValue("Failed to delete session.");
    }
  }
);

// Async Thunk for fetching chat history
export const fetchChatHistory = createAsyncThunk(
  "lawbot/fetchChatHistory",
  async (sessionId, { rejectWithValue }) => {
    try {
      const response = await api.get(`docu_chat/sessions/${sessionId}/messages`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch chat history:", error);
      return rejectWithValue("Failed to fetch chat history.");
    }
  }
);

// Async Thunk for fetching uploaded PDFs
export const fetchUploadedPdfs = createAsyncThunk(
  "lawbot/fetchUploadedPdfs",
  async (sessionId, { rejectWithValue }) => {
    try {
      const response = await api.get(`docu_chat/sessions/${sessionId}/pdfs`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch PDFs:", error);
      return rejectWithValue("Failed to fetch PDFs.");
    }
  }
);

// Async Thunk for generating embed code
export const generateEmbedCode = createAsyncThunk(
  "lawbot/generateEmbedCode",
  async (sessionId, { rejectWithValue }) => {
    try {
      const response = await api.get(`docu_chat/sessions/${sessionId}/embed?documentsOnly=true`);
      return response.data.embed_code;
    } catch (error) {
      console.error("Failed to generate embed code:", error);
      return rejectWithValue("Error generating embed code. Please try again.");
    }
  }
);

// Slice
const lawbotSlice = createSlice({
  name: "lawbot",
  initialState: {
    sessions: [],
    currentSession: null,
    chatHistory: [],
    uploadedPdfs: [],
    embedCode: "",
    isLoading: false,
    error: null,
  },
  reducers: {
    clearSession: (state) => {
      state.currentSession = null;
      state.chatHistory = [];
      state.uploadedPdfs = [];
      state.embedCode = "";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Sessions
      .addCase(fetchSessions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSessions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sessions = action.payload;
      })
      .addCase(fetchSessions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Create New Session
      .addCase(createNewSession.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createNewSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentSession = action.payload;
        state.sessions = [...state.sessions, action.payload];
        state.chatHistory = [];
        state.uploadedPdfs = [];
        state.embedCode = "";
      })
      .addCase(createNewSession.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Rename Session
      .addCase(renameSession.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(renameSession.fulfilled, (state, action) => {
        state.isLoading = false;
        const { oldSessionId, newName } = action.payload;
        state.sessions = state.sessions.map((session) =>
          session === oldSessionId ? newName : session
        );
        if (state.currentSession === oldSessionId) {
          state.currentSession = newName;
        }
      })
      .addCase(renameSession.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Select Session
      .addCase(selectSession.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(selectSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentSession = action.payload.sessionId;
        state.chatHistory = action.payload.chatHistory;
        state.uploadedPdfs = action.payload.uploadedPdfs;
        state.embedCode = "";
      })
      .addCase(selectSession.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Delete Session
      .addCase(deleteSession.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentSession = null;
        state.chatHistory = [];
        state.uploadedPdfs = [];
        state.embedCode = "";
        state.sessions = state.sessions.filter((id) => id !== action.payload);
      })
      .addCase(deleteSession.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch Chat History
      .addCase(fetchChatHistory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchChatHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.chatHistory = action.payload;
      })
      .addCase(fetchChatHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch Uploaded PDFs
      .addCase(fetchUploadedPdfs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUploadedPdfs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.uploadedPdfs = action.payload;
      })
      .addCase(fetchUploadedPdfs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Generate Embed Code
      .addCase(generateEmbedCode.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(generateEmbedCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.embedCode = action.payload;
      })
      .addCase(generateEmbedCode.rejected, (state, action) => {
        state.isLoading = false;
        state.embedCode = action.payload; // Set error message as embedCode
      });
  },
});

export const { clearSession } = lawbotSlice.actions;
export default lawbotSlice.reducer;