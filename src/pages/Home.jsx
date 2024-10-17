import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-100 to-gray-300 p-8">
      <h2 className="text-4xl md:text-6xl font-extrabold text-gray-800 mb-8 text-center">
        Welcome to <span className="text-blue-600">Scraping Assistant</span>
      </h2>
      <p className="text-lg md:text-2xl text-gray-700 mb-12 text-center max-w-2xl">
        Choose a platform to start scraping. Seamlessly gather data from your favorite social networks.
      </p>
      <div className="flex justify-center flex-wrap gap-8">
        <Link
          to="/instagram"
          className="bg-gradient-to-r from-pink-500 to-red-500 text-white py-3 px-8 rounded-full shadow-md transform hover:scale-105 hover:shadow-xl transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          aria-label="Go to Instagram Scraper"
        >
          Instagram Scraper
        </Link>
        <Link
          to="/twitter"
          className="bg-gradient-to-r from-blue-400 to-blue-600 text-white py-3 px-8 rounded-full shadow-md transform hover:scale-105 hover:shadow-xl transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
          aria-label="Go to Twitter Scraper"
        >
          Twitter Scraper
        </Link>
        <Link
          to="/linkedin"
          className="bg-gradient-to-r from-blue-800 to-purple-900 text-white py-3 px-8 rounded-full shadow-md transform hover:scale-105 hover:shadow-xl transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800"
          aria-label="Go to LinkedIn Scraper"
        >
          LinkedIn Scraper
        </Link>
      </div>
    </div>
  );
};

export default Home;
