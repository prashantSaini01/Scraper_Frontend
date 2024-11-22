import React, { useState } from "react";
import axios from "axios";
import API_URL from "./config";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaAt,
  FaPenFancy,
  FaHashtag,
  FaCalendarAlt,
  FaLink,
} from "react-icons/fa";

const LinkedInScraper = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
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
        `${API_URL}/scrape_linkedin`,
        { hashtag },
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
        setError("An error occurred while scraping Linkedin.");
      }
    } finally {
      setLoading(false);
    }
  };

  const downloadCSV = () => {
    if (!posts.length) {
      alert("No data available to download.");
      return;
    }

    const csvHeader =
      "Author Name,Author Username,Post Content,Hashtags,Post Date,Post URL\n";
    const csvRows = posts.map((post) => {
      const authorName = post.author_name || "";
      const authorUsername = post.author_username || "";
      const content = post.post_content || "";
      const hashtags = (post.hashtags || []).join(", ");
      const postDate = format(new Date(post.posted_date), "PPpp");
      const postUrl = post.post_url || "";

      return `"${authorName}","${authorUsername}","${content}","${hashtags}","${postDate}","${postUrl}"`;
    });

    const csvContent = csvHeader + csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "linkedin_posts.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  // Code above remains unchanged

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <h2 className="text-4xl text-center text-blue-800 font-bold mb-8">
        LinkedIn Scraper
      </h2>

      <div className="w-full max-w-lg space-y-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter a hashtag (e.g., Inzint)"
          className="w-full p-4 text-lg border-2 border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button
          onClick={handleScrape}
          className={`w-full mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-300 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading || !query.trim()}
        >
          {loading ? "Scraping..." : "Fetch Posts"}
        </button>
      </div>

      {/* Icons Section */}
      <div className="grid grid-cols-3 gap-4 mt-8">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-200 text-blue-800">
            <FaUser size={28} />
          </div>
          <p className="text-sm text-center mt-2 font-medium text-blue-800">
            Author Name
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-200 text-blue-800">
            <FaAt size={28} />
          </div>
          <p className="text-sm text-center mt-2 font-medium text-blue-800">
            Username
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-200 text-blue-800">
            <FaPenFancy size={28} />
          </div>
          <p className="text-sm text-center mt-2 font-medium text-blue-800">
            Post Content
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-200 text-blue-800">
            <FaHashtag size={28} />
          </div>
          <p className="text-sm text-center mt-2 font-medium text-blue-800">
            Hashtags
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-200 text-blue-800">
            <FaCalendarAlt size={28} />
          </div>
          <p className="text-sm text-center mt-2 font-medium text-blue-800">
            Post Date
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-200 text-blue-800">
            <FaLink size={28} />
          </div>
          <p className="text-sm text-center mt-2 font-medium text-blue-800">
            Post URL
          </p>
        </div>
      </div>

      {/* Rest of the component remains unchanged */}
      {loading && (
        <div className="flex justify-center items-center mt-10">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
        </div>
      )}

      {/* Posts Section */}
      {posts.length > 0 && (
        <div className="w-full max-w-4xl mt-10 p-4 bg-white border-2 border-gray-200 rounded-lg shadow-inner">
          <h3 className="text-xl font-semibold mb-4 text-center text-blue-800">
            Scraped LinkedIn Data
          </h3>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-blue-100">
                  <th className="px-4 py-2 border">Author Name</th>
                  <th className="px-4 py-2 border">Username</th>
                  <th className="px-4 py-2 border">Post Content</th>
                  <th className="px-4 py-2 border">Hashtags</th>
                  <th className="px-4 py-2 border">Post Date</th>
                  <th className="px-4 py-2 border">Post URL</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post, index) => (
                  <tr key={index} className="hover:bg-blue-50">
                    <td className="px-4 py-2 border">
                      {post.author_name || "N/A"}
                    </td>
                    <td className="px-4 py-2 border">
                      {post.author_username || "N/A"}
                    </td>
                    <td className="px-4 py-2 border">
                      {post.post_content || "N/A"}
                    </td>
                    <td className="px-4 py-2 border">
                      {(post.hashtags || []).join(", ")}
                    </td>
                    <td className="px-4 py-2 border">
                      {format(new Date(post.posted_date), "PPpp")}
                    </td>
                    <td className="px-4 py-2 border">
                      <a
                        href={post.post_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        View Post
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            onClick={downloadCSV}
            className="mt-4 px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-300"
          >
            Download CSV
          </button>
        </div>
      )}
    </div>
  );
};

export default LinkedInScraper;
