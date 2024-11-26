import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-6 shadow-inner">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; 2024 Scraping Assistant. All rights reserved.
        </p>
        <div className="flex flex-wrap justify-center space-x-4 space-y-2 mt-4 md:space-y-0">
          <a
            href="https://instagram.com"
            className="hover:text-primary transition-colors duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          <a
            href="https://x.com"
            className="hover:text-primary transition-colors duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
          <a
            href="https://linkedin.com"
            className="hover:text-primary transition-colors duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="https://youtube.com"
            className="hover:text-primary transition-colors duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            Youtube
          </a>
          <a
            href="https://twitch.com"
            className="hover:text-primary transition-colors duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitch
          </a>
          <a
            href="https://tiktok.com"
            className="hover:text-primary transition-colors duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            TikTok
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
