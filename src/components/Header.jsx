/* eslint-disable no-unused-vars */
// import React from 'react';
// import { Link } from 'react-router-dom';

// const Header = () => {
//   return (
//     <header className="bg-primary text-white p-3 shadow-custom">
//       <nav className="container mx-auto flex justify-between items-center">
//         <h1 className="items-start text-3xl font-bold tracking-wide">Scraping Assistant</h1>
//         <ul className="flex space-x-6">
//           <li><Link to="/" className="hover:text-secondary transition-colors duration-300">Home</Link></li>
//           <li><Link to="/instagram" className="hover:text-secondary transition-colors duration-300">Instagram</Link></li>
//           <li><Link to="/twitter" className="hover:text-secondary transition-colors duration-300">Twitter</Link></li>
//           <li><Link to="/linkedin" className="hover:text-secondary transition-colors duration-300">LinkedIn</Link></li>
//         </ul>
//       </nav>
//     </header>
//   );
// };

// export default Header;

// import React from 'react';
// import { Link } from 'react-router-dom';

// const Header = () => {
//   return (
//     <header className="bg-primary text-white p-3 shadow-custom">
//       <nav className="container mx-auto flex justify-between items-center">
//         <h1 className="text-3xl font-bold tracking-wide">Scraping Assistant</h1>
//         <ul className="flex space-x-6">
//           <li><Link to="/home" className="hover:text-secondary transition-colors duration-300">Home</Link></li>
//           <li><Link to="/instagram" className="hover:text-secondary transition-colors duration-300">Instagram</Link></li>
//           <li><Link to="/twitter" className="hover:text-secondary transition-colors duration-300">Twitter</Link></li>
//           <li><Link to="/linkedin" className="hover:text-secondary transition-colors duration-300">LinkedIn</Link></li>
//         </ul>
//         <div className="flex space-x-4">
//           <Link to="/signup" className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full transition duration-300">SignUp for Free</Link>
//           <Link to="/login" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full transition duration-300">Login</Link>
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Header;



import React from 'react'; 
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token on logout
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <header className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 shadow-lg">
      <nav className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-wide hover:underline cursor-pointer">
          <Link to="/">Scraping Assistant</Link>
        </h1>
        <ul className="flex space-x-8">
          <li>
            <Link to="/home" className="hover:text-yellow-300 transition duration-300" aria-label="Home">Home</Link>
          </li>
          <li>
            <Link to="/instagram" className="hover:text-yellow-300 transition duration-300" aria-label="Instagram">Instagram</Link>
          </li>
          <li>
            <Link to="/twitter" className="hover:text-yellow-300 transition duration-300" aria-label="Twitter">Twitter</Link>
          </li>
          <li>
            <Link to="/linkedin" className="hover:text-yellow-300 transition duration-300" aria-label="LinkedIn">LinkedIn</Link>
          </li>
        </ul>
        <div className="flex space-x-4">
          {!token ? (
            <>
              <Link 
                to="/signup" 
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full transition duration-300" 
                aria-label="Sign up for free"
              >
                Sign Up
              </Link>
              <Link 
                to="/login" 
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full transition duration-300" 
                aria-label="Login"
              >
                Login
              </Link>
            </>
          ) : (
            <button 
              onClick={handleLogout} 
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full transition duration-300" 
              aria-label="Logout"
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
