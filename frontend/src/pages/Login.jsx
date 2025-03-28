import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiMail, FiLock, FiAlertCircle } from 'react-icons/fi';
import Logo from '../components/Logo';
import DecryptedText from '../components/DecryptedText';
import ScrollContainer from '../components/ScrollContainer';

// API URL based on environment
const API_URL = import.meta.env.PROD ? 'https://phishshield.vercel.app' : '';

function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Faster fade in animation
    setOpacity(1);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
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
      <div className="min-h-screen flex flex-col p-4">
        <div className="absolute top-1 left-0 right-0 flex justify-center items-center">
          <div className="w-8 h-8">
            <Logo 
              style={{
                transform: 'scale(0.4)',
                transition: 'all 0.3s ease'
              }}
              params={{
                patternScale: 0.4,
                refraction: 0.035,
                edge: 0.98,
                patternBlur: 0.006,
                liquid: 0.15,
                speed: 0.35
              }}
            />
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div 
            className="w-[400px] mx-auto relative"
            style={{ opacity }}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold text-white flex items-center justify-center gap-2">
                Welcome to{' '}
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
                Sign in to continue to your secure training platform
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="appearance-none relative block w-full px-10 py-3 border border-gray-300/20 bg-black/20 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                      placeholder="Password"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    {isLoading ? 'Signing in...' : 'Sign in'}
                  </button>
                </div>

                <div className="text-center">
                  <Link
                    to="/register"
                    className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors duration-200"
                  >
                    Don't have an account? Sign up
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </ScrollContainer>
  );
}

export default Login; 