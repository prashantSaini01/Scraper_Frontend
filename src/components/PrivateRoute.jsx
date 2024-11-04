import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Client, Account } from 'appwrite';

const client = new Client();
// client.setEndpoint("https://cloud.appwrite.io/v1").setProject("6718e0ec0026a7ad41cb");
client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);
const account = new Account(client);

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        const authMethod = localStorage.getItem('authMethod');

        if (authMethod === 'google') {
          // Check Appwrite session
          await account.get();
          setIsAuthenticated(true);
        } else if (token) {
          // Verify JWT token here if needed
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          throw new Error('No valid authentication found');
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        setIsAuthenticated(false);
        toast.error('Please log in to continue');
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  if (isLoading) {
    // You can replace this with a loading spinner component
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : null;
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











































