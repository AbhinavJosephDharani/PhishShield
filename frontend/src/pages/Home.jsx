import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import GlitchText from '../components/GlitchText';

export default function Home() {
  return (
    <Layout>
      <div className="relative">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <GlitchText className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                Protect Your Digital Identity
              </GlitchText>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Advanced phishing protection powered by machine learning and real-time threat detection.
              </p>
              <div className="flex justify-center gap-4">
                <Link
                  to="/register"
                  className="px-8 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-3 bg-gray-800 text-white rounded-md font-medium hover:bg-gray-700 transition-colors"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-900/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700">
                <h3 className="text-xl font-semibold mb-4 text-blue-400">Real-time Detection</h3>
                <p className="text-gray-300">
                  Advanced algorithms constantly monitor for phishing attempts and suspicious activities.
                </p>
              </div>
              <div className="p-6 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700">
                <h3 className="text-xl font-semibold mb-4 text-purple-400">Smart Protection</h3>
                <p className="text-gray-300">
                  Machine learning models adapt to new threats and attack patterns automatically.
                </p>
              </div>
              <div className="p-6 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700">
                <h3 className="text-xl font-semibold mb-4 text-pink-400">Instant Alerts</h3>
                <p className="text-gray-300">
                  Get immediate notifications when suspicious activities are detected.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <GlitchText className="text-3xl font-bold mb-6">
              Ready to Secure Your Digital Presence?
            </GlitchText>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust PhishShield for their cybersecurity needs.
            </p>
            <Link
              to="/register"
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              Start Free Trial
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
} 