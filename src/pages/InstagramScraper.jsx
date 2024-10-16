import React, { useState } from 'react';
import axios from 'axios';
import API_URL from './config'

const InstagramScraper = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hashtag, setHashtag] = useState('');
  const [postCount, setPostCount] = useState(20); // Default to 20 posts
  const [output, setOutput] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');

  const handleScrape = async () => {
    setLoading(true);
    setOutput([]);
    setError(null);

    try {
      const response = await axios.post(
        `${API_URL}/scrape_instagram`,
        {
          email,
          password,
          hashtag,
          post_count: postCount, // Send the number of posts to scrape
        },
        {
          headers: { 'x-access-token': token },
        }
      );

      if (response.data) {
        setOutput(response.data);
      } else {
        setOutput([]);
        setError('No valid profile data found.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while scraping Instagram.');
    } finally {
      setLoading(false);
    }
  };

  const formatOutput = (data) => {
    if (!Array.isArray(data) || data.length === 0) {
      return <p>No posts found for the given hashtag.</p>;
    }

    return (
      <div className="space-y-4">
        {data.map((post, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
            <p>
              <strong>Username:</strong> {post.Username || 'N/A'}
            </p>
            <p>
              <strong>Caption:</strong> {post.Caption || 'No caption'}
            </p>
            <p>
              <strong>Image:</strong>{' '}
              <a
                href={post['Image URL']}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Image
              </a>
            </p>
            <p>
              <strong>Post URL:</strong>{' '}
              <a
                href={post['Post URL']}
                target="_blank"
                rel="noopener noreferrer"
              >
                {post['Post URL']}
              </a>
            </p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-light flex flex-col items-center justify-center">
      <h2 className="text-4xl text-center text-blue-950 font-bold mb-8">
        Instagram Scraper
      </h2>

      <div className="w-full max-w-lg space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your Instagram email"
          className="w-full p-4 text-lg border-2 border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your Instagram password"
          className="w-full p-4 text-lg border-2 border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
          type="text"
          value={hashtag}
          onChange={(e) => setHashtag(e.target.value)}
          placeholder="Enter the hashtag (without #)"
          className="w-full p-4 text-lg border-2 border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
          type="number"
          value={postCount}
          onChange={(e) => setPostCount(e.target.value)}
          placeholder="Number of posts to scrape"
          className="w-full p-4 text-lg border-2 border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          required
        />
        <button
          onClick={handleScrape}
          className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-300"
          disabled={loading}
        >
          {loading ? 'Scraping...' : 'Scrape Instagram'}
        </button>
      </div>

      {loading && (
        <div className="flex justify-center items-center mt-10">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent border-solid rounded-full animate-spin"></div>
        </div>
      )}

      {error && (
        <div className="w-full max-w-lg mt-10 p-4 bg-red-100 text-red-700 border-2 border-red-400 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Error:</h3>
          <p>{error}</p>
        </div>
      )}

      <div className="w-full max-w-lg mt-10 p-4 bg-white border-2 border-gray-200 rounded-lg shadow-inner">
        <h3 className="text-xl font-semibold mb-2">Output:</h3>
        <div className="text-gray-700">
          {loading
            ? 'Loading...'
            : error
            ? null
            : formatOutput(output)}
        </div>
      </div>
    </div>
  );
};

export default InstagramScraper;
