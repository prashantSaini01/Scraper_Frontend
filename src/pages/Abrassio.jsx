import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_URL from "../components/config";
import {
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaTwitch,
  FaTiktok,
  FaUsers,
  FaChartBar
} from "react-icons/fa";

const Abrassio = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  const goToUsers = () => {
    navigate("/users");
  };

  const handleAddUser = async () => {
    if (!token) {
      toast.error("Please log in to add a user.");
      return;
    }

    if (!newUser.username || !newUser.email || !newUser.password) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/add_user`,
        newUser,
        { headers: { "x-access-token": token } }
      );

      if (response.data.message) {
        toast.success(response.data.message);
        setNewUser({ username: "", email: "", password: "", role: "user" });
        setShowAddUserModal(false);
      }
    } catch (error) {
      console.error("Add user error:", error.response?.data || error.message);
      toast.error(error.response?.data.message || "Failed to add user.");
    }
  };

  const openAddUserModal = () => {
    setShowAddUserModal(true);
  };

  return (
    <div className="text-center p-20 bg-gradient-to-b from-blue-50 to-gray-100 relative">
    {/* Top Right Buttons */}
    <div className="absolute top-4 right-4 flex space-x-4">
      <button
        onClick={goToDashboard}
        className="bg-blue-600 text-white py-2 px-6 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 flex items-center gap-2"
      >
        <FaChartBar className="text-lg" />
        <span>Dashboard</span>
      </button>
      <button
        onClick={goToUsers}
        className="bg-green-600 text-white py-2 px-6 rounded-full shadow-lg hover:bg-green-700 transition duration-300 flex items-center gap-2"
      >
        <FaUsers className="text-lg" />
        <span>Users</span>
      </button>
    </div>

      {/* Hero Section */}
      <div className="mb-16">
        <h2 className="text-5xl font-bold text-gray-900 mb-6">
          Welcome to Scraping Assistant
        </h2>
        <p className="text-xl text-gray-700 mb-8">
          Web scraping is a powerful tool for collecting data from various
          online platforms. Select a platform to start extracting valuable
          insights.
        </p>
        <p className="text-2xl font-semibold text-blue-600 mb-6">
          Choose a platform to start scraping
        </p>
      </div>

      {/* Platform Scrapers */}
      <div className="flex justify-center flex-wrap gap-8">
         {/* YouTube Scraper */}
         <div className="relative flex flex-col items-center bg-white p-6 rounded-lg shadow-lg w-60 hover:scale-105 transition-transform duration-300 hover:bg-blue-50 overflow-hidden">
          <FaYoutube className="text-4xl text-red-600 mb-4 relative z-10" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2 relative z-10">
            YouTube Scraper
          </h3>
          <p className="text-gray-600 mb-4 relative z-10">
            Gather video details, comments, and channel statistics from YouTube.
          </p>
          <Link
            to="/youtube"
            className="bg-gradient-to-r from-red-800 to-red-400 text-white py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 relative z-10"
          >
            Start Scraping
          </Link>
        </div>
         {/* Twitch Scraper */}
         <div className="relative flex flex-col items-center bg-white p-6 rounded-lg shadow-lg w-60 hover:scale-105 transition-transform duration-300 hover:bg-blue-50 overflow-hidden">
          <FaTwitch className="text-4xl text-purple-600 mb-4 relative z-10" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2 relative z-10">
            Twitch Scraper
          </h3>
          <p className="text-gray-600 mb-4 relative z-10">
            Retrieve streams, chat messages, and viewer data from Twitch.
          </p>
          <Link
            to="/twitch"
            className="bg-gradient-to-r from-pink-500 to-indigo-600 text-white py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 relative z-10"
          >
            Start Scraping
          </Link>
        </div>
{/* Twitter Scraper */}
<div className="relative flex flex-col items-center bg-white p-6 rounded-lg shadow-lg w-60 hover:scale-105 transition-transform duration-300 hover:bg-blue-50 overflow-hidden">
  <div className="absolute top-0 left-0 w-[150%] h-3 bg-black transform -rotate-45 -translate-x-1/4 translate-y-[-50%] opacity-70 shadow-md flex items-center justify-center">
    <span className="text-white text-[10px] whitespace-nowrap">
      Coming Soon ..........................................................
    </span>
  </div>
  <FaTwitter className="text-4xl text-blue-500 mb-4 relative z-10" />
  <h3 className="text-xl font-semibold text-gray-800 mb-2 relative z-10">
    Twitter Scraper
  </h3>
  <p className="text-gray-600 mb-4 relative z-10">
    Collect tweets, hashtags, and user information from Twitter.
  </p>
  <Link
    to="/twitter"
    className={`bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 px-6 rounded-full shadow-lg transform transition-transform duration-300 relative z-10 ${
      true ? 'pointer-events-none opacity-50' : 'hover:scale-105'
    }`}
  >
    Start Scraping
  </Link>
</div>

{/* Instagram Scraper */}
<div className="relative flex flex-col items-center bg-white p-6 rounded-lg shadow-lg w-60 hover:scale-105 transition-transform duration-300 hover:bg-blue-50 overflow-hidden">
  <div className="absolute top-0 left-0 w-[150%] h-3 bg-black transform -rotate-45 -translate-x-1/4 translate-y-[-50%] opacity-70 shadow-md flex items-center justify-center">
    <span className="text-white text-[10px] whitespace-nowrap">
      Coming Soon ..........................................................
    </span>
  </div>
  <FaInstagram className="text-4xl text-pink-500 mb-4 relative z-10" />
  <h3 className="text-xl font-semibold text-gray-800 mb-2 relative z-10">
    Instagram Scraper
  </h3>
  <p className="text-gray-600 mb-4 relative z-10">
    Extract user profiles, posts, comments, and likes from Instagram.
  </p>
  <Link
    to="/instagram"
    className={`bg-gradient-to-r from-pink-500 to-red-500 text-white py-3 px-6 rounded-full shadow-lg transform transition-transform duration-300 relative z-10 ${
      true ? 'pointer-events-none opacity-50' : 'hover:scale-105'
    }`}
  >
    Start Scraping
  </Link>
</div>

{/* TikTok Scraper */}
<div className="relative flex flex-col items-center bg-white p-6 rounded-lg shadow-lg w-60 hover:scale-105 transition-transform duration-300 hover:bg-blue-50 overflow-hidden">
  <div className="absolute top-0 left-0 w-[150%] h-3 bg-black transform -rotate-45 -translate-x-1/4 translate-y-[-50%] opacity-70 shadow-md flex items-center justify-center">
    <span className="text-white text-[10px] whitespace-nowrap">
      Coming Soon ..........................................................
    </span>
  </div>
  <FaTiktok className="text-4xl text-black mb-4 relative z-10" />
  <h3 className="text-xl font-semibold text-gray-800 mb-2 relative z-10">
    TikTok Scraper
  </h3>
  <p className="text-gray-600 mb-4 relative z-10">
    Extract TikTok user profiles, videos, likes, and comments.
  </p>
  <Link
    to="/tiktok"
    className={`bg-gradient-to-r from-gray-900 to-gray-600 text-white py-3 px-6 rounded-full shadow-lg transform transition-transform duration-300 relative z-10 ${
      true ? 'pointer-events-none opacity-50' : 'hover:scale-105'
    }`}
  >
    Start Scraping
  </Link>
</div>

{/* LinkedIn Scraper */}
<div className="relative flex flex-col items-center bg-white p-6 rounded-lg shadow-lg w-60 hover:scale-105 transition-transform duration-300 hover:bg-blue-50 overflow-hidden">
  <div className="absolute top-0 left-0 w-[150%] h-3 bg-black transform -rotate-45 -translate-x-1/4 translate-y-[-50%] opacity-70 shadow-md flex items-center justify-center">
    <span className="text-white text-[10px] whitespace-nowrap">
      Coming Soon ..........................................................
    </span>
  </div>
  <FaLinkedin className="text-4xl text-blue-700 mb-4 relative z-10" />
  <h3 className="text-xl font-semibold text-gray-800 mb-2 relative z-10">
    LinkedIn Scraper
  </h3>
  <p className="text-gray-600 mb-4 relative z-10">
    Scrape profiles, connections, and job listings from LinkedIn.
  </p>
  <Link
    to="/linkedin"
    className={`bg-gradient-to-r from-blue-800 to-purple-800 text-white py-3 px-6 rounded-full shadow-lg transform transition-transform duration-300 relative z-10 ${
      true ? 'pointer-events-none opacity-50' : 'hover:scale-105'
    }`}
  >
    Start Scraping
  </Link>
</div>

       
      </div>

      {/* Feature Cards Section */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-blue-50 p-8 rounded-lg shadow-lg text-center hover:bg-blue-100 transition duration-300">
          <h3 className="text-2xl font-semibold text-blue-600 mb-4">
            Gain Competitive Insights
          </h3>
          <p className="text-gray-700">
            Web scraping enables you to collect competitor data, analyze their
            strategies, and adjust your approach for market leadership.
          </p>
        </div>

        <div className="bg-green-50 p-8 rounded-lg shadow-lg text-center hover:bg-green-100 transition duration-300">
          <h3 className="text-2xl font-semibold text-green-600 mb-4">
            Automate Data Collection
          </h3>
          <p className="text-gray-700">
            Eliminate manual data entry by automating the extraction of
            information from websites, improving efficiency and accuracy.
          </p>
        </div>

        <div className="bg-yellow-50 p-8 rounded-lg shadow-lg text-center hover:bg-yellow-100 transition duration-300">
          <h3 className="text-2xl font-semibold text-yellow-600 mb-4">
            Unlock Market Trends
          </h3>
          <p className="text-gray-700">
            Discover market trends and audience behaviors by scraping data from
            multiple sources, helping you make informed decisions.
          </p>
        </div>

        <div className="bg-purple-50 p-8 rounded-lg shadow-lg text-center hover:bg-purple-100 transition duration-300">
          <h3 className="text-2xl font-semibold text-purple-600 mb-4">
            Collect Social Media Insights
          </h3>
          <p className="text-gray-700">
            Leverage web scraping to gather social media data, track mentions,
            sentiment, and influencer activity for better engagement strategies.
          </p>
        </div>

        <div className="bg-red-50 p-8 rounded-lg shadow-lg text-center hover:bg-red-100 transition duration-300">
          <h3 className="text-2xl font-semibold text-red-600 mb-4">
            Real-Time Data Monitoring
          </h3>
          <p className="text-gray-700">
            Scrape real-time data such as product prices, stock availability,
            and news updates to keep your business agile and responsive.
          </p>
        </div>

        <div className="bg-orange-50 p-8 rounded-lg shadow-lg text-center hover:bg-orange-100 transition duration-300">
          <h3 className="text-2xl font-semibold text-orange-600 mb-4">
            Enhance Decision-Making
          </h3>
          <p className="text-gray-700">
            Gather and analyze data across different platforms to inform your
            decision-making process and drive business success.
          </p>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Add New User
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                value={newUser.username}
                onChange={(e) =>
                  setNewUser({ ...newUser, username: e.target.value })
                }
                placeholder="Username"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                placeholder="Email"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="password"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
                placeholder="Password"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <select
                value={newUser.role}
                onChange={(e) =>
                  setNewUser({ ...newUser, role: e.target.value })
                }
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setShowAddUserModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUser}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Abrassio;
