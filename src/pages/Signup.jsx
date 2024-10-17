/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const signUpWithEmail = async (e) => {
        e.preventDefault();
        const { email, password, fullname, username } = formData;

        try {
            const response = await axios.post(`${API_URL}/register`, {
                email,
                password,
                fullname,
                username,
            });

            if (response.status === 200) {
                console.log('User signed up:', response.data);
                navigate('/login');
            } else {
                console.error('Error signing up:', response.data.message);
            }
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
            <div className="bg-white shadow-lg rounded-lg w-full max-w-lg p-8">
                <h1 className="text-3xl font-semibold text-center text-gray-800 mb-4">Create Your Account</h1>
                <p className="text-center text-gray-600 mb-6">Join us and explore our services!</p>

                <form onSubmit={signUpWithEmail}>
                    <input
                        type='text'
                        name='fullname'
                        value={formData.fullname}
                        onChange={handleChange}
                        placeholder='Full Name'
                        required
                        className="mb-4 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type='text'
                        name='username'
                        value={formData.username}
                        onChange={handleChange}
                        placeholder='Username'
                        required
                        className="mb-4 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        placeholder='Email Address'
                        required
                        className="mb-4 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type='password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                        placeholder='Password'
                        required
                        className="mb-4 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    
                    <button
                        type='submit'
                        className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="mt-4 text-center text-gray-600">
                    Already have an account? <a href='/login' className='text-blue-500 font-semibold'>Login here</a>
                </p>
            </div>
        </div>
    );
};

export default Signup;
