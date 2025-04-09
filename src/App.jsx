import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import { ToastContainer } from "react-toastify";

// Import all pages
import Homepage from "./pages/Homepage";
import SignUp from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import Abrassio from "./pages/abrassio/Abrassio";
import InstagramScraper from "./pages/abrassio/InstagramScraper";
import TwitterScraper from "./pages/abrassio/TwitterScraper";
import LinkedinScraper from "./pages/abrassio/LinkedinScraper";
import YoutubeScraper from "./pages/abrassio/Youtube";
import TwitchScraper from "./pages/abrassio/Twitch";
import TikTokScraper from "./pages/abrassio/TiktokScrapper";
import Dashboard from "./pages/abrassio/Dashboard";
import Lawbot from "./pages/docuChat/lawbot";
import WhyUs from "./pages/writer/WhyContentGenerator";
import AIvertise from "./pages/aivertise/Aivertise";
import Users from "./pages/abrassio/Users";
import ViraAI from "./pages/viraAI/ViraAI";

function App() {
  return (
    <Router>
      <Routes>
        {/* Route that needs no layout */}
        <Route
          path="/vira-ai"
          element={
            <PrivateRoute>
              <ViraAI />
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

        {/* All other routes with layout */}
        <Route
          path="*"
          element={
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow container mx-auto p-4 mt-20">
                <Suspense fallback={<div>Loading...</div>}>
                  <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />

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
                      path="/aivertise"
                      element={
                        <PrivateRoute>
                          <AIvertise />
                        </PrivateRoute>
                      }
                    />
                    <Route path="/users" element={<Users />} />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
              <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
