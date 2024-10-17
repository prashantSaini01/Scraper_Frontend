/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import API_URL from './config';

const TwitterScraper = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [hashtag, setHashtag] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [numposts, setnumposts] = useState('');
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem('token');

    const handleScrape = async () => {
        const trimmedUsername = username.trim();
        const trimmedPassword = password.trim();
        const trimmedMobileNumber = mobileNumber.trim();
        const trimmedHashtag = hashtag.trim();
        const trimmednumposts = parseInt(numposts.trim(), 10);

        if (!trimmedUsername || !trimmedPassword || !trimmedMobileNumber || !trimmedHashtag || isNaN(trimmednumposts)) {
            alert("Please fill in all fields (username, password, hashtag, mobile number, number of posts)");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(`${API_URL}/scrape_twitter`, {
                username: trimmedUsername,
                password: trimmedPassword,
                mobile_number: trimmedMobileNumber,
                hashtag: trimmedHashtag,
                desired_posts: trimmednumposts
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token,
                },
            });
            setPosts(response.data);
        } catch (error) {
            if (error.response) {
                console.error("Error scraping data", error.response.data);
                alert(`Error: ${error.response.data.error || 'Scraping failed!'}`);
            } else {
                console.error("Error scraping data", error.message);
                alert("Network Error: Could not connect to the server. Please check if your backend is running.");
            }
        } finally {
            setLoading(false);
        }
    };

    const convertToCSV = (objArray) => {
        const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
        let str = `${Object.keys(array[0]).join(',')}\r\n`;

        for (let i = 0; i < array.length; i++) {
            let line = '';
            for (let key in array[i]) {
                if (line !== '') line += ',';
                line += array[i][key];
            }
            str += `${line}\r\n`;
        }

        return str;
    };

    const downloadCSV = () => {
        const csv = convertToCSV(posts);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.setAttribute('href', url);
        link.setAttribute('download', 'scraped_posts.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-100 flex flex-col items-center justify-center py-8">
            <h2 className="text-4xl text-center text-blue-900 font-bold mb-10">
                Twitter Scraper
            </h2>

            <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
                <div className="space-y-5">
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Twitter Username"
                        className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                        aria-label="Twitter Username"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Twitter Password"
                        className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                        aria-label="Twitter Password"
                    />
                    <input
                        type="text"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        placeholder="Mobile Number"
                        className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                        aria-label="Mobile Number"
                    />
                    <input
                        type="text"
                        value={hashtag}
                        onChange={(e) => setHashtag(e.target.value)}
                        placeholder="Hashtag (without #)"
                        className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                        aria-label="Hashtag"
                    />
                    <input
                        type="number"
                        value={numposts}
                        onChange={(e) => setnumposts(e.target.value)}
                        placeholder="Number of Posts"
                        className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                        aria-label="Number of Posts"
                    />
                </div>

                <button 
                    className={`mt-8 w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-300 ${!hashtag.trim() || !username.trim() || !password.trim() || !mobileNumber.trim() || !numposts.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={handleScrape} 
                    disabled={loading || !hashtag.trim() || !username.trim() || !password.trim() || !mobileNumber.trim() || !numposts.trim()}
                    aria-label="Start Scraping"
                >
                    {loading ? "Scraping..." : "Start Scraping"}
                </button>

                {loading && (
                    <div className="flex justify-center items-center mt-6">
                        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent border-solid rounded-full animate-spin"></div>
                    </div>
                )}
            </div>

            <div className="w-full max-w-screen-lg mt-12 p-6 bg-white border border-gray-200 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Output</h3>
                <div className="text-gray-700">
                    {posts.length > 0 ? (
                        <>
                            <button 
                                className="mb-4 p-2 rounded-md bg-green-600 text-white font-medium hover:bg-green-700 transition duration-200"
                                onClick={downloadCSV}
                                aria-label="Download CSV"
                            >
                                Download CSV
                            </button>
                            <pre className="bg-gray-50 p-3 border border-gray-200 rounded-md overflow-auto whitespace-pre-wrap max-h-80">
                                {JSON.stringify(posts, null, 1)}
                            </pre>
                        </>
                    ) : (
                        <p className="text-gray-500">
                            No data available. Please enter a query and scrape.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TwitterScraper;
