// Render Deployed Backend
//const API_URL = process.env.REACT_APP_API_URL;
// const API_URL = "https://scrap-bot-j67k.onrender.com";
// const API_URL = "http://127.0.0.1:5000";

// config.js
// const API_URL = process.env.REACT_APP_API_URL;
const API_URL = import.meta.env.VITE_API_URL;

export default API_URL;