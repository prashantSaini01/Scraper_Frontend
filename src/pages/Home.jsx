/* eslint-disable no-unused-vars */
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import Home from './pages/Home';
// import InstagramScraper from './pages/InstagramScraper';
// import TwitterScraper from './pages/TwitterScraper';
// import LinkedInScraper from './pages/LinkedInScraper';
// import SignUp from './pages/Signup';
// import Login from './pages/Login';
// import PrivateRoute from './components/PrivateRoute';
// import YoutubeScraper from './pages/Youtube';

// function App() {
//   return (
//     <Router>
//       <div className="flex flex-col min-h-screen">
//         <Header />
//         <main className="flex-grow container mx-auto p-4">
//           <Routes>
//             {/* Public routes */}
//             <Route path="/" element={<Login />} />
//             <Route path="/signup" element={<SignUp />} />
//             <Route path="/login" element={<Login />} />

//             {/* Protected routes */}
//             <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
//             <Route path="/instagram" element={<PrivateRoute><InstagramScraper /></PrivateRoute>} />
//             <Route path="/twitter" element={<PrivateRoute><TwitterScraper /></PrivateRoute>} />
//             <Route path="/linkedin" element={<PrivateRoute><LinkedInScraper /></PrivateRoute>} />
//             <Route path="/youtube" element={<PrivateRoute><YoutubeScraper /></PrivateRoute>} />
//           </Routes>
//         </main>
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;

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
        <Link to="/youtube" className="bg-gradient-to-r from-red-800 to-red-400 text-white py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300">
          Youtube Scraper
        </Link>
      </div>
    </div>
  );
};

export default Home;
