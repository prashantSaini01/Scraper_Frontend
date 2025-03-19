import { useState } from "react";
import axios from "axios";

function ContentGenerator() {
  const [messages, setMessages] = useState([]);
  const [finalContent, setFinalContent] = useState("");
  const [error, setError] = useState(null);
  const [topic, setTopic] = useState("");
  const [stopAfter, setStopAfter] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const token = localStorage.getItem("token"); // Match YoutubeScraper token retrieval
  const API_URL = "http://localhost:5000/generate_content";

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!topic.trim()) {
      setError("Please enter a topic");
      return;
    }

    setMessages([]);
    setFinalContent("");
    setError(null);
    setIsGenerating(true);

    try {
      const response = await axios.post(
        API_URL,
        {
          topic: topic.trim(),
          stop_after: stopAfter.trim() || undefined,
        },
        {
          headers: {
            "x-access-token": token, // Match YoutubeScraper header
          },
        }
      );

      if (response.data.results) {
        setMessages(response.data.results);
        setFinalContent(response.data.final_content || "");
      } else {
        setError("No valid data returned.");
      }
    } catch (err) {
      console.error("Error:", err);
      setError(
        err.response?.data?.message ||
          "An error occurred while generating content."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          AI Content Generator
        </h1>

        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <label
              htmlFor="topic"
              className="block text-sm font-medium text-gray-700"
            >
              Topic
            </label>
            <input
              id="topic"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Justice For Survivors"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={isGenerating}
            />
          </div>
          <div>
            <label
              htmlFor="stopAfter"
              className="block text-sm font-medium text-gray-700"
            >
              Stop After (Optional)
            </label>
            <input
              id="stopAfter"
              type="text"
              value={stopAfter}
              onChange={(e) => setStopAfter(e.target.value)}
              placeholder="e.g., generate"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={isGenerating}
            />
            <p className="mt-1 text-xs text-gray-500">
              Enter a node name (e.g., “generate”) to stop the process early.
            </p>
          </div>
          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-md text-white font-semibold ${
              isGenerating
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={isGenerating}
          >
            {isGenerating ? "Generating..." : "Generate Content"}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {messages.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Progress
            </h2>
            <div className="space-y-3 max-h-64 overflow-y-auto border border-gray-200 rounded-md p-3 bg-gray-50">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className="p-2 bg-white rounded-md shadow-sm border border-gray-100"
                >
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Step:</span>{" "}
                    {msg.node_transition}
                  </p>
                  <p className="text-sm text-gray-600 mt-1 break-words">
                    {msg.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Thread: {msg.thread_id} | Revision: {msg.revision} | Count:{" "}
                    {msg.count}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {finalContent && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Final Content
            </h2>
            <div className="p-4 bg-white border border-gray-200 rounded-md shadow-sm">
              <p className="text-gray-700 whitespace-pre-wrap">
                {finalContent}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContentGenerator;
