// import React from 'react';
// import { Link } from 'react-router-dom';

// const Home = () => {
//   return (
//     <div className="text-center p-20 bg-light">
//       <h2 className="text-5xl font-bold text-dark mb-12">Welcome to Scraping Assistant</h2>
//       <p className="mb-12 text-xl text-gray-700">Choose a platform to start scraping:</p>
//       <div className="flex justify-center flex-wrap gap-6">
//         <Link to="/instagram" className="bg-gradient-to-r from-pink-500 to-red-500 text-white py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300">
//           Instagram Scraper
//         </Link>
//         <Link to="/twitter" className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300">
//           Twitter Scraper
//         </Link>
//         <Link to="/linkedin" className="bg-gradient-to-r from-blue-800 to-purple-800 text-white py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300">
//           LinkedIn Scraper
//         </Link>
//         <Link to="/youtube" className="bg-gradient-to-r from-red-800 to-red-400 text-white py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300">
//           Youtube Scraper
//         </Link>
//         <Link
//   to="/twitch"
//   className="bg-gradient-to-r from-pink-500 to-indigo-600 text-white py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300"
// >
//   Twitch Scraper
// </Link>
//       </div>
//     </div>
//   );
// };

// export default Home;

import React from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaTwitch,
  FaTiktok,
} from "react-icons/fa";

const Home = () => {
  return (
    <div className="text-center p-20 bg-gradient-to-b from-blue-50 to-gray-100">
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
        {/* Instagram Scraper */}
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg w-60 hover:scale-105 transition-transform duration-300 hover:bg-blue-50">
          <FaInstagram className="text-4xl text-pink-500 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Instagram Scraper
          </h3>
          <p className="text-gray-600 mb-4">
            Extract user profiles, posts, comments, and likes from Instagram.
          </p>
          <Link
            to="/instagram"
            className="bg-gradient-to-r from-pink-500 to-red-500 text-white py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300"
          >
            Start Scraping
          </Link>
        </div>

        {/* Twitter Scraper */}
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg w-60 hover:scale-105 transition-transform duration-300 hover:bg-blue-50">
          <FaTwitter className="text-4xl text-blue-500 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Twitter Scraper
          </h3>
          <p className="text-gray-600 mb-4">
            Collect tweets, hashtags, and user information from Twitter.
          </p>
          <Link
            to="/twitter"
            className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300"
          >
            Start Scraping
          </Link>
        </div>

        {/* LinkedIn Scraper */}
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg w-60 hover:scale-105 transition-transform duration-300 hover:bg-blue-50">
          <FaLinkedin className="text-4xl text-blue-700 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            LinkedIn Scraper
          </h3>
          <p className="text-gray-600 mb-4">
            Scrape profiles, connections, and job listings from LinkedIn.
          </p>
          <Link
            to="/linkedin"
            className="bg-gradient-to-r from-blue-800 to-purple-800 text-white py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300"
          >
            Start Scraping
          </Link>
        </div>

        {/* YouTube Scraper */}
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg w-60 hover:scale-105 transition-transform duration-300 hover:bg-blue-50">
          <FaYoutube className="text-4xl text-red-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            YouTube Scraper
          </h3>
          <p className="text-gray-600 mb-4">
            Gather video details, comments, and channel statistics from YouTube.
          </p>
          <Link
            to="/youtube"
            className="bg-gradient-to-r from-red-800 to-red-400 text-white py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300"
          >
            Start Scraping
          </Link>
        </div>

        {/* Twitch Scraper */}
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg w-60 hover:scale-105 transition-transform duration-300 hover:bg-blue-50">
          <FaTwitch className="text-4xl text-purple-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Twitch Scraper
          </h3>
          <p className="text-gray-600 mb-4">
            Retrieve streams, chat messages, and viewer data from Twitch.
          </p>
          <Link
            to="/twitch"
            className="bg-gradient-to-r from-pink-500 to-indigo-600 text-white py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300"
          >
            Start Scraping
          </Link>
        </div>

        {/* TikTok Scraper */}
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg w-60 hover:scale-105 transition-transform duration-300 hover:bg-blue-50">
          <FaTiktok className="text-4xl text-black mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            TikTok Scraper
          </h3>
          <p className="text-gray-600 mb-4">
            Extract TikTok user profiles, videos, likes, and comments.
          </p>
          <Link
            to="/tiktok"
            className="bg-gradient-to-r from-gray-900 to-gray-600 text-white py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300"
          >
            Start Scraping
          </Link>
        </div>
      </div>

      {/* Feature Cards Section */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Feature Card 1 */}
        <div className="bg-blue-50 p-8 rounded-lg shadow-lg text-center hover:bg-blue-100 transition duration-300">
          <h3 className="text-2xl font-semibold text-blue-600 mb-4">
            Gain Competitive Insights
          </h3>
          <p className="text-gray-700">
            Web scraping enables you to collect competitor data, analyze their
            strategies, and adjust your approach for market leadership.
          </p>
        </div>

        {/* Feature Card 2 */}
        <div className="bg-green-50 p-8 rounded-lg shadow-lg text-center hover:bg-green-100 transition duration-300">
          <h3 className="text-2xl font-semibold text-green-600 mb-4">
            Automate Data Collection
          </h3>
          <p className="text-gray-700">
            Eliminate manual data entry by automating the extraction of
            information from websites, improving efficiency and accuracy.
          </p>
        </div>

        {/* Feature Card 3 */}
        <div className="bg-yellow-50 p-8 rounded-lg shadow-lg text-center hover:bg-yellow-100 transition duration-300">
          <h3 className="text-2xl font-semibold text-yellow-600 mb-4">
            Unlock Market Trends
          </h3>
          <p className="text-gray-700">
            Discover market trends and audience behaviors by scraping data from
            multiple sources, helping you make informed decisions.
          </p>
        </div>

        {/* Feature Card 4 */}
        <div className="bg-purple-50 p-8 rounded-lg shadow-lg text-center hover:bg-purple-100 transition duration-300">
          <h3 className="text-2xl font-semibold text-purple-600 mb-4">
            Collect Social Media Insights
          </h3>
          <p className="text-gray-700">
            Leverage web scraping to gather social media data, track mentions,
            sentiment, and influencer activity for better engagement strategies.
          </p>
        </div>

        {/* Feature Card 5 */}
        <div className="bg-red-50 p-8 rounded-lg shadow-lg text-center hover:bg-red-100 transition duration-300">
          <h3 className="text-2xl font-semibold text-red-600 mb-4">
            Real-Time Data Monitoring
          </h3>
          <p className="text-gray-700">
            Scrape real-time data such as product prices, stock availability,
            and news updates to keep your business agile and responsive.
          </p>
        </div>

        {/* Feature Card 6 */}
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
    </div>
  );
};

export default Home;
