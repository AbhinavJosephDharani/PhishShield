import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import GlitchText from '../components/GlitchText';

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <GlitchText className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Protect Your Digital Identity
            </GlitchText>
            <p className="text-xl md:text-2xl text-white mb-8">
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
                className="px-8 py-3 border border-white/10 text-white rounded-md font-medium hover:bg-white/5 transition-colors"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg border border-white/10 text-center">
              <h3 className="text-xl font-semibold mb-4 text-blue-400">Real-time Detection</h3>
              <p className="text-white">
                Advanced algorithms constantly monitor for phishing attempts and suspicious activities.
              </p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 text-center">
              <h3 className="text-xl font-semibold mb-4 text-purple-400">Smart Protection</h3>
              <p className="text-white">
                Machine learning models adapt to new threats and attack patterns automatically.
              </p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 text-center">
              <h3 className="text-xl font-semibold mb-4 text-pink-400">Instant Alerts</h3>
              <p className="text-white">
                Get immediate notifications when suspicious activities are detected.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <GlitchText className="text-3xl font-bold mb-6">
              Ready to Secure Your Digital Presence?
            </GlitchText>
            <p className="text-xl text-white mb-8">
              Join thousands of users who trust PhishShield for their cybersecurity needs.
            </p>
            <Link
              to="/register"
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
} 