import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_URL from "../components/config";
const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      toast.warn("Please fill in both fields.");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/login`, formData);
      localStorage.setItem("token", response.data.token);
      toast.success("Login successful!");

      // Delay the navigation to give time for the toast to display
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (error) {
      console.error("Login failed", error);
      toast.error("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-100 ">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-lg">
        <h1 className="text-center text-3xl font-bold text-gray-800 mb-6">
          Welcome Back!
        </h1>
        <p className="text-center text-gray-500 mb-4">
          Please enter your credentials to continue
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
              required
              aria-label="Username"
            />
          </div>
          <div className="relative">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
              required
              aria-label="Password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
            aria-label="Login"
          >
            Login
          </button>
        </form>

        <div className="mt-6">
          <p className="text-center text-gray-600">
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="text-blue-600 hover:underline font-medium"
            >
              Sign up for free
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
