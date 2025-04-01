import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ScrollContainer from '../components/ScrollContainer';

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
      <ScrollContainer>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-xl text-white">Loading...</div>
        </div>
      </ScrollContainer>
    );
  }

  return (
    <ScrollContainer>
      <div className="min-h-screen">
        <nav className="bg-black/80 backdrop-blur-md border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">PhishShield</span>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <a
                    href="#"
                    className="border-blue-500 text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Dashboard
                  </a>
                  <a
                    href="#"
                    className="border-transparent text-gray-300 hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Training
                  </a>
                  <a
                    href="#"
                    className="border-transparent text-gray-300 hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Reports
                  </a>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-gray-300 mr-4">
                  Welcome, {user?.name || 'User'}
                </span>
                <button
                  onClick={handleLogout}
                  className="ml-3 inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-lg hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-300"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border border-white/10 bg-black/40 backdrop-blur-md rounded-lg h-96 p-8">
              <h1 className="text-2xl font-bold mb-4 text-white">Welcome to PhishShield</h1>
              <p className="text-gray-300">
                Your cybersecurity training dashboard is being set up...
              </p>
            </div>
          </div>
        </div>
      </div>
    </ScrollContainer>
  );
}

export default Dashboard; 