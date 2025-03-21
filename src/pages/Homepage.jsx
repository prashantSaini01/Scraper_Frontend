import React from "react";
import { Link } from "react-router-dom";
import { FaRobot, FaStar, FaBalanceScale } from "react-icons/fa"; // Added FaBalanceScale for Legal Bot

const Homepage = () => {
  const welcomeText = "Welcome to Inzint AI Lab".split(" ");

  return (
    <div className="text-center p-20 bg-gradient-to-b from-blue-50 to-gray-100">
      {/* Hero Section */}
      <div className="mb-16">
        <h2 className="text-5xl font-bold text-gray-900 mb-6">
          {welcomeText.map((word, index) => (
            <span
              key={index}
              className={`inline-block mr-2 animate-wordFade ${
                word === "Inzint" ? "text-red-600" : "text-gray-900"
              }`}
              style={{ animationDelay: `${index * 0.5}s` }}
            >
              {word}
            </span>
          ))}
        </h2>
      </div>

      {/* Main Cards Section */}
      <div className="flex justify-center flex-wrap gap-12 mb-16">
        {/* Abrassio Card */}
        <div className="flex flex-col items-center bg-gradient-to-br from-blue-100 to-blue-200 p-8 rounded-xl shadow-xl w-80 transition-transform duration-300 hover:shadow-2xl">
          <FaRobot className="text-5xl text-blue-600 mb-6" />
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Abrassio</h3>
          <div className="text-gray-700 mb-6">
            <p className="text-base mb-2">
              A powerful scraping assistant for web data extraction.
            </p>
            <p className="text-base">
              Collects insights from various online platforms efficiently.
            </p>
          </div>
          <Link
            to="/abrassio"
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-16 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300"
          >
            Use
          </Link>
        </div>

        {/* Social Spark Card */}
        <div className="flex flex-col items-center bg-gradient-to-br from-purple-100 to-purple-200 p-8 rounded-xl shadow-xl w-80 transition-transform duration-300 hover:shadow-2xl">
          <FaStar className="text-5xl text-purple-600 mb-6" />
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Social Spark
          </h3>
          <div className="text-gray-700 mb-6">
            <p className="text-base mb-2">
              Generates engaging social media post content.
            </p>
            <p className="text-base">
              Boosts online presence with creative automation.
            </p>
          </div>
          <Link
            to="/socialspark"
            className="bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 px-16 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300"
          >
            Use
          </Link>
        </div>

        {/* Legal Bot Card */}
        <div className="flex flex-col items-center bg-gradient-to-br from-green-100 to-green-200 p-8 rounded-xl shadow-xl w-80 transition-transform duration-300 hover:shadow-2xl">
          <FaBalanceScale className="text-5xl text-green-600 mb-6" />
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Legal Bot
          </h3>
          <div className="text-gray-700 mb-6">
            <p className="text-base mb-2">
              Assists with legal document analysis and insights.
            </p>
            <p className="text-base">
              Streamlines compliance and research tasks effortlessly.
            </p>
          </div>
          <Link
            to="/lawbot"
            className="bg-gradient-to-r from-green-500 to-teal-600 text-white py-3 px-16 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300"
          >
            Use
          </Link>
        </div>
      </div>

      {/* Achievement Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Achievement Card 1 */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl shadow-lg text-center hover:bg-blue-200 transition duration-300">
          <h3 className="text-2xl font-semibold text-blue-700 mb-4">
            Innovate Faster
          </h3>
          <p className="text-gray-700">
            Leverage AI tools to accelerate your development process.
          </p>
        </div>

        {/* Achievement Card 2 */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl shadow-lg text-center hover:bg-green-200 transition duration-300">
          <h3 className="text-2xl font-semibold text-green-700 mb-4">
            Boost Efficiency
          </h3>
          <p className="text-gray-700">
            Automate tasks to save time and focus on what matters.
          </p>
        </div>

        {/* Achievement Card 3 */}
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-8 rounded-xl shadow-lg text-center hover:bg-yellow-200 transition duration-300">
          <h3 className="text-2xl font-semibold text-yellow-700 mb-4">
            Drive Engagement
          </h3>
          <p className="text-gray-700">
            Create impactful content to connect with your audience.
          </p>
        </div>
      </div>

    
    </div>
  );
};

export default Homepage;