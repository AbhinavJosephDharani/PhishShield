import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiUser, FiMail, FiLock, FiAlertCircle } from 'react-icons/fi';
import ScrollContainer from '../components/ScrollContainer';

// API URL based on environment
const API_URL = import.meta.env.PROD ? 'https://phishshield.vercel.app' : '';

function Register({ setIsAuthenticated }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Fade in animation
    const timer = setTimeout(() => {
      setOpacity(1);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      console.log('Sending registration request:', {
        name: formData.name,
        email: formData.email,
        password: '***'
      });
      
      const response = await axios.post(`${API_URL}/api/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Registration successful:', response.data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setIsAuthenticated(true);
      navigate('/dashboard');
    } catch (err) {
      console.error('Registration error:', {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message
      });
      setError(
        err.response?.data?.message || 
        err.response?.data?.details || 
        err.message || 
        'Failed to register'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollContainer>
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white">
              Join PhishShield
            </h1>
            <p className="mt-3 text-lg text-gray-300">
              Start your cybersecurity journey today
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {error && (
              <div className="flex items-center gap-2 text-red-500 bg-red-500/10 p-3 rounded-lg">
                <FiAlertCircle className="flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            <div className="space-y-6">
              <div>
                <div className="text-sm text-gray-300 mb-2">Full Name</div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="appearance-none relative block w-full px-10 py-3 border border-gray-300/20 bg-black/20 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                    placeholder="Full Name"
                  />
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-300 mb-2">Email address</div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="appearance-none relative block w-full px-10 py-3 border border-gray-300/20 bg-black/20 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                    placeholder="Email address"
                  />
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-300 mb-2">Password</div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="appearance-none relative block w-full px-10 py-3 border border-gray-300/20 bg-black/20 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                    placeholder="Password"
                  />
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-300 mb-2">Confirm Password</div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="appearance-none relative block w-full px-10 py-3 border border-gray-300/20 bg-black/20 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                    placeholder="Confirm Password"
                  />
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </div>
                ) : (
                  'Create Account'
                )}
              </button>
            </div>

            <div className="text-center">
              <Link
                to="/login"
                className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors duration-200"
              >
                Already have an account? Sign in
              </Link>
            </div>
          </form>

          <div className="mt-16 space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white">
                Why Join PhishShield?
              </h2>
              <p className="mt-4 text-lg text-gray-300">
                Protect your organization with state-of-the-art security training
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">
                Comprehensive Training
              </h3>
              <p className="text-gray-300">
                Learn to identify and prevent various cybersecurity threats
              </p>
            </div>
          </div>
        </div>
      </div>
    </ScrollContainer>
  );
}

export default Register; 