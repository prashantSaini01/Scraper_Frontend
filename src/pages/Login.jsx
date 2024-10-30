/* eslint-disable no-unused-vars */
// import React, { useState } from 'react';
// import axios from 'axios';
// import API_URL from './config';
// import { useNavigate } from 'react-router-dom';
// import { GoogleLogin } from 'react-google-login';

// const Login = () => {
//     const [formData, setFormData] = useState({ username: '', password: '' });
//     const [errorMessage, setErrorMessage] = useState('');
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!formData.username || !formData.password) {
//             setErrorMessage('Please fill in both fields.');
//             return;
//         }

//         try {
//             const response = await axios.post(`${API_URL}/login`, formData); // Adjust the backend URL
//             localStorage.setItem('token', response.data.token); // Save the token
//             navigate('/home'); // Redirect after login
//         } catch (error) {
//             console.error('Login failed', error);
//             setErrorMessage('Invalid credentials. Please try again.');
//         }
//     };

//     // Handle Google Sign-In Success
//     const handleGoogleLoginSuccess = async (response) => {
//         try {
//             console.log("Google Login Response:", response);
//             const res = await axios.post(`${API_URL}/google-login`, {
//                 token: response.tokenId,
//             });
//             localStorage.setItem('token', res.data.token); // Save the token
//             navigate('/home'); // Redirect after successful login
//         } catch (error) {
//             console.error('Google Login failed', error);
//             setErrorMessage('Google Login failed. Please try again.');
//         }
//     };

//     // Handle Google Sign-In Failure
//     const handleGoogleLoginFailure = (error) => {
//         console.error('Google Login failed', error);
//         setErrorMessage('Google Login failed. Please try again.');
//     };

//     return (
//         <div className="flex justify-center items-center min-h-screen bg-gray-100">
//             <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
//                 <h1 className='text-center text-2xl font-bold'>Welcome User!</h1>
//                 <br></br>

//                 <p className="text-center">Please enter your credentials</p>
//                 <br></br>

//                 {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

//                 <form onSubmit={handleSubmit} className="mb-4">
//                     <input
//                         type="text"
//                         name="username"
//                         value={formData.username}
//                         onChange={handleChange}
//                         placeholder="Username"
//                         className="mb-4 p-2 w-full border rounded"
//                         required
//                     />
//                     <input
//                         type="password"
//                         name="password"
//                         value={formData.password}
//                         onChange={handleChange}
//                         placeholder="Password"
//                         className="mb-4 p-2 w-full border rounded"
//                         required
//                     />
//                     <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded w-full">Login</button>
//                 </form>

//                 <div className='mt-4'>
//                     <GoogleLogin
//                         clientId="329487351256-66tqvijbejsvl8hcpnlfnnjmdfumkcgl.apps.googleusercontent.com"
//                         buttonText="Login with Google"
//                         onSuccess={handleGoogleLoginSuccess}
//                         onFailure={handleGoogleLoginFailure}
//                         cookiePolicy={'single_host_origin'}
//                         onError={(error) => {
//                             console.error('Google Login Error', error);
//                             setErrorMessage('Google Login error. Please check your configuration.');
//                         }}
//                     />
//                 </div>

//                 <div className='mt-4'>
//                     <p className='text-center text-secondary'>Dont have an account? <a href="/signup" className='text-blue-500 hover:underline'>Sign up for free</a></p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;

// // Appwrite login page
// /* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Client, Account } from "appwrite";
import API_URL from "./config";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1") // Your Appwrite Server URL
  .setProject("670cc30e0000d61b0682"); // Your Project ID

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const account = new Account(client);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      setErrorMessage("Please fill in both fields.");
      return;
    }

    console.log("Form Data:", formData);

    try {
      const response = await axios.post(`${API_URL}/login`, formData);
      console.log("Login Response:", response.data); 
      localStorage.setItem("token", response.data.token);
      navigate("/home");
    } catch (error) {
      console.error(
        "Login failed",
        error.response ? error.response.data : error.message
      );
      //   console.error("Login failed", error);
      setErrorMessage("Invalid credentials. Please try again.");
    }
  };

  // Add Google OAuth login handler
  const handleGoogleLogin = () => {
    account.createOAuth2Session(
      "google",
      "http://localhost:3000/home",
      "http://localhost:3000/login"
    );
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-center text-3xl font-bold text-gray-800 mb-6">
          Welcome Back!
        </h1>
        <p className="text-center text-gray-500 mb-4">
          Please enter your credentials to continue
        </p>

        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}

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
