import { useNavigate } from 'react-router-dom';

export const useTokenCheck = () => {
  const navigate = useNavigate();

  const checkToken = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Token expired. Please log in.');
      navigate('/login'); // Redirect to login page
    }
  };

  return checkToken;
};