import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import GlitchText from '../components/GlitchText';
import { FloatingNav } from '../components/ui/FloatingNav';
import Aurora from '../components/ui/Aurora';

function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Aurora />
      <FloatingNav />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="max-w-4xl mx-auto text-center">
          <GlitchText className="text-5xl md:text-6xl font-bold mb-6">
            PhishShield
          </GlitchText>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Your comprehensive solution for phishing awareness and prevention
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Get Started
              <FiArrowRight className="ml-2" />
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-600 text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home; 