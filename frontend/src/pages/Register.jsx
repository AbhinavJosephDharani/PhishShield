import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiUser, FiMail, FiLock, FiAlertCircle } from 'react-icons/fi';
import Logo from '../components/Logo';
import DecryptedText from '../components/DecryptedText';
import Scene3D from '../components/Scene3D';
import Sidebar from '../components/Sidebar';

// API URL based on environment
const API_URL = import.meta.env.PROD ? 'https://phishshield.vercel.app' : '';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setOpacity(1);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
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
      await axios.post(`${API_URL}/api/auth/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen overflow-x-hidden">
      <Scene3D />
      <Sidebar />
      
      <div className="relative w-full pl-64">
        <div className="min-h-screen flex flex-col items-center justify-center px-4">
          <div 
            className="w-[400px] relative"
            style={{ opacity }}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold text-white flex items-center justify-center gap-2">
                Join{' '}
                <DecryptedText
                  text="PhishShield"
                  speed={50}
                  sequential={true}
                  revealDirection="center"
                  animateOn="view"
                  className="text-blue-400 font-extrabold"
                  encryptedClassName="text-red-400 font-extrabold"
                  characters="01!@#$%^&*()_+[]{}|;:,.<>?"
                  maxIterations={15}
                  parentClassName="inline-block"
                />
              </h2>
              <p className="mt-2 text-sm text-gray-300">
                Create your account to start your cybersecurity journey
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/10">
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="flex items-center gap-2 text-red-500 bg-red-500/10 p-3 rounded-lg">
                    <FiAlertCircle className="flex-shrink-0" />
                    <p className="text-sm">{error}</p>
                  </div>
                )}

                <div>
                  <div className="text-sm text-gray-300 mb-2">Full Name</div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="appearance-none relative block w-full px-10 py-3 border border-gray-300/20 bg-black/20 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                      placeholder="Enter your full name"
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
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="appearance-none relative block w-full px-10 py-3 border border-gray-300/20 bg-black/20 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                      placeholder="Enter your email"
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
                      name="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="appearance-none relative block w-full px-10 py-3 border border-gray-300/20 bg-black/20 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                      placeholder="Create a password"
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
                      name="confirmPassword"
                      type="password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="appearance-none relative block w-full px-10 py-3 border border-gray-300/20 bg-black/20 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                      placeholder="Confirm your password"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    {isLoading ? 'Creating account...' : 'Create Account'}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register; 