import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Added useLocation
import logo from '../assets/inzint.png';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get current route
  const token = localStorage.getItem('token');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
    if (!menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  // Function to determine if a link is active
  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-gray-50 p-3 shadow-custom fixed top-0 left-0 w-full z-50">
      <nav className="container mx-auto flex justify-between items-center ">
        {/* Logo and Title */}
        <div className="flex items-center space-x-4 mx-10">
          <img src={logo} alt="Logo" className="h-10 w-13 rounded-sm object-cover" />
          <h1 className="text-3xl md:text-3xl font-bold tracking-wide text-black">
            AI Lab
          </h1>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="block lg:hidden">
          <button
            className="text-black text-3xl focus:outline-none"
            onClick={handleMenuToggle}
          >
            {menuOpen ? '✖' : '☰'}
          </button>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex space-x-6 text-black font-sans text-lg">
          <li>
            <Link
              to="/home"
              className={`transition-colors duration-300 ${
                isActive('/home')
                  ? 'text-red-600 font-semibold'
                  : 'hover:text-red-600'
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/abrassio"
              className={`transition-colors duration-300 ${
                isActive('/abrassio')
                  ? 'text-red-600 font-semibold'
                  : 'hover:text-red-600'
              }`}
            >
              Abrassio
            </Link>
          </li>
          <li>
            <Link
              to="/socialspark"
              className={`transition-colors duration-300 ${
                isActive('/socialspark') ? 'text-red-600 font-semibold' : 'hover:text-red-600'
              }`}
            >
              Social Spark
            </Link>
          </li>
          <li>
            <Link
              to="/lawbot"
              className={`transition-colors duration-300 ${
                isActive('/lawbot')
                  ? 'text-red-600 font-semibold'
                  : 'hover:text-red-600'
              }`}
            >
              Legal Bot
            </Link>
          </li>
        </ul>

        {/* Authentication Buttons */}
        <div className="hidden lg:flex space-x-4">
          
          {!token ? (
            <>
              <Link
                to="/signup"
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full transition duration-300"
              >
                SignUp for Free
              </Link>
              <Link
                to="/login"
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full transition duration-300"
              >
                Login
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full transition duration-300"
            >
              Logout
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={handleMenuToggle}
        >
          <div
            className="bg-primary text-white fixed top-0 right-0 w-4/5 max-w-xs h-full p-4 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <ul className="space-y-6 text-lg">
              <li>
                <Link
                  to="/home"
                  className={`block transition-colors duration-300 ${
                    isActive('/home')
                      ? 'text-red-600 font-semibold'
                      : 'hover:text-secondary'
                  }`}
                  onClick={handleMenuToggle}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/abrassio"
                  className={`block transition-colors duration-300 ${
                    isActive('/abrassio')
                      ? 'text-red-600 font-semibold'
                      : 'hover:text-secondary'
                  }`}
                  onClick={handleMenuToggle}
                >
                  Abrassio
                </Link>
              </li>
              <li>
                <Link
                  to="/socialspark"
                  className={`block transition-colors duration-300 ${
                    isActive('/socialspark') ? 'text-red-600 font-semibold' : 'hover:text-secondary'
                  }`}
                  onClick={handleMenuToggle}
                >
                  Social Spark
                </Link>
              </li>
              <li>
                <Link
                  to="/lawbot"
                  className={`block transition-colors duration-300 ${
                    isActive('/lawbot')
                      ? 'text-red-600 font-semibold'
                      : 'hover:text-secondary'
                  }`}
                  onClick={handleMenuToggle}
                >
                  Legal Bot
                </Link>
              </li>
            </ul>
            <div className="mt-6">
              {!token ? (
                <>
                  <Link
                    to="/signup"
                    className="block bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full transition duration-300 mb-4"
                    onClick={handleMenuToggle}
                  >
                    SignUp for Free
                  </Link>
                  <Link
                    to="/login"
                    className="block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full transition duration-300"
                    onClick={handleMenuToggle}
                  >
                    Login
                  </Link>
                </>
              ) : (
                <button
                  onClick={() => {
                    handleLogout();
                    handleMenuToggle();
                  }}
                  className="block bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full transition duration-300"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;