import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiBook, FiUser, FiSettings, FiChevronLeft, FiChevronRight, FiLogOut } from 'react-icons/fi';

const Sidebar = ({ onLogout }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', icon: FiHome, label: 'Home' },
    { path: '/simulation', icon: FiBook, label: 'Training' },
    { path: '/profile', icon: FiUser, label: 'Profile' },
    { path: '/settings', icon: FiSettings, label: 'Settings' }
  ];

  return (
    <div className={`fixed left-0 top-0 h-screen bg-gray-800/50 backdrop-blur-sm border-r border-gray-700 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Collapse Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center text-gray-300 hover:bg-gray-600 transition-colors"
      >
        {isCollapsed ? <FiChevronRight size={16} /> : <FiChevronLeft size={16} />}
      </button>

      {/* Logo */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
            PS
          </div>
          {!isCollapsed && (
            <span className="text-white font-semibold">PhishShield</span>
          )}
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-500/20 text-blue-400'
                  : 'text-gray-300 hover:bg-gray-700/50'
              }`}
            >
              <Icon size={20} />
              {!isCollapsed && (
                <span className="font-medium">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
        <button
          onClick={onLogout}
          className="flex items-center gap-3 p-3 rounded-lg text-gray-300 hover:bg-gray-700/50 w-full transition-colors"
        >
          <FiLogOut size={20} />
          {!isCollapsed && (
            <span className="font-medium">Logout</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar; 