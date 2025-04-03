import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Scene3D from '../components/Scene3D';
import Sidebar from '../components/Sidebar';

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
    <div className="min-h-screen w-screen overflow-x-hidden">
      <Scene3D />
      <Sidebar />

      {/* Main Content */}
      <div className="relative w-full pl-64">
        {/* Navigation Bar */}
        <nav className="fixed top-0 left-64 right-0 bg-black/80 backdrop-blur-md z-50 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-end h-16">
              <div className="flex items-center space-x-4">
                <span className="text-gray-300">Welcome, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-black text-white rounded-lg border border-transparent hover:border-white/10 hover:bg-gradient-to-r hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 transition-all duration-300"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/10">
            <h1 className="text-3xl font-bold text-white mb-6">Dashboard</h1>
            
            {/* Training Progress */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-black/40 rounded-lg p-6 border border-white/5">
                <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
                  Training Progress
                </h3>
                <p className="text-gray-300">Coming soon...</p>
              </div>
              
              <div className="bg-black/40 rounded-lg p-6 border border-white/5">
                <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-2">
                  Recent Activities
                </h3>
                <p className="text-gray-300">Coming soon...</p>
              </div>
              
              <div className="bg-black/40 rounded-lg p-6 border border-white/5">
                <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-500 mb-2">
                  Security Score
                </h3>
                <p className="text-gray-300">Coming soon...</p>
              </div>
            </div>

            {/* Available Training */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Available Training</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-black/40 rounded-lg p-6 border border-white/5 hover:border-white/10 transition-all duration-300">
                  <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
                    Phishing Awareness
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Learn to identify and avoid phishing attempts in emails and messages.
                  </p>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                    Start Training
                  </button>
                </div>

                <div className="bg-black/40 rounded-lg p-6 border border-white/5 hover:border-white/10 transition-all duration-300">
                  <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-2">
                    Social Engineering
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Understand and protect against social engineering tactics.
                  </p>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                    Start Training
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 