
import React, { useState } from "react";
import axios from "axios";
import API_URL from "./config";
import { useNavigate } from "react-router-dom";

const TikTokScraper = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [post_count, setPostCount] = useState(10);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const handleScrape = async () => {
    const hashtag = query.trim();
    if (!hashtag) {
      alert("Please enter a hashtag to search.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/scrape_tiktok`,
        { hashtag, post_count },
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        }
      );
      setPosts(response.data.response);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Session expired. Please log in again.");
        localStorage.removeItem("token");
        
        // Show alert and add delay before redirecting
        window.alert("Session expired. Please log in again."); // Show alert
        setTimeout(() => {
          navigate("/login"); // Redirect after delay
        }, 2000); // 2-second delay
      } else {
        setError("An error occurred while scraping TikTok.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <h2 className="text-4xl text-center text-purple-800 font-bold mb-8">
        TikTok Scraper
      </h2>

      <div className="w-full max-w-lg space-y-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter hashtag (e.g., #ai)"
          className="w-full p-4 text-lg border-2 border-purple-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <input
          type="number"
          value={post_count}
          onChange={(e) => setPostCount(e.target.value)}
          placeholder="Number of posts (e.g., 10)"
          className="w-full p-4 text-lg border-2 border-purple-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <button
          onClick={handleScrape}
          className={`w-full mt-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-300 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading || !query.trim()}
        >
          {loading ? "Scraping..." : "Fetch Posts"}
        </button>
      </div>

      {/* Improved Icons Section */}
      <div className="flex justify-center gap-6 mt-8">
        {[
          { label: "Author ID", icon: "👤" },
          { label: "Cover Image", icon: "🖼️" },
          { label: "Hashtags", icon: "🏷️" },
          { label: "Title", icon: "📄" },
          { label: "Video URL", icon: "🎥" },
        ].map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
          >
            <div className="text-3xl mb-1">{item.icon}</div>
            <div className="text-sm text-center font-medium">{item.label}</div>
          </div>
        ))}
      </div>

      {loading && (
        <div className="flex justify-center items-center mt-10">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent border-solid rounded-full animate-spin"></div>
        </div>
      )}

      {posts.length > 0 && (
        <div className="w-full max-w-6xl mt-10 p-4 bg-white border-2 border-gray-200 rounded-lg shadow-inner">
          <h3 className="text-xl font-semibold mb-4 text-center text-purple-800">
            Scraped TikTok Data
          </h3>

          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-gray-100 text-purple-800 font-bold text-center">
                  {posts.length > 0 &&
                    Object.keys(posts[0]).map((header, index) => (
                      <th key={index} className="border p-2 whitespace-nowrap">
                        {header}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {posts.map((post, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="text-center hover:bg-gray-50 transition-colors duration-200"
                  >
                    {Object.keys(post).map((header, colIndex) => (
                      <td
                        key={colIndex}
                        className={`border p-2 ${
                          header.toLowerCase().includes("hashtag") ||
                          header.toLowerCase().includes("title")
                            ? "max-w-xs break-words whitespace-normal"
                            : ""
                        }`}
                      >
                        {header.toLowerCase().includes("image") ? (
                          <img
                            src={post[header]}
                            alt={header}
                            className="w-16 h-16 object-cover rounded-lg shadow-sm hover:shadow-md transition-shadow"
                          />
                        ) : header.toLowerCase().includes("video") ? (
                          <a
                            href={post[header]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Watch Video
                          </a>
                        ) : (
                          post[header]
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default TikTokScraper;
