import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import GlitchText from '../components/GlitchText';
import { FiHome, FiShield, FiSettings, FiUser, FiAlertTriangle, FiCheckCircle, FiBarChart2 } from 'react-icons/fi';
import PhishingSimulation from './PhishingSimulation';
import Sidebar from '../components/ui/Sidebar';
import { BackgroundGradient } from '../components/ui/BackgroundGradient';
import { FloatingNav } from '../components/ui/FloatingNav';

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
    {
      title: 'Total Simulations',
      value: '12',
      icon: <FiShield className="w-6 h-6" />,
      change: '+2 this week',
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      title: 'Active Users',
      value: '24',
      icon: <FiUser className="w-6 h-6" />,
      change: '+5 this month',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      title: 'Threats Detected',
      value: '156',
      icon: <FiAlertTriangle className="w-6 h-6" />,
      change: '-12% this week',
      gradient: 'from-red-500 to-orange-600'
    },
    {
      title: 'Success Rate',
      value: '92%',
      icon: <FiCheckCircle className="w-6 h-6" />,
      change: '+3% this month',
      gradient: 'from-green-500 to-emerald-600'
    }
  ];

  const recentActivity = [
    {
      title: 'Completed Phishing Simulation',
      description: 'Successfully identified 8/10 phishing indicators',
      time: '2 hours ago',
      icon: <FiShield className="w-5 h-5" />
    },
    {
      title: 'New Training Module',
      description: 'Advanced Email Security course completed',
      time: '1 day ago',
      icon: <FiCheckCircle className="w-5 h-5" />
    },
    {
      title: 'Security Score Update',
      description: 'Your security awareness score increased by 5 points',
      time: '2 days ago',
      icon: <FiBarChart2 className="w-5 h-5" />
    }
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
                <BackgroundGradient key={index} className="rounded-xl overflow-hidden">
                  <div className="p-6 bg-gray-800/50 backdrop-blur-sm h-full">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-200">{stat.title}</p>
                        <p className="text-2xl font-bold mt-1">{stat.value}</p>
                        <p className="text-xs text-gray-300 mt-2">{stat.change}</p>
                      </div>
                      <div className="p-3 rounded-full bg-white/10">
                        {stat.icon}
                      </div>
                    </div>
                  </div>
                </BackgroundGradient>
              ))}
            </div>

            {/* Training Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <BackgroundGradient className="rounded-xl overflow-hidden">
                <div className="p-6 bg-gray-800/50 backdrop-blur-sm h-full">
                  <h3 className="text-xl font-bold mb-4">Phishing Awareness Training</h3>
                  <p className="text-gray-200 mb-6">
                    Complete our interactive phishing simulation to test your knowledge and improve your security awareness.
                  </p>
                  <Link
                    to="/simulation"
                    className="inline-flex items-center px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    Start Training
                    <FiShield className="ml-2" />
                  </Link>
                </div>
              </BackgroundGradient>

              <BackgroundGradient className="rounded-xl overflow-hidden">
                <div className="p-6 bg-gray-800/50 backdrop-blur-sm h-full">
                  <h3 className="text-xl font-bold mb-4">Security Score</h3>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl font-bold">85%</div>
                    <div className="text-sm text-gray-200">Good</div>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2 mb-4">
                    <div className="bg-white h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <p className="text-sm text-gray-200">
                    Your security awareness is above average. Keep up the good work!
                  </p>
                </div>
              </BackgroundGradient>
            </div>

            {/* Recent Activity */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <BackgroundGradient key={index} className="rounded-xl overflow-hidden">
                    <div className="p-4 bg-gray-800/50 backdrop-blur-sm">
                      <div className="flex items-start">
                        <div className="p-2 rounded-full bg-white/10 mr-4">
                          {activity.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{activity.title}</h4>
                          <p className="text-sm text-gray-400">{activity.description}</p>
                          <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    </div>
                  </BackgroundGradient>
                ))}
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
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <FloatingNav />
      <div className="flex">
        <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
        
        <main className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
          <div className="p-8">
            <div className="mb-8">
              <GlitchText className="text-3xl font-bold">
                Dashboard
              </GlitchText>
              <p className="text-gray-400 mt-2">Welcome back! Here's your security overview.</p>
            </div>

            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard; 