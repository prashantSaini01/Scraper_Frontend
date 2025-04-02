import React from "react";
import { Routes, Route } from "react-router-dom";
import Abrassio from "./pages/Abrassio";
import InstagramScraper from "./pages/InstagramScraper";
import TwitterScraper from "./pages/TwitterScraper";
import LinkedinScraper from "./pages/LinkedinScraper";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import YoutubeScraper from "./pages/Youtube";
import TwitchScraper from "./pages/Twitch";
import TikTokScraper from "./pages/TiktokScrapper";
import Homepage from "./pages/Homepage";
import ContentGenerator from "./pages/writer/ContentGenerator";
import Dashboard from "./pages/Dashboard";
import Lawbot from "./pages/lawbot";
import WhyUs from "./pages/WhyContentGenerator";
import ViraAI from "./pages/ViraAI";
import AIvertise from "./pages/AIvertise";
import Users from "./pages/Users";

const RoutesConfig = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />

      {/* Protected routes */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Homepage />
          </PrivateRoute>
        }
      />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Homepage />
          </PrivateRoute>
        }
      />
      <Route
        path="/abrassio"
        element={
          <PrivateRoute>
            <Abrassio />
          </PrivateRoute>
        }
      />
      <Route
        path="/instagram"
        element={
          <PrivateRoute>
            <InstagramScraper />
          </PrivateRoute>
        }
      />
      <Route
        path="/twitter"
        element={
          <PrivateRoute>
            <TwitterScraper />
          </PrivateRoute>
        }
      />
      <Route
        path="/linkedin"
        element={
          <PrivateRoute>
            <LinkedinScraper />
          </PrivateRoute>
        }
      />
      <Route
        path="/youtube"
        element={
          <PrivateRoute>
            <YoutubeScraper />
          </PrivateRoute>
        }
      />
      <Route
        path="/twitch"
        element={
          <PrivateRoute>
            <TwitchScraper />
          </PrivateRoute>
        }
      />
      <Route
        path="/tiktok"
        element={
          <PrivateRoute>
            <TikTokScraper />
          </PrivateRoute>
        }
      />
      <Route
        path="/socialspark"
        element={
          <PrivateRoute>
            <WhyUs />
          </PrivateRoute>
        }
      />
      <Route
        path="/try-it"
        element={
          <PrivateRoute>
            <ContentGenerator />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/legalbot"
        element={
          <PrivateRoute>
            <Lawbot />
          </PrivateRoute>
        }
      />
      <Route
        path="/vira-ai"
        element={
          <PrivateRoute>
            <ViraAI />
          </PrivateRoute>
        }
      />
      <Route
        path="/aivertise"
        element={
          <PrivateRoute>
            <AIvertise />
          </PrivateRoute>
        }
      />
      <Route
        path="/users"
        element={
          <PrivateRoute>
            <Users />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default RoutesConfig;