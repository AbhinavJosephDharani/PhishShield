import { Link, useLocation } from 'react-router-dom';
import { FiLogIn, FiUserPlus, FiHome, FiBook, FiShield, FiAward, FiHelpCircle, FiGithub, FiTwitter } from 'react-icons/fi';

function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-black/80 backdrop-blur-md border-r border-white/5 z-50 transform transition-transform duration-200 ease-in-out">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-6">
          <Link to="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            PhishShield
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4">
          <div className="space-y-2">
            <Link 
              to="/" 
              className={`flex items-center px-4 py-2.5 rounded-lg transition-all duration-200 ${
                location.pathname === '/' 
                  ? 'text-white bg-white/5' 
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <FiHome className="w-5 h-5 mr-3" />
              Home
            </Link>
            <Link 
              to="/features" 
              className={`flex items-center px-4 py-2.5 rounded-lg transition-all duration-200 ${
                location.pathname === '/features' 
                  ? 'text-white bg-white/5' 
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <FiShield className="w-5 h-5 mr-3" />
              Features
            </Link>
            <Link 
              to="/training" 
              className={`flex items-center px-4 py-2.5 rounded-lg transition-all duration-200 ${
                location.pathname === '/training' 
                  ? 'text-white bg-white/5' 
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <FiBook className="w-5 h-5 mr-3" />
              Training
            </Link>
            <Link 
              to="/achievements" 
              className={`flex items-center px-4 py-2.5 rounded-lg transition-all duration-200 ${
                location.pathname === '/achievements' 
                  ? 'text-white bg-white/5' 
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <FiAward className="w-5 h-5 mr-3" />
              Achievements
            </Link>
            <Link 
              to="/help" 
              className={`flex items-center px-4 py-2.5 rounded-lg transition-all duration-200 ${
                location.pathname === '/help' 
                  ? 'text-white bg-white/5' 
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <FiHelpCircle className="w-5 h-5 mr-3" />
              Help & Support
            </Link>
          </div>
        </nav>

        {/* Social Links */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center justify-center space-x-4">
            <a href="https://github.com/AbhinavJosephDharani/PhishShield" target="_blank" rel="noopener noreferrer" 
              className="text-white/80 hover:text-white transition-colors duration-200">
              <FiGithub className="w-5 h-5" />
            </a>
            <a href="#" className="text-white/80 hover:text-white transition-colors duration-200">
              <FiTwitter className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Auth Buttons */}
        <div className="p-4 space-y-2">
          <Link
            to="/login"
            className={`flex items-center justify-center w-full px-4 py-2 rounded-lg transition-all duration-200 ${
              location.pathname === '/login'
                ? 'text-white bg-white/5'
                : 'text-white hover:bg-white/10'
            }`}
          >
            <FiLogIn className="mr-2" />
            Login
          </Link>
          <Link
            to="/register"
            className={`flex items-center justify-center w-full px-4 py-2 text-white rounded-lg transition-all duration-200 ${
              location.pathname === '/register'
                ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600'
                : 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600'
            }`}
          >
            <FiUserPlus className="mr-2" />
            Sign Up
          </Link>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar; 