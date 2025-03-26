import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiMail, FiLock, FiAlertCircle } from 'react-icons/fi';
import ScrollContainer from '../components/ScrollContainer';

function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setIsAuthenticated(true);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollContainer>
      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
        <div 
          className="transform-gpu transition-opacity duration-1000 ease-out"
          style={{ opacity }}
        >
          {/* Section 1: Hero & Login */}
          <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="max-w-md w-full space-y-8 relative z-10">
              <div>
                <h1 className="mt-6 text-center text-5xl font-extrabold text-white drop-shadow-lg">
                  PhishShield
                </h1>
                <h2 className="mt-2 text-center text-md font-medium text-blue-100 drop-shadow-md">
                  Your Cybersecurity Training Platform
                </h2>
              </div>

              <div className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg shadow-2xl rounded-lg p-8 transition-all duration-300 hover:shadow-indigo-500/30">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  {error && (
                    <div className="flex items-center p-4 bg-red-50 border-l-4 border-red-500 rounded-md">
                      <FiAlertCircle className="h-5 w-5 text-red-500 mr-3" />
                      <p className="text-sm text-red-500">{error}</p>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email address
                      </label>
                      <div className="mt-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiMail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <div className="mt-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiLock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="current-password"
                          required
                          className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <Link
                        to="/register"
                        className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                      >
                        Create new account
                      </Link>
                    </div>
                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                      >
                        Forgot password?
                      </a>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                        isLoading
                          ? 'bg-blue-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                      } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition-all duration-150 hover:scale-[1.02]`}
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Signing in...
                        </div>
                      ) : (
                        'Sign in'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Section 2: Features */}
          <div className="min-h-screen flex flex-col items-center justify-center py-12">
            <div className="max-w-4xl w-full space-y-16">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-white drop-shadow-lg">
                  Advanced Security Training
                </h2>
                <p className="mt-4 text-xl text-blue-100 drop-shadow-md">
                  Stay ahead of cyber threats with our interactive training platform
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: 'Phishing Simulations',
                    description: 'Test your team with realistic phishing scenarios',
                  },
                  {
                    title: 'Security Dashboard',
                    description: 'Track progress and identify security gaps',
                  },
                  {
                    title: 'Interactive Learning',
                    description: 'Engaging modules designed for maximum retention',
                  },
                ].map((feature, index) => (
                  <div 
                    key={index}
                    className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-sm rounded-lg p-6 shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-indigo-500/30"
                  >
                    <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                    <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="py-8 text-center text-sm text-blue-100">
            <p>Protected by PhishShield. © 2024 All rights reserved.</p>
          </div>
        </div>
      </div>
    </ScrollContainer>
  );
}

export default Login; 