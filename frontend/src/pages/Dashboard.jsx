import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import GlitchText from '../components/GlitchText';
import { FiHome, FiShield, FiSettings, FiUser } from 'react-icons/fi';
import PhishingSimulation from './PhishingSimulation';

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) return null;

  const renderContent = () => {
    switch (location.pathname) {
      case '/dashboard':
        return (
          <>
            {/* User Welcome */}
            <div className="flex justify-between items-center mb-8">
              <GlitchText className="text-2xl sm:text-3xl font-bold">
                Welcome, {user.name}
              </GlitchText>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
            
            {/* Training Progress */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="p-6 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700">
                <h3 className="text-xl font-semibold mb-4 text-blue-400">Training Progress</h3>
                <div className="flex items-center">
                  <div className="flex-1 bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full w-[45%]"></div>
                  </div>
                  <span className="ml-4 text-gray-300">45%</span>
                </div>
              </div>
              
              <div className="p-6 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700">
                <h3 className="text-xl font-semibold mb-4 text-purple-400">Recent Activities</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Completed Phishing Module</li>
                  <li>• Started Social Engineering</li>
                </ul>
              </div>
              
              <div className="p-6 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700">
                <h3 className="text-xl font-semibold mb-4 text-pink-400">Security Score</h3>
                <div className="flex items-center justify-center">
                  <div className="text-4xl font-bold text-pink-400">85</div>
                  <div className="ml-2 text-gray-300">/100</div>
                </div>
              </div>
            </div>

            {/* Available Training */}
            <div>
              <GlitchText className="text-xl sm:text-2xl font-bold mb-6">
                Available Training
              </GlitchText>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-blue-500/50 transition-colors">
                  <h3 className="text-xl font-semibold mb-4 text-blue-400">
                    Phishing Awareness
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Learn to identify and avoid phishing attempts in emails and messages.
                  </p>
                  <Link
                    to="/simulation"
                    className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Start Training
                  </Link>
                </div>

                <div className="p-6 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-purple-500/50 transition-colors">
                  <h3 className="text-xl font-semibold mb-4 text-purple-400">
                    Social Engineering
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Understand and protect against social engineering tactics.
                  </p>
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
                    Start Training
                  </button>
                </div>
              </div>
            </div>
          </>
        );
      case '/simulation':
        return <PhishingSimulation />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="min-h-screen pb-20">
        {renderContent()}
      </div>
      
      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a]/95 backdrop-blur-md border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-around items-center h-16">
            <Link
              to="/dashboard"
              className={`flex flex-col items-center justify-center w-full h-full ${
                location.pathname === '/dashboard' ? 'text-blue-500' : 'text-gray-400'
              }`}
            >
              <FiHome className="text-xl" />
              <span className="text-xs mt-1">Home</span>
            </Link>
            <Link
              to="/simulation"
              className={`flex flex-col items-center justify-center w-full h-full ${
                location.pathname === '/simulation' ? 'text-blue-500' : 'text-gray-400'
              }`}
            >
              <FiShield className="text-xl" />
              <span className="text-xs mt-1">Training</span>
            </Link>
            <Link
              to="/profile"
              className={`flex flex-col items-center justify-center w-full h-full ${
                location.pathname === '/profile' ? 'text-blue-500' : 'text-gray-400'
              }`}
            >
              <FiUser className="text-xl" />
              <span className="text-xs mt-1">Profile</span>
            </Link>
            <Link
              to="/settings"
              className={`flex flex-col items-center justify-center w-full h-full ${
                location.pathname === '/settings' ? 'text-blue-500' : 'text-gray-400'
              }`}
            >
              <FiSettings className="text-xl" />
              <span className="text-xs mt-1">Settings</span>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard; 