import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiHome, FiShield, FiSettings, FiUser, FiAlertTriangle, FiCheckCircle, FiBarChart2 } from 'react-icons/fi';
import GlitchText from '../components/GlitchText';
import { BackgroundGradient } from '../components/ui/BackgroundGradient';
import { Sidebar } from '../components/ui/Sidebar';
import { FloatingNav } from '../components/ui/FloatingNav';

function Dashboard() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const stats = [
    {
      title: 'Total Simulations',
      value: '12',
      icon: <FiShield className="w-6 h-6" />,
      change: '+2 this week'
    },
    {
      title: 'Active Users',
      value: '24',
      icon: <FiUser className="w-6 h-6" />,
      change: '+5 this month'
    },
    {
      title: 'Threats Detected',
      value: '156',
      icon: <FiAlertTriangle className="w-6 h-6" />,
      change: '-12% this week'
    },
    {
      title: 'Success Rate',
      value: '92%',
      icon: <FiCheckCircle className="w-6 h-6" />,
      change: '+3% this month'
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

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <BackgroundGradient key={index} className="rounded-xl">
                  <div className="bg-[#1a1a1a] p-6 rounded-xl h-full">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-200">{stat.title}</p>
                        <p className="text-2xl font-bold mt-1">{stat.value}</p>
                        <p className="text-xs text-gray-300 mt-2">{stat.change}</p>
                      </div>
                      <div className="p-3 rounded-full bg-white/5">
                        {stat.icon}
                      </div>
                    </div>
                  </div>
                </BackgroundGradient>
              ))}
            </div>

            {/* Training Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <BackgroundGradient className="rounded-xl">
                <div className="bg-[#1a1a1a] p-6 rounded-xl h-full">
                  <h3 className="text-xl font-bold mb-4">Phishing Awareness Training</h3>
                  <p className="text-gray-200 mb-6">
                    Complete our interactive phishing simulation to test your knowledge and improve your security awareness.
                  </p>
                  <Link
                    to="/simulation"
                    className="inline-flex items-center px-4 py-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    Start Training
                    <FiShield className="ml-2" />
                  </Link>
                </div>
              </BackgroundGradient>

              <BackgroundGradient className="rounded-xl">
                <div className="bg-[#1a1a1a] p-6 rounded-xl h-full">
                  <h3 className="text-xl font-bold mb-4">Security Score</h3>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl font-bold">85%</div>
                    <div className="text-sm text-gray-200">Good</div>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-2 mb-4">
                    <div className="bg-white/20 h-2 rounded-full" style={{ width: '85%' }}></div>
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
                  <BackgroundGradient key={index} className="rounded-xl">
                    <div className="bg-[#1a1a1a] p-4 rounded-xl">
                      <div className="flex items-start">
                        <div className="p-2 rounded-full bg-white/5 mr-4">
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
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard; 