import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Client, Account } from "appwrite";
import { toast } from "react-toastify";
import API_URL from './config';
import 'react-toastify/dist/ReactToastify.css';
 
const client = new Client();
client.setEndpoint("https://cloud.appwrite.io/v1").setProject("6718e0ec0026a7ad41cb");
 
const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const account = new Account(client);
 
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
 
  // Google OAuth login handler
  const handleGoogleLogin = async () => {
    try {
      const response = await account.createOAuth2Session(
        "google",
        "https://master.d1lnzmm8oled13.amplifyapp.com/home", // Success URL
        "https://master.d1lnzmm8oled13.amplifyapp.com/login" // Failure URL
      );
      localStorage.setItem("token", response); // Save the token
      navigate("/home"); // Redirect to home on success
    } catch (error) {
      console.error("Google login failed", error);
      toast.error("Google login failed. Please try again.");
    }
  };
 
  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-200">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
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
 
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-400">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>
 
        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition duration-300"
          aria-label="Login with Google"
        >
          Login with Google
        </button>
 
        <div className="mt-6">
          <p className="text-center text-gray-600">
            Don’t have an account?{" "}
            <a href="/signup" className="text-blue-600 hover:underline font-medium">
              Sign up for free
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
 
export default Login;
