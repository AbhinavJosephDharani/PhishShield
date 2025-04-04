import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import GlitchText from '../components/GlitchText';

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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

  return (
    <Layout>
      <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
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
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Start Training
              </button>
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
      </div>
    </Layout>
  );
}

export default Dashboard; 