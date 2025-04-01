import { Link } from 'react-router-dom';
import { FiLogIn, FiUserPlus } from 'react-icons/fi';
import ScrollContainer from '../components/ScrollContainer';

function Home() {
  return (
    <ScrollContainer>
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-black/50 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-white">
                PhishShield
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="flex items-center px-4 py-2 text-white hover:text-blue-400 transition-colors"
              >
                <FiLogIn className="mr-2" />
                Login
              </Link>
              <Link
                to="/register"
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FiUserPlus className="mr-2" />
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
            Protect Your Organization with
            <span className="text-blue-500"> PhishShield</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Empowering your team with advanced cybersecurity training to combat phishing threats
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/register"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="px-8 py-3 border border-white text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Why Choose PhishShield?
            </h2>
            <p className="text-gray-300">
              Comprehensive cybersecurity training for your entire organization
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-black/20 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-4">
                Interactive Training
              </h3>
              <p className="text-gray-300">
                Real-world phishing simulations to test and improve your team's awareness
              </p>
            </div>
            <div className="p-6 bg-black/20 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-4">
                Progress Tracking
              </h3>
              <p className="text-gray-300">
                Detailed analytics and progress reports for individuals and teams
              </p>
            </div>
            <div className="p-6 bg-black/20 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-4">
                Customizable Content
              </h3>
              <p className="text-gray-300">
                Tailored training modules to match your organization's needs
              </p>
            </div>
          </div>
        </div>
      </div>
    </ScrollContainer>
  );
}

export default Home; 