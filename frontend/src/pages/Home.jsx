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
            <GlitchText className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white">
              Protect Your Digital Identity
            </GlitchText>
            <p className="text-xl md:text-2xl text-white mb-8">
              Advanced phishing protection powered by machine learning and real-time threat detection.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                to="/register"
                className="px-8 py-3 bg-white/10 text-white rounded-md font-medium hover:bg-white/20 transition-colors"
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
              <h3 className="text-xl font-semibold mb-4 text-white">Real-time Detection</h3>
              <p className="text-white">
                Advanced algorithms constantly monitor for phishing attempts and suspicious activities.
              </p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 text-center">
              <h3 className="text-xl font-semibold mb-4 text-white">Smart Protection</h3>
              <p className="text-white">
                Machine learning models adapt to new threats and attack patterns automatically.
              </p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 text-center">
              <h3 className="text-xl font-semibold mb-4 text-white">Instant Alerts</h3>
              <p className="text-white">
                Get immediate notifications when suspicious activities are detected.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">99.9%</div>
              <p className="text-white/80">Detection Rate</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">500K+</div>
              <p className="text-white/80">Protected Users</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <p className="text-white/80">Active Monitoring</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">1M+</div>
              <p className="text-white/80">Threats Blocked</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <GlitchText className="text-3xl font-bold mb-12 text-white text-center">
              How PhishShield Works
            </GlitchText>
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-full md:w-1/2">
                  <h3 className="text-2xl font-semibold mb-4 text-white">1. Advanced Detection</h3>
                  <p className="text-white/80">
                    Our AI-powered system analyzes multiple data points in real-time to identify potential threats before they reach you.
                  </p>
                </div>
                <div className="w-full md:w-1/2 h-48 bg-white/5 rounded-lg"></div>
              </div>
              <div className="flex flex-col md:flex-row-reverse items-center gap-8">
                <div className="w-full md:w-1/2">
                  <h3 className="text-2xl font-semibold mb-4 text-white">2. Instant Protection</h3>
                  <p className="text-white/80">
                    When a threat is detected, our system automatically blocks it and notifies you immediately through multiple channels.
                  </p>
                </div>
                <div className="w-full md:w-1/2 h-48 bg-white/5 rounded-lg"></div>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-full md:w-1/2">
                  <h3 className="text-2xl font-semibold mb-4 text-white">3. Continuous Learning</h3>
                  <p className="text-white/80">
                    Our machine learning models continuously adapt to new threats, ensuring you're protected against the latest attack vectors.
                  </p>
                </div>
                <div className="w-full md:w-1/2 h-48 bg-white/5 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <GlitchText className="text-3xl font-bold mb-12 text-white text-center">
            What Our Users Say
          </GlitchText>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="p-6 rounded-lg border border-white/10">
              <p className="text-white/80 mb-4">
                "PhishShield has completely transformed how we handle cybersecurity. The real-time protection is invaluable."
              </p>
              <div className="text-white font-medium">- Security Director at Fortune 500</div>
            </div>
            <div className="p-6 rounded-lg border border-white/10">
              <p className="text-white/80 mb-4">
                "The automated threat detection has saved us countless hours and prevented numerous potential breaches."
              </p>
              <div className="text-white font-medium">- IT Manager at Tech Startup</div>
            </div>
            <div className="p-6 rounded-lg border border-white/10">
              <p className="text-white/80 mb-4">
                "Easy to implement and even easier to use. PhishShield is now an essential part of our security stack."
              </p>
              <div className="text-white font-medium">- CTO at E-commerce Platform</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <GlitchText className="text-3xl font-bold mb-6 text-white">
              Ready to Secure Your Digital Presence?
            </GlitchText>
            <p className="text-xl text-white mb-8">
              Join thousands of users who trust PhishShield for their cybersecurity needs.
            </p>
            <Link
              to="/register"
              className="inline-block px-8 py-3 bg-white/10 text-white rounded-md font-medium hover:bg-white/20 transition-colors"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
} 