import React, { useState } from "react";
import axios from "axios";
import API_URL from "./config";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaAt,
  FaInfoCircle,
  FaLink,
  FaRegComment,
  FaCalendarAlt,
  FaExternalLinkAlt,
} from "react-icons/fa";

const TwitterScraper = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const handleScrape = async () => {
    const keyword = query.trim();
    if (!keyword) {
      alert("Please enter a keyword to search.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/scrape_twitter`,
        { keyword },
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
        setError("An error occurred while scraping Twitter.");
      }
    } finally {
      setLoading(false);
    }
  };

  const convertToCSV = (objArray) => {
    if (!objArray || !objArray.length) return "";
    const headers = Object.keys(objArray[0]);
    const rows = objArray.map((obj) =>
      headers.map((header) => JSON.stringify(obj[header] || "")).join(",")
    );
    return [headers.join(","), ...rows].join("\r\n");
  };

  const downloadCSV = () => {
    const csv = convertToCSV(posts);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "scraped_posts.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-light flex flex-col items-center justify-center p-6">
      <h2 className="text-4xl text-center text-blue-950 font-bold mb-8">
        Twitter Scraper
      </h2>

      <div className="w-full max-w-lg space-y-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter a keyword (e.g., UFC)"
          className="w-full p-4 text-lg border-2 border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button
          onClick={handleScrape}
          className={`w-full mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-300 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading || !query.trim()}
        >
          {loading ? "Scraping..." : "Start Scraping"}
        </button>
      </div>

      {/* Icons Section */}
      <div className="grid grid-cols-4 sm:grid-cols-7 gap-4 mt-10 text-center">
        <div className="flex flex-col items-center text-blue-600">
          <FaUser className="text-3xl" />
          <span className="mt-2 text-sm">Author Name</span>
        </div>
        <div className="flex flex-col items-center text-blue-600">
          <FaAt className="text-3xl" />
          <span className="mt-2 text-sm">Username</span>
        </div>
        <div className="flex flex-col items-center text-blue-600">
          <FaInfoCircle className="text-3xl" />
          <span className="mt-2 text-sm">Author Description</span>
        </div>
        <div className="flex flex-col items-center text-blue-600">
          <FaLink className="text-3xl" />
          <span className="mt-2 text-sm">Profile URL</span>
        </div>
        <div className="flex flex-col items-center text-blue-600">
          <FaRegComment className="text-3xl" />
          <span className="mt-2 text-sm">Tweet Text</span>
        </div>
        <div className="flex flex-col items-center text-blue-600">
          <FaCalendarAlt className="text-3xl" />
          <span className="mt-2 text-sm">Created At</span>
        </div>
        <div className="flex flex-col items-center text-blue-600">
          <FaExternalLinkAlt className="text-3xl" />
          <span className="mt-2 text-sm">Post Link</span>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center mt-10">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent border-solid rounded-full animate-spin"></div>
        </div>
      )}

      {posts.length > 0 && (
        <div className="w-full max-w-4xl mt-10 p-4 bg-white border-2 border-gray-200 rounded-lg shadow-inner">
          <h3 className="text-xl font-semibold mb-4 text-center text-blue-950">
            Scraped Twitter Data
          </h3>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-gray-100 text-blue-950 font-bold text-center">
                  <th className="border p-2">Author Name</th>
                  <th className="border p-2">Username</th>
                  <th className="border p-2">Author Description</th>
                  <th className="border p-2">Profile URL</th>
                  <th className="border p-2">Tweet Text</th>
                  <th className="border p-2">Created At</th>
                  <th className="border p-2">Link</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post, index) => (
                  <tr
                    key={index}
                    className="text-center hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="border p-2">{post["Author Name"]}</td>
                    <td className="border p-2">@{post["Author Username"]}</td>
                    <td className="border p-2">{post["Author Description"]}</td>
                    <td className="border p-2">
                      <a
                        href={post["Profile URL"]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Profile Link
                      </a>
                    </td>
                    <td className="border p-2">{post["Tweet Text"]}</td>
                    <td className="border p-2">
                      {format(new Date(post["Created At"]), "PPpp")}
                    </td>
                    <td className="border p-2">
                      <a
                        href={`https://twitter.com/${post["Author Username"]}/status/${post["Tweet ID"]}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View Tweet
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            onClick={downloadCSV}
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Download CSV
          </button>
        </div>
      )}
    </div>
  );
};

export default TwitterScraper;
