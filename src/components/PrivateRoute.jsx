

// Showing Alert two times

/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Client, Account } from 'appwrite';

const client = new Client();
client.setEndpoint("https://cloud.appwrite.io/v1").setProject("670cc30e0000d61b0682");

const account = new Account(client);

const PrivateRoute = ({ children }) => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkSession = async () => {
            try {
                await account.get();  // Fetch user session from Appwrite
                setIsAuthenticated(true); // Session exists
            } catch (error) {
                console.error("No active session found:", error);
                alert('Please log in to access this page.');  // Show alert
                navigate('/login');  // Redirect to login page smoothly
            }
        };

        checkSession();
    }, [navigate]);

    return isAuthenticated ? children : null;
};

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default PrivateRoute;







































// /* eslint-disable no-unused-vars */
// import React, { useEffect, useState } from 'react';
// import { Navigate, useNavigate } from 'react-router-dom';
// import PropTypes from 'prop-types';

// const PrivateRoute = ({ children }) => {
//     const navigate = useNavigate();
//     const token = localStorage.getItem('token');
//     const [showAlert, setShowAlert] = useState(false);  // Manage alert display

//     useEffect(() => {
//         if (!token && !showAlert) {  // Ensure the alert runs only once
//             setShowAlert(true);  // Set flag to avoid triggering alert multiple times
//         }
//     }, [token, showAlert]);

//     useEffect(() => {
//         if (showAlert) {
//             alert('Please log in to access this page.');  // Show alert only once
//             navigate('/login');  // Redirect after the alert is acknowledged
//         }
//     }, [showAlert, navigate]);

//     return token ? children : null;  // Render children if token exists, otherwise render nothing
// };

// PrivateRoute.propTypes = {
//     children: PropTypes.node.isRequired,
// };

// export default PrivateRoute;
