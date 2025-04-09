import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "../slices/abrassio/dashboardSlice";
import instagramScraperReducer from "../slices/abrassio/instagramScraperSlice";
import linkedInScraperReducer from "../slices/abrassio/linkedInScraperSlice";
import tikTokScraperReducer from "../slices/abrassio/tikTokScraperSlice";
import twitchScraperReducer from "../slices/abrassio/twitchScraperSlice";
import twitterScraperReducer from "../slices/abrassio/twitterScraperSlice";
import usersReducer from "../slices/abrassio/usersSlice";
import youtubeScraperReducer from "../slices/abrassio/youtubeScraperSlice";
import lawbotReducer from "../slices/lawbot/lawbotSlice";
import authReducer from "../slices/auth/authSlice";



export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    instagramScraper: instagramScraperReducer,
    linkedInScraper: linkedInScraperReducer,
    tikTokScraper: tikTokScraperReducer,
    twitchScraper: twitchScraperReducer,
    twitterScraper: twitterScraperReducer,
    users: usersReducer,
    youtubeScraper: youtubeScraperReducer,
    lawbot: lawbotReducer,
    auth: authReducer,
  },
});
