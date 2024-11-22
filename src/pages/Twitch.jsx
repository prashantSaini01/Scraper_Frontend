
import React, { useState } from 'react';
import API_URL from './config'; 
import { FaVideo, FaUserAlt, FaCalendar, FaLink, FaImage } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const TwitchVideos = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [numVideos, setNumVideos] = useState(5);
  const token = localStorage.getItem('token'); 

  const fetchVideos = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/scrape_twitch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        },
        body: JSON.stringify({
          keyword,
          num_videos: parseInt(numVideos, 10)
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setVideos(data.response);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Session expired. Please log in again.");
        localStorage.removeItem("token");
        
        // Show alert and add delay before redirecting
        window.alert("Session expired. Please log in again."); // Show alert
        setTimeout(() => {
          navigate("/login"); // Redirect after delay
        }, 2000); // 2-second delay
      }else {
        setError("An error occurred while scraping Twitch.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchVideos();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-8">
      <h2 className="text-4xl text-center text-blue-950 font-bold mb-8">Twitch Scraper</h2>

      <div className="w-full max-w-lg space-y-4">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Enter keyword"
            className="w-full p-4 text-lg border-2 border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 mb-4"
            required
          />
          <input
            type="number"
            value={numVideos}
            onChange={(e) => setNumVideos(e.target.value)}
            placeholder="Number of videos to scrape"
            className="w-full p-4 text-lg border-2 border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 mb-6"
            min="1"
            max="50"
            required
          />
          <button
            type="submit"
            className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-300"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Search'}
          </button>
        </form>
      </div>

      {error && (
        <div className="w-full max-w-lg mt-10 p-4 bg-red-100 text-red-700 border-2 border-red-400 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Error:</h3>
          <p>{error}</p>
        </div>
      )}

      {/* Data Point Icons */}
      <div className="w-full max-w-lg flex justify-around mt-8 text-2xl text-gray-800">
        <div className="text-center">
          <FaImage className="text-blue-600 mb-2" />
          <p className="text-sm">Thumbnail</p>
        </div>
        <div className="text-center">
          <FaVideo className="text-blue-600 mb-2" />
          <p className="text-sm">Title</p>
        </div>
        <div className="text-center">
          <FaUserAlt className="text-blue-600 mb-2" />
          <p className="text-sm">Channel</p>
        </div>
        <div className="text-center">
          <FaCalendar className="text-blue-600 mb-2" />
          <p className="text-sm">Date Posted</p>
        </div>
        <div className="text-center">
          <FaLink className="text-blue-600 mb-2" />
          <p className="text-sm">Video URL</p>
        </div>
      </div>

      {/* Video Data Table */}
      {videos.length > 0 && (
        <div className="mt-6 overflow-x-auto w-full max-w-4xl">
          <table className="table-auto w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="px-4 py-3 border-b border-gray-300">Thumbnail</th>
                <th className="px-4 py-3 border-b border-gray-300">Title</th>
                <th className="px-4 py-3 border-b border-gray-300">Channel Title</th>
                <th className="px-4 py-3 border-b border-gray-300">Published At</th>
                <th className="px-4 py-3 border-b border-gray-300">Video URL</th>
              </tr>
            </thead>
            <tbody>
              {videos.map((video, index) => (
                <tr key={index} className="hover:bg-gray-100 transition-colors duration-200">
                  <td className="px-4 py-2 border-b border-gray-200">
                    <img
                      src={video.thumbnail.replace('%{width}', '120').replace('%{height}', '90')}
                      alt="Thumbnail"
                      className="w-20 h-auto rounded-md"
                    />
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200">{video.title || 'N/A'}</td>
                  <td className="px-4 py-2 border-b border-gray-200">{video.channel_name || 'N/A'}</td>
                  <td className="px-4 py-2 border-b border-gray-200">{new Date(video.published_at).toLocaleDateString()}</td>
                  <td className="px-4 py-2 border-b border-gray-200">
                    <a
                      href={video.channel_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Watch
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TwitchVideos;
