import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Client, Account } from 'appwrite';
import { useState, useEffect } from 'react';


const client = new Client();
client.setEndpoint("https://cloud.appwrite.io/v1").setProject("670cc30e0000d61b0682");

const account = new Account(client);

const Header = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        await account.get(); // Check if a session exists
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    checkSession();
  }, []);

  const handleLogout = async () => {
    try {
      await account.deleteSession('current'); // Logs out the current session
      setIsAuthenticated(false);
      navigate('/login');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <header className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 shadow-lg">
      <nav className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-wide">Scraping Assistant</h1>
        <ul className="flex space-x-6">
          {isAuthenticated && (
            <>
              <li><Link to="/home" className="hover:text-secondary transition-colors duration-300">Home</Link></li>
              <li><Link to="/instagram" className="hover:text-secondary transition-colors duration-300">Instagram</Link></li>
              <li><Link to="/twitter" className="hover:text-secondary transition-colors duration-300">Twitter</Link></li>
              <li><Link to="/linkedin" className="hover:text-secondary transition-colors duration-300">LinkedIn</Link></li>
              <li><Link to="/youtube" className="hover:text-secondary transition-colors duration-300">YouTube</Link></li>
            </>
          )}
        </ul>
        <div className="flex space-x-4">
          {!isAuthenticated ? (
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
