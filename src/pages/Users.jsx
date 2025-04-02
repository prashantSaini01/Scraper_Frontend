import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API_URL from '../components/config';
import {
  FaHome,
  FaUserPlus,
  FaTimes,
  FaCheck,
  FaSearch,
  FaUser,
} from 'react-icons/fa';

const Users = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUser, setNewUser] = useState({ username: '', email: '', password: '', role: 'user' });

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${API_URL}/get_users`, {
          headers: { 'x-access-token': token },
        });
        // Log the API response to debug
        console.log("API Response:", response.data);
        // Sanitize the users data to ensure all required fields exist and are strings
        const sanitizedUsers = (response.data.users || []).map(user => ({
          _id: user._id || '',
          username: user.username || 'Unknown',
          email: user.email || 'N/A',
          role: typeof user.role === 'string' ? user.role : 'N/A',
        }));
        setUsers(sanitizedUsers);
        setFilteredUsers(sanitizedUsers);
      } catch (err) {
        console.error("Error fetching users:", err);
        const errorMessage =
          err.response?.data?.message || "Failed to fetch users.";
        setError(errorMessage);
        if (err.response?.status === 401) {
          toast.error("Session expired. Please log in again.");
          localStorage.removeItem("token");
          setTimeout(() => navigate("/login"), 2000);
        } else {
          toast.error(errorMessage);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [navigate, token]);

  // Handle search functionality with defensive checks
  useEffect(() => {
    const filtered = users.filter((user) => {
      const username = user.username || '';
      const email = user.email || '';
      const role = user.role || 'N/A';
      const query = searchQuery.toLowerCase();
      return (
        username.toLowerCase().includes(query) ||
        email.toLowerCase().includes(query) ||
        role.toLowerCase().includes(query)
      );
    });
    setFilteredUsers(filtered);
  }, [searchQuery, users]);

  const handleAddUser = async () => {
    if (!newUser.username || !newUser.email || !newUser.password) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/add_user`,
        newUser,
        { headers: { 'x-access-token': token } }
      );

      if (response.data.message) {
        toast.success(response.data.message);
        const newUserData = {
          _id: response.data.user_id,
          username: response.data.username || 'Unknown',
          email: response.data.email || 'N/A',
          role: typeof response.data.role === 'string' ? response.data.role : 'N/A',
        };
        setUsers([...users, newUserData]);
        setFilteredUsers([...users, newUserData]);
        setNewUser({ username: '', email: '', password: '', role: 'user' });
        setShowAddUserModal(false);
      }
    } catch (error) {
      toast.error(error.response?.data.message || "Failed to add user.");
    }
  };

  const handleRemoveUser = async () => {
    if (!selectedUser) return;

    try {
      const response = await axios.post(
        `${API_URL}/remove_user`,
        { user_id: selectedUser._id },
        { headers: { 'x-access-token': token } }
      );

      if (response.data.message) {
        toast.success(response.data.message);
        setUsers(users.filter((user) => user._id !== selectedUser._id));
        setFilteredUsers(filteredUsers.filter((user) => user._id !== selectedUser._id));
      }
    } catch (error) {
      toast.error(error.response?.data.message || "Failed to remove user.");
    } finally {
      setShowModal(false);
      setSelectedUser(null);
    }
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const openAddUserModal = () => {
    setShowAddUserModal(true);
  };

  const goToHome = () => navigate('/');

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex flex-col py-12 px-6 relative">
      {/* Back to Home Button */}
      <button
        onClick={goToHome}
        className="absolute top-6 right-6 px-6 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 group"
      >
        <FaHome className="h-5 w-5 transform group-hover:rotate-12 transition-transform duration-300" />
        <span className="font-medium">Back to Home</span>
      </button>

      <div className="w-full max-w-6xl mx-auto space-y-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-blue-700 animate-pulse">
            Users Management
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Manage all users here
          </p>
        </div>

        {/* Users Section */}
        <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <FaUser className="h-6 w-6 text-indigo-600" />
              All Users
            </h3>
            <div className="flex items-center gap-4">
              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search users..."
                  className="pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              {/* Add User Button */}
              <button
                onClick={openAddUserModal}
                className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-xl hover:from-green-600 hover:to-green-800 transition-all duration-300 shadow-sm hover:shadow-md flex items-center gap-2"
              >
                <FaUserPlus className="text-lg" />
                <span>Add User</span>
              </button>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col justify-center items-center h-64">
              <div className="w-16 h-16 border-4 border-t-transparent border-indigo-500 rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Loading users...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center text-red-600 bg-red-50 p-4 rounded-lg">
              <p>{error}</p>
            </div>
          )}

          {/* No Users State */}
          {!loading && !error && filteredUsers.length === 0 && (
            <p className="text-gray-500 italic text-center">
              No users available.
            </p>
          )}

          {/* Users List */}
          {!loading && !error && filteredUsers.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-80 overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-gray-100 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
              {filteredUsers.map((user) => (
                <div
                  key={user._id}
                  className="p-4 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex items-center group relative"
                >
                  <div className="flex-grow">
                    <span
                      className="font-medium text-gray-800 block truncate"
                      title={user.username}
                    >
                      {user.username}
                    </span>
                    <span
                      className="text-sm text-gray-500 block truncate"
                      title={user.email}
                    >
                      {user.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span
                      className="text-sm text-indigo-600 truncate"
                      title={user.role}
                    >
                      {user.role}
                    </span>
                    <button
                      onClick={() => openModal(user)}
                      className="text-red-500 hover:text-red-700 flex-shrink-0 transform hover:scale-110 transition-transform duration-300"
                    >
                      <FaTimes className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal (for remove user) */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaUser className="text-red-500" />
              Confirm Remove User
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to remove user{' '}
              <span className="font-medium">{selectedUser?.username}</span>?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-300 flex items-center gap-2"
              >
                <FaTimes className="text-gray-600" />
                No
              </button>
              <button
                onClick={handleRemoveUser}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300 flex items-center gap-2"
              >
                <FaCheck className="text-white" />
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaUserPlus className="text-green-500" />
              Add New User
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                value={newUser.username}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                placeholder="Username"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                placeholder="Email"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                placeholder="Password"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setShowAddUserModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-300 flex items-center gap-2"
              >
                <FaTimes className="text-gray-600" />
                Cancel
              </button>
              <button
                onClick={handleAddUser}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300 flex items-center gap-2"
              >
                <FaCheck className="text-white" />
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Users;
