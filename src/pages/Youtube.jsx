import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import API_URL from './config'; // Adjust the path if necessary
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faVideo, faUser, faCalendar, faAlignLeft, faLink } from '@fortawesome/free-solid-svg-icons';

const YoutubeScraper = () => {
  const navigate = useNavigate();
  const [hashtag, setHashtag] = useState('');
  const [maxResults, setMaxResults] = useState(5); // Default to 5 results
  const [output, setOutput] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');  // Assuming you're storing token in localStorage

  // Function to handle scraping
  const handleScrape = async () => {
    setLoading(true);
    setOutput([]);
    setError(null);
  
    try {
      const response = await axios.post(
        `${API_URL}/scrape_youtube`,
        {
          hashtag,
          max_results: maxResults,
        },
        {
          headers: { 'x-access-token': token }, // Send token in request headers
        }
      );
  
      if (response.data.response) {
        setOutput(response.data.response);
      } else {
        setOutput([]);
        setError('No valid data found.');
      }
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
        setError("An error occurred while scraping YouTube.");
      }
    } finally {
      setLoading(false);
    }
  };
  // Function to format output as a table
  const formatOutput = (data) => {
    if (!Array.isArray(data) || data.length === 0) {
      return <p>No videos found for the given query.</p>;
    }

    return (
      <div className="mt-6 overflow-x-auto">
        <table className="table-auto w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="px-4 py-3 border-b border-gray-300">Thumbnail</th>
              <th className="px-4 py-3 border-b border-gray-300">Title</th>
              <th className="px-4 py-3 border-b border-gray-300">Channel Title</th>
              <th className="px-4 py-3 border-b border-gray-300">Published At</th>
              <th className="px-4 py-3 border-b border-gray-300">Description</th>
              <th className="px-4 py-3 border-b border-gray-300">Video URL</th>
            </tr>
          </thead>
          <tbody>
            {data.map((video, index) => (
              <tr key={index} className="hover:bg-gray-100 transition-colors duration-200">
                <td className="px-4 py-2 border-b border-gray-200">
                  <img
                    src={video.Thumbnail || 'https://via.placeholder.com/150'}
                    alt="Thumbnail"
                    className="w-20 h-auto rounded-md"
                  />
                </td>
                <td className="px-4 py-2 border-b border-gray-200">{video.Title || 'N/A'}</td>
                <td className="px-4 py-2 border-b border-gray-200">{video['Channel Title'] || 'N/A'}</td>
                <td className="px-4 py-2 border-b border-gray-200">{new Date(video['Published At']).toLocaleDateString()}</td>
                <td className="px-4 py-2 border-b border-gray-200">{video.Description || 'No description'}</td>
                <td className="px-4 py-2 border-b border-gray-200">
                  <a
                    href={video.URL}
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
    );
  };

  // Function to generate CSV from scraped data
  const downloadCSV = () => {
    if (!output.length) return;

    const headers = ['Title', 'Description', 'URL', 'Channel Title', 'Published At', 'Thumbnail'];

    // Map video data to CSV rows
    const csvRows = [
      headers.join(','), // Add the headers
      ...output.map(video =>
        [
          `"${video.Title}"`,
          `"${video.Description}"`,
          `"${video.URL}"`,
          `"${video['Channel Title']}"`,
          `"${new Date(video['Published At']).toLocaleDateString()}"`,
          `"${video.Thumbnail}"`
        ].join(',')
      ),
    ];

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    // Create a download link
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'youtube_videos.csv');
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-light flex flex-col items-center justify-center">
      <h2 className="text-4xl text-center text-blue-950 font-bold mb-8">YouTube Scraper</h2>

      <div className="w-full max-w-lg space-y-4">
        <input
          type="text"
          value={hashtag}
          onChange={(e) => setHashtag(e.target.value)}
          placeholder="Enter hashtag"
          className="w-full p-4 text-lg border-2 border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
          type="number"
          value={maxResults}
          onChange={(e) => setMaxResults(e.target.value)}
          placeholder="Number of videos to scrape"
          className="w-full p-4 text-lg border-2 border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          required
        />
        <button
          onClick={handleScrape}
          className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-300"
          disabled={loading}
        >
          {loading ? 'Scraping...' : 'Scrape YouTube'}
        </button>
      </div>

      {/* YouTube Data Icons */}
      <div className="flex space-x-6 mt-6 mb-6">
        <div className="flex flex-col items-center">
          <FontAwesomeIcon icon={faImage} className="text-3xl text-blue-600" />
          <span className="mt-2 text-gray-700 text-sm">Thumbnail</span>
        </div>
        <div className="flex flex-col items-center">
          <FontAwesomeIcon icon={faVideo} className="text-3xl text-blue-600" />
          <span className="mt-2 text-gray-700 text-sm">Video Title</span>
        </div>
        <div className="flex flex-col items-center">
          <FontAwesomeIcon icon={faUser} className="text-3xl text-blue-600" />
          <span className="mt-2 text-gray-700 text-sm">Channel Name</span>
        </div>
        <div className="flex flex-col items-center">
          <FontAwesomeIcon icon={faCalendar} className="text-3xl text-blue-600" />
          <span className="mt-2 text-gray-700 text-sm">Date Posted</span>
        </div>
        <div className="flex flex-col items-center">
          <FontAwesomeIcon icon={faAlignLeft} className="text-3xl text-blue-600" />
          <span className="mt-2 text-gray-700 text-sm">Description</span>
        </div>
        <div className="flex flex-col items-center">
          <FontAwesomeIcon icon={faLink} className="text-3xl text-blue-600" />
          <span className="mt-2 text-gray-700 text-sm">Video URL</span>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center mt-10">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent border-solid rounded-full animate-spin"></div>
        </div>
      )}

      {error && <p className="text-red-600 text-lg">{error}</p>}
      {output.length > 0 && (
        <>
          {formatOutput(output)}
          <button
            onClick={downloadCSV}
            className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:shadow-lg"
          >
            Download CSV
          </button>
        </>
      )}
    </div>
  );
};

export default YoutubeScraper;
