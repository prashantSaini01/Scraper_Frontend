import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Brand or Logo Section */}
          <p className="text-center text-sm md:text-base">
            &copy; 2024 <span className="font-bold text-teal-300">Scraping Assistant</span>. All rights reserved.
          </p>

          {/* Social Media Links */}
          <div className="flex justify-center md:justify-end space-x-8">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit GitHub"
              className="text-gray-300 hover:text-teal-300 transition duration-300"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M12 .5a12 12 0 00-3.8 23.4c.6.1.8-.3.8-.6v-2.1c-3.4.7-4.1-1.5-4.1-1.5-.5-1.2-1.3-1.5-1.3-1.5-1.1-.7.1-.7.1-.7 1.3.1 2 1.3 2 1.3 1.1 2 2.8 1.4 3.5 1.1.1-.8.4-1.4.8-1.7-2.7-.3-5.6-1.4-5.6-6.1a4.8 4.8 0 011.3-3.4c-.1-.3-.6-1.7.1-3.6 0 0 1.1-.3 3.7 1.4a12.9 12.9 0 016.8 0c2.6-1.7 3.7-1.4 3.7-1.4.8 1.9.3 3.3.1 3.6a4.8 4.8 0 011.3 3.4c0 4.7-2.9 5.7-5.6 6 .4.3.9 1 .9 2v3c0 .3.2.7.8.6A12 12 0 0012 .5z" />
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Twitter"
              className="text-gray-300 hover:text-teal-300 transition duration-300"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.4.3a9.05 9.05 0 01-2.82 1.08 4.5 4.5 0 00-7.72 4.1A12.8 12.8 0 012.29 1.5a4.49 4.49 0 001.38 6 4.4 4.4 0 01-2-.55v.06a4.5 4.5 0 003.6 4.4 4.5 4.5 0 01-2 .08 4.5 4.5 0 004.21 3.13 9 9 0 01-6.64 1.84 12.7 12.7 0 006.92 2c8.3 0 12.85-7 12.85-13v-.6A9 9 0 0023 3z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit LinkedIn"
              className="text-gray-300 hover:text-teal-300 transition duration-300"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M4.98 3a2.5 2.5 0 012.5 2.5 2.5 2.5 0 11-5 0A2.5 2.5 0 014.98 3zm.02 4.6H0V24h5V7.6zm7.13 0h-5v16.4h5v-9.7c0-5.2 6.7-5.6 6.7 0v9.7h5V13c0-9.1-10.4-8.8-11.7-4.3z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
