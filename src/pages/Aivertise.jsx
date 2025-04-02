import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_URL from "../components/config"; // Adjust path to your API_URL config

const AIvertise = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Assuming token-based auth

  // State for form inputs
  const [image, setImage] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [duration, setDuration] = useState("5");
  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null); // Store the full video URL
  const [error, setError] = useState(null);

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!image) {
      toast.error("Please upload an image.");
      return;
    }
    if (!prompt) {
      toast.error("Please enter a prompt.");
      return;
    }
    if (!apiKey) {
      toast.error("Please enter your Segmind API key.");
      return;
    }

    setLoading(true);
    setError(null);
    setVideoUrl(null);

    // Prepare form data
    const formData = new FormData();
    formData.append("image", image);
    formData.append("prompt", prompt);
    formData.append("negative_prompt", negativePrompt);
    formData.append("duration", duration);
    formData.append("api_key", apiKey);

    try {
      const response = await axios.post(`${API_URL}/generate_video`, formData, {
        headers: {
          "x-access-token": token,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.video_url) {
        // Construct the full video URL by prepending the base API_URL
        // Replace backslashes with forward slashes for web compatibility
        const relativeVideoPath = response.data.video_url.replace(/\\/g, "/");
        const fullVideoUrl = `${relativeVideoPath}`;
        setVideoUrl(fullVideoUrl);
        toast.success("Video generated successfully!");
      } else {
        throw new Error("No video URL returned from the server.");
      }
    } catch (err) {
      console.error("Error generating video:", err);
      const errorMessage =
        err.response?.data?.message ||
        "Failed to generate video. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Handle video download
  const handleDownload = () => {
    if (!videoUrl) return;

    // Create a temporary anchor element to trigger the download
    const link = document.createElement("a");
    link.href = videoUrl;
    link.download = "aivertise-generated-video.mp4"; // Set the default file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Navigate back to home
  const goToHome = () => navigate("/");

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex flex-col py-12 px-6 relative">
      {/* Back to Home Button */}
      <button
        onClick={goToHome}
        className="absolute top-6 right-6 px-6 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 group"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 transform group-hover:rotate-12 transition-transform duration-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
        <span className="font-medium">Back to Home</span>
      </button>

      {/* Main Content */}
      <div className="w-full max-w-3xl mx-auto space-y-10">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-700 to-purple-700 animate-pulse">
            AIvertise - Image to Video Generator
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Transform your images into stunning videos with AI-driven creativity
          </p>
        </div>

        {/* Form Section */}
        <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div>
              <label className="block text-lg font-semibold text-pink-800 mb-2">
                Upload Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-4 bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300"
              />
            </div>

            {/* Prompt */}
            <div>
              <label className="block text-lg font-semibold text-purple-800 mb-2">
                Prompt
              </label>
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the video you want to generate..."
                className="w-full p-4 bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300"
              />
            </div>

            {/* Negative Prompt */}
            <div>
              <label className="block text-lg font-semibold text-pink-800 mb-2">
                Negative Prompt (Optional)
              </label>
              <input
                type="text"
                value={negativePrompt}
                onChange={(e) => setNegativePrompt(e.target.value)}
                placeholder="Elements to avoid in the video..."
                className="w-full p-4 bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300"
              />
            </div>

            {/* Duration */}
            <div>
              <label className="block text-lg font-semibold text-purple-800 mb-2">
                Video Duration
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full p-4 bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <option value="5">5 seconds</option>
                <option value="10">10 seconds</option>
              </select>
            </div>

            {/* Segmind API Key */}
            <div>
              <label className="block text-lg font-semibold text-pink-800 mb-2">
                Segmind API Key
              </label>
              <input
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your Segmind API key..."
                className="w-full p-4 bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700"
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Generating...</span>
                </div>
              ) : (
                "Generate Video"
              )}
            </button>
          </form>
        </div>

        {/* Result Section */}
        <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-purple-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            Generated Video
          </h3>
          {loading && (
            <div className="flex justify-center items-center h-64">
              <div className="w-16 h-16 border-4 border-t-transparent border-purple-500 rounded-full animate-spin"></div>
            </div>
          )}
          {videoUrl && !loading && (
            <div className="flex flex-col items-center space-y-4">
              <video
                controls
                src={videoUrl}
                className="w-full max-w-md rounded-lg shadow-md"
              >
                Your browser does not support the video tag.
              </video>
              <button
                onClick={handleDownload}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download Video
              </button>
            </div>
          )}
          {error && !loading && (
            <div className="text-center text-red-600 bg-red-50 p-4 rounded-lg">
              <p>{error}</p>
            </div>
          )}
          {!videoUrl && !error && !loading && (
            <p className="text-gray-500 italic text-center">
              Submit the form to generate a video.
            </p>
          )}
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AIvertise;
