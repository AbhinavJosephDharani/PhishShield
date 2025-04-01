import { Link } from 'react-router-dom';
import { FiLogIn, FiUserPlus } from 'react-icons/fi';
import ScrollContainer from '../components/ScrollContainer';
import AnimatedBackground from '../components/AnimatedBackground';

function Home() {
  return (
    <>
      <AnimatedBackground />
      <ScrollContainer>
        {/* Navigation Bar */}
        <nav className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-md z-50 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                  PhishShield
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="flex items-center px-4 py-2 text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:via-purple-500 hover:to-pink-500 transition-all duration-300"
                >
                  <FiLogIn className="mr-2" />
                  Login
                </Link>
                <Link
                  to="/register"
                  className="flex items-center px-4 py-2 bg-black text-white rounded-lg border border-transparent hover:border-white/10 hover:bg-gradient-to-r hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 transition-all duration-300"
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
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
              Protect Your Organization with
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"> PhishShield</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Empowering your team with advanced cybersecurity training to combat phishing threats
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/register"
                className="px-8 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-lg hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] backdrop-blur-sm"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="px-8 py-3 bg-black border border-white/10 text-white rounded-lg hover:bg-black/50 hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20 bg-black/40 backdrop-blur-sm border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mb-4">
                Why Choose PhishShield?
              </h2>
              <p className="text-gray-400">
                Comprehensive cybersecurity training for your entire organization
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-black/40 rounded-lg border border-white/5 hover:border-white/10 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]">
                <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
                  Interactive Training
                </h3>
                <p className="text-gray-400">
                  Real-world phishing simulations to test and improve your team's awareness
                </p>
              </div>
              <div className="p-6 bg-black/40 rounded-lg border border-white/5 hover:border-white/10 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]">
                <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-4">
                  Progress Tracking
                </h3>
                <p className="text-gray-400">
                  Detailed analytics and progress reports for individuals and teams
                </p>
              </div>
              <div className="p-6 bg-black/40 rounded-lg border border-white/5 hover:border-white/10 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]">
                <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-500 mb-4">
                  Customizable Content
                </h3>
                <p className="text-gray-400">
                  Tailored training modules to match your organization's needs
                </p>
              </div>
            </div>
          </div>
        </div>
      </ScrollContainer>
    </>
  );
}

export default Home; 