import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import GlitchText from '../components/GlitchText';
import { FiHome, FiShield, FiSettings, FiUser } from 'react-icons/fi';
import PhishingSimulation from './PhishingSimulation';
import Sidebar from '../components/ui/Sidebar';
import { FiAlertCircle, FiUsers, FiTrendingUp } from 'react-icons/fi';

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

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

  const stats = [
    { title: 'Total Simulations', value: '24', icon: FiShield, change: '+12%' },
    { title: 'Active Users', value: '156', icon: FiUsers, change: '+8%' },
    { title: 'Threats Detected', value: '48', icon: FiAlertCircle, change: '-5%' },
    { title: 'Success Rate', value: '92%', icon: FiTrendingUp, change: '+3%' }
  ];

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
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">{stat.title}</p>
                      <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <stat.icon className="text-blue-400" size={24} />
                    </div>
                  </div>
                  <p className="text-green-400 text-sm mt-4">{stat.change} from last month</p>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {/* Add your recent activity items here */}
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
    <div className="min-h-screen bg-gray-900 text-white">
      <Sidebar />
      
      {/* Main Content */}
      <main className={`transition-all duration-300 ${
        isSidebarCollapsed ? 'ml-16' : 'ml-64'
      }`}>
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
          
          {renderContent()}
        </div>
      </main>
      
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
    </div>
  );
}

export default Dashboard; 