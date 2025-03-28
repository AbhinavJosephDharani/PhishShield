import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// API URL based on environment
const API_URL = import.meta.env.PROD ? 'https://phishshield.vercel.app' : '';

function Dashboard({ setIsAuthenticated }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          handleLogout();
          return;
        }

        const response = await axios.get(`${API_URL}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        handleLogout();
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    navigate('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold">PhishShield</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <a
                  href="#"
                  className="border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Dashboard
                </a>
                <a
                  href="#"
                  className="border-transparent text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Training
                </a>
                <a
                  href="#"
                  className="border-transparent text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Reports
                </a>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600 mr-4">
                Welcome, {user?.name || 'User'}
              </span>
              <button
                onClick={handleLogout}
                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 p-4">
            <h1 className="text-2xl font-bold mb-4">Welcome to PhishShield</h1>
            <p className="text-gray-600">
              Your cybersecurity training dashboard is being set up...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 