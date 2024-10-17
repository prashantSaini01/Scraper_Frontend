import React, { useState } from 'react';
import axios from 'axios';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import API_URL from './config';

const LinkedInScraper = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [query, setQuery] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');

  const handleScrape = async () => {
    setLoading(true);
    setOutput('');
    setError(null);

    try {
      const response = await axios.post(`${API_URL}/scrape_linkedin`, {
        email,
        password,
        query,
      }, {
        headers: { 'x-access-token': token },
      });

      if (response.data) {
        setOutput(formatOutput(response.data));
      } else {
        setOutput('No valid profile data found.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while scraping LinkedIn.');
    } finally {
      setLoading(false);
    }
  };

  const formatOutput = (parsedData) => {
    if (!parsedData || typeof parsedData !== 'object') return 'No valid profile data.';

    const outputElements = [];

    for (const [key, value] of Object.entries(parsedData)) {
      if (typeof value === 'string') {
        outputElements.push(
          <div key={key} className="text-left mb-4">
            <p className="font-semibold">{key.replace(/^- /, '')}:</p>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(marked(value)),
              }}
            />
          </div>
        );
      } else if (Array.isArray(value)) {
        outputElements.push(
          <div key={key} className="text-left mb-4">
            <p className="font-semibold">{key.replace(/^- /, '')}:</p>
            <ul className="list-disc ml-5">
              {value.map((item, index) => (
                <li key={index}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(marked(item)),
                    }}
                  />
                </li>
              ))}
            </ul>
          </div>
        );
      } else if (typeof value === 'object' && value !== null) {
        outputElements.push(
          <div key={key} className="text-left mb-4">
            <p className="font-semibold">{key.replace(/^- /, '')}:</p>
            <div className="ml-5">
              {formatOutput(value)}
            </div>
          </div>
        );
      }
    }

    return <>{outputElements}</>;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-10">
      <h2 className="text-4xl text-center text-blue-800 font-bold mb-6">LinkedIn Scraper</h2>

      <div className="w-full max-w-lg space-y-4 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter LinkedIn email..."
          className="w-full p-4 text-lg border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
          required
          aria-label="LinkedIn email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter LinkedIn password..."
          className="w-full p-4 text-lg border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
          required
          aria-label="LinkedIn password"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter LinkedIn search query..."
          className="w-full p-4 text-lg border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
          required
          aria-label="LinkedIn search query"
        />
      </div>

      <button
        onClick={handleScrape}
        className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-300 focus:outline-none"
        aria-label="Scrape LinkedIn"
      >
        {loading ? 'Scraping...' : 'Scrape LinkedIn'}
      </button>

      {loading && (
        <div className="flex justify-center items-center mt-10">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin" role="status" aria-label="Loading spinner"></div>
        </div>
      )}

      {error && <div className="mt-10 text-red-500">{error}</div>}

      <div className="w-full max-w-lg mt-10 p-4 bg-white border-2 border-gray-200 rounded-lg shadow-inner">
        <h3 className="text-xl font-semibold mb-2">Output:</h3>
        <div className="text-gray-700">
          {output || 'No data available. Please enter a query and scrape.'}
        </div>
      </div>
    </div>
  );
};

export default LinkedInScraper;
