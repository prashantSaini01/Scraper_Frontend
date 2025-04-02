import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import API_URL from "../components/config"; // Adjust path if necessary
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [platform, setPlatform] = useState("");
  const [query, setQuery] = useState("");
  const [queries, setQueries] = useState([]);
  const [subscribedTags, setSubscribedTags] = useState([]);
  const [sentimentData, setSentimentData] = useState(null);
  const [mostSearchedHashtag, setMostSearchedHashtag] = useState("");
  const [sentimentSummary, setSentimentSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);
  const [users, setUsers] = useState([]);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch queries, subscribed tags, and users
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const queriesResponse = await axios.get(`${API_URL}/get_queries`, {
          headers: { "x-access-token": token },
        });
        setQueries(queriesResponse.data.queries || []);

        const newslettersResponse = await axios.get(
          `${API_URL}/get_subscribed_tags`,
          {
            headers: { "x-access-token": token },
          }
        );
        setSubscribedTags(newslettersResponse.data.subscribed_tags || []);

        const usersResponse = await axios.get(`${API_URL}/get_users`, {
          headers: { "x-access-token": token },
        });
        setUsers(usersResponse.data.users || []);
      } catch (error) {
        console.error("Fetch error:", error.response?.data || error.message);
        if (error.response && error.response.status === 401) {
          setError("Session expired. Please log in again.");
          localStorage.removeItem("token");
          toast.error("Session expired. Please log in again.");
          setTimeout(() => navigate("/login"), 2000);
        } else {
          setError(
            error.response?.data.message ||
              "An error occurred while fetching data."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate, token]);

  // Fetch sentiment data
  useEffect(() => {
    if (!platform || !query) return;

    const fetchSentimentData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.post(
          `${API_URL}/get_sentiment_data`,
          { platform, query },
          { headers: { "x-access-token": token } }
        );

        if (response.data) {
          const sentiment = response.data.sentiment || {};
          setSentimentData({
            labels: ["Positive", "Negative", "Neutral"],
            datasets: [
              {
                data: [
                  sentiment.Positive || 0,
                  sentiment.Negative || 0,
                  sentiment.Neutral || 0,
                ],
                backgroundColor: ["#10B981", "#EF4444", "#F59E0B"],
                hoverBackgroundColor: ["#059669", "#DC2626", "#D97706"],
                borderWidth: 2,
                borderColor: "#fff",
              },
            ],
          });
          setMostSearchedHashtag(response.data.most_searched_hashtag || "N/A");
          setSentimentSummary(response.data.summary || "No summary available.");
        }
      } catch (error) {
        setError(
          error.response?.data.message ||
            "An error occurred while fetching sentiment data."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSentimentData();
  }, [platform, query, token]);

  // Handle unsubscribe
  const handleUnsubscribe = async () => {
    if (!selectedTag) return;

    try {
      const response = await axios.post(
        `${API_URL}/unsubscribe_newsletter`,
        { platform: selectedTag.platform, tag: selectedTag.tag },
        { headers: { "x-access-token": token } }
      );

      if (response.data.message) {
        toast.success(response.data.message);
        setSubscribedTags(
          subscribedTags.filter(
            (sub) =>
              !(
                sub.platform === selectedTag.platform &&
                sub.tag === selectedTag.tag
              )
          )
        );
      }
    } catch (error) {
      toast.error(error.response?.data.message || "Failed to unsubscribe.");
    } finally {
      setShowModal(false);
      setSelectedTag(null);
    }
  };

  // Handle add user
  const handleAddUser = async () => {
    if (!newUser.username || !newUser.email || !newUser.password) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      console.log("Adding user:", newUser);
      const response = await axios.post(`${API_URL}/add_user`, newUser, {
        headers: { "x-access-token": token },
      });

      console.log("Add user response:", response.data);
      if (response.data.message) {
        toast.success(response.data.message);
        setUsers([
          ...users,
          {
            _id: response.data.user_id,
            username: response.data.username,
            email: response.data.email,
            role: response.data.role,
          },
        ]);
        setNewUser({ username: "", email: "", password: "", role: "user" });
        setShowAddUserModal(false);
      }
    } catch (error) {
      console.error("Add user error:", error.response?.data || error.message);
      toast.error(error.response?.data.message || "Failed to add user.");
    }
  };

  // Handle remove user
  const handleRemoveUser = async () => {
    if (!selectedUser) return;

    try {
      const response = await axios.post(
        `${API_URL}/remove_user`,
        { user_id: selectedUser._id },
        { headers: { "x-access-token": token } }
      );

      if (response.data.message) {
        toast.success(response.data.message);
        setUsers(users.filter((user) => user._id !== selectedUser._id));
      }
    } catch (error) {
      toast.error(error.response?.data.message || "Failed to remove user.");
    } finally {
      setShowModal(false);
      setSelectedUser(null);
    }
  };

  // Open modals
  const openModal = (type, item) => {
    console.log(`Opening modal for ${type}:`, item);
    if (type === "tag") setSelectedTag(item);
    else if (type === "user") setSelectedUser(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTag(null);
    setSelectedUser(null);
  };

  // Handle opening add user modal
  const openAddUserModal = () => {
    console.log("Add User button clicked, opening modal");
    setShowAddUserModal(true);
  };

  const handleGetNewsletter = async () => {
    if (subscribedTags.length === 0) {
      toast.info("No subscribed tags available to fetch newsletters.");
      return;
    }

    setNewsletterLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/get_newsletter_now`,
        {},
        { headers: { "x-access-token": token } }
      );
      if (response.data.message) toast.success(response.data.message);
    } catch (error) {
      if (error.response?.status === 401) {
        setError("Session expired. Please log in again.");
        localStorage.removeItem("token");
        toast.error("Session expired. Please log in again.");
        setTimeout(() => navigate("/login"), 2000);
      } else if (error.response?.status === 404) {
        toast.info(error.response.data.message);
      } else {
        toast.error("Wait for sometime, the newsletter is on its way ...");
      }
    } finally {
      setNewsletterLoading(false);
    }
  };

  const goToHome = () => navigate("/");

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: { size: 14, family: "Poppins" },
          color: "#1F2937",
          padding: 20,
        },
      },
      title: {
        display: true,
        text: "Sentiment Distribution",
        font: { size: 20, family: "Poppins", weight: "bold" },
        color: "#1F2937",
        padding: { top: 20, bottom: 20 },
      },
      tooltip: {
        backgroundColor: "#1F2937",
        titleFont: { family: "Poppins", size: 14 },
        bodyFont: { family: "Poppins", size: 12 },
        padding: 12,
        cornerRadius: 8,
      },
    },
    animation: { animateScale: true, animateRotate: true },
  };

  const filteredQueries = platform
    ? [
        ...new Set(
          queries.filter((q) => q.platform === platform).map((q) => q.query)
        ),
      ]
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 flex flex-col py-12 px-6 relative">
      <button
        onClick={goToHome}
        className="absolute top-6 right-6 px-6 py-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 group"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 transform group-hover:rotate-12 transition-transform duration-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
        <span className="font-medium">Back to Home</span>
      </button>

      <div className="w-full max-w-7xl mx-auto space-y-10">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-purple-700 animate-pulse">
            Insights Dashboard
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Analyze trends and sentiments across platforms
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-2xl border border-gray-100">
          <div className="flex flex-col sm:flex-row gap-6 items-center">
            <div className="w-full sm:w-1/2">
              <label className="block text-lg font-semibold text-indigo-800 mb-2">
                Platform
              </label>
              <select
                value={platform}
                onChange={(e) => {
                  setPlatform(e.target.value);
                  setQuery("");
                }}
                className="w-full p-4 bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <option value="">Select Platform</option>
                <option value="youtube">YouTube</option>
                <option value="twitch">Twitch</option>
                <option value="instagram">Instagram</option>
                <option value="tiktok">TikTok</option>
                <option value="facebook">Facebook</option>
                <option value="linkedin">LinkedIn</option>
              </select>
            </div>
            <div className="w-full sm:w-1/2">
              <label className="block text-lg font-semibold text-purple-800 mb-2">
                Search Tag
              </label>
              <div className="flex items-center gap-4">
                <select
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full p-4 bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300"
                  disabled={!platform}
                >
                  <option value="">Select Tag</option>
                  {filteredQueries.map((queryValue, index) => (
                    <option key={index} value={queryValue}>
                      {queryValue}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => {
                    setPlatform("");
                    setQuery("");
                    setSentimentData(null);
                    setMostSearchedHashtag("");
                    setSentimentSummary("");
                  }}
                  className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-xl hover:from-red-600 hover:to-red-800 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>

        {platform && query && (
          <div className="grid grid-cols-1 gap-8">
            <div className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2V13a2 2 0 00-2-2h-2a2 2 0 00-2 2v6a2 2 0 002 2z"
                  />
                </svg>
                Sentiment Analysis
              </h3>
              <div className="flex flex-col lg:flex-row-reverse gap-8">
                <div className="lg:w-1/3 flex justify-center items-center">
                  {sentimentData ? (
                    <div className="relative w-full max-w-md">
                      <Pie data={sentimentData} options={pieOptions} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/95 rounded-full px-4 py-2 shadow-md border border-gray-200">
                          <p className="text-sm font-semibold text-gray-700">
                            Total:{" "}
                            {sentimentData.datasets[0].data.reduce(
                              (a, b) => a + b,
                              0
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 italic text-center">
                      No sentiment data available.
                    </p>
                  )}
                </div>
                <div className="lg:w-2/3">
                  <h4 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Summary
                  </h4>
                  {sentimentSummary ? (
                    <div
                      className="text-gray-600 prose prose-ul:pl-5 prose-li:marker:text-blue-600 h-[450px] overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-gray-100 scrollbar-thumb-rounded-full scrollbar-track-rounded-full p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg shadow-inner border border-gray-200"
                      dangerouslySetInnerHTML={{ __html: sentimentSummary }}
                    />
                  ) : (
                    <p className="text-gray-500 italic p-6 bg-gray-50 rounded-lg">
                      No summary available.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-purple-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                />
              </svg>
              Your Subscribed Tags
            </h3>
            <button
              onClick={handleGetNewsletter}
              disabled={subscribedTags.length === 0 || newsletterLoading}
              className={`px-6 py-2 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-2 ${
                subscribedTags.length === 0 || newsletterLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-500 to-purple-700 text-white hover:from-purple-600 hover:to-purple-800"
              }`}
            >
              {newsletterLoading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              )}
              <span>
                {newsletterLoading ? "Sending..." : "Get Newsletter Right Now"}
              </span>
            </button>
          </div>
          {subscribedTags.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-80 overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-gray-100 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
              {subscribedTags.map((tag, index) => (
                <div
                  key={index}
                  className="p-4 bg-purple-50 rounded-xl shadow-sm hover:bg-purple-100 hover:shadow-md transition-all duration-300 flex items-center group relative"
                >
                  <span
                    className="font-medium text-gray-800 flex-grow truncate"
                    title={tag.tag}
                  >
                    {tag.tag}
                  </span>
                  <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span
                      className="text-sm text-purple-600 truncate"
                      title={tag.platform}
                    >
                      {tag.platform}
                    </span>
                    <button
                      onClick={() => openModal("tag", tag)}
                      className="text-red-500 hover:text-red-700 flex-shrink-0"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No subscribed tags found.</p>
          )}
        </div>
      </div>

      {/* Confirmation Modal (for unsubscribe or remove user) */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {selectedTag ? "Confirm Unsubscribe" : "Confirm Remove User"}
            </h3>
            <p className="text-gray-600 mb-6">
              {selectedTag ? (
                <>
                  Are you sure you want to unsubscribe from{" "}
                  <span className="font-medium">{selectedTag.tag}</span> on{" "}
                  <span className="font-medium">{selectedTag.platform}</span>?
                </>
              ) : (
                <>
                  Are you sure you want to remove user{" "}
                  <span className="font-medium">{selectedUser?.username}</span>?
                </>
              )}
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-300"
              >
                No
              </button>
              <button
                onClick={selectedTag ? handleUnsubscribe : handleRemoveUser}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

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

      {loading && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-60 flex justify-center items-center z-50">
          <div className="w-20 h-20 border-4 border-t-transparent border-indigo-500 rounded-full animate-spin"></div>
        </div>
      )}

      {error && (
        <div className="fixed top-4 right-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-lg animate-slide-in">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
