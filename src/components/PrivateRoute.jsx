import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
 
const PrivateRoute = ({ children }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
 
    useEffect(() => {
        if (!token) {
            alert('Please log in to access this page.');  // Show alert
            navigate('/login');  // Redirect to login page smoothly
        }
    }, [token, navigate]);
 
    return token ? children : null;  // If no token, render nothing (handled by useEffect)
};
 
PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
};
 
export default PrivateRoute;




// Appwrite Authentication Logic

// import React, { useEffect, useState } from 'react';
// import { Navigate, useNavigate } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import { Client, Account } from 'appwrite';

// const client = new Client();
// client.setEndpoint("https://cloud.appwrite.io/v1").setProject("6718e0ec0026a7ad41cb");

// const account = new Account(client);

// const PrivateRoute = ({ children }) => {
//     const navigate = useNavigate();
//     const [isAuthenticated, setIsAuthenticated] = useState(false);

//     useEffect(() => {
//         const checkSession = async () => {
//             try {
//                 await account.get();  // Fetch user session from Appwrite
//                 setIsAuthenticated(true); // Session exists
//             } catch (error) {
//                 console.error("No active session found:", error);
//                 alert('Please log in to access this page.');  // Show alert
//                 navigate('/login');  // Redirect to login page smoothly
//             }
//         };

//         checkSession();
//     }, [navigate]);

//     return isAuthenticated ? children : null;
// };

// PrivateRoute.propTypes = {
//     children: PropTypes.node.isRequired,
// };

// export default PrivateRoute;











































