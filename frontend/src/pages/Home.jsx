import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '../components/Logo';
import ScrollContainer from '../components/ScrollContainer';
import { FiShield, FiBrain, FiTrendingUp, FiAward } from 'react-icons/fi';

const features = [
  {
    icon: FiShield,
    title: "AI-Powered Protection",
    description: "Advanced machine learning algorithms create realistic phishing simulations for better training."
  },
  {
    icon: FiBrain,
    title: "Adaptive Learning",
    description: "Personalized training paths that adjust to your knowledge level and learning speed."
  },
  {
    icon: FiTrendingUp,
    title: "Real-time Analytics",
    description: "Comprehensive insights into your organization's security awareness progress."
  },
  {
    icon: FiAward,
    title: "Certification",
    description: "Earn industry-recognized certifications as you complete training modules."
  }
];

const testimonials = [
  {
    text: "PhishShield has transformed how we approach security awareness training.",
    author: "Sarah Chen",
    role: "CTO, TechCorp"
  },
  {
    text: "The AI-generated scenarios are incredibly realistic and educational.",
    author: "Michael Rodriguez",
    role: "Security Manager, SecureNet"
  }
];

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollContainer>
      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="relative min-h-screen flex items-center justify-center p-4">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="w-48 h-48 mx-auto mb-8">
                <Logo 
                  style={{
                    transform: 'scale(1.2)',
                    transition: 'all 0.3s ease'
                  }}
                  params={{
                    patternScale: 1.2,
                    refraction: 0.035,
                    edge: 0.98,
                    patternBlur: 0.006,
                    liquid: 0.15,
                    speed: 0.35
                  }}
                />
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6">
                Secure Your Team with
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text"> AI-Powered</span> Training
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                PhishShield uses advanced AI to create realistic phishing simulations,
                helping your team identify and prevent cyber threats effectively.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/register"
                  className="px-8 py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
                >
                  Start Free Trial
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-4 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors duration-200"
                >
                  Sign In
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20 bg-black/30 backdrop-blur-xl">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-white mb-12">
              Why Choose PhishShield?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10"
                >
                  <feature.icon className="w-8 h-8 text-blue-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="py-20">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-white mb-12">
              What Our Users Say
            </h2>
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="text-center"
            >
              <p className="text-xl text-gray-300 mb-6">
                "{testimonials[currentTestimonial].text}"
              </p>
              <p className="text-white font-medium">
                {testimonials[currentTestimonial].author}
              </p>
              <p className="text-gray-400">
                {testimonials[currentTestimonial].role}
              </p>
            </motion.div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-20 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-xl">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Strengthen Your Security?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of organizations using PhishShield to protect their teams.
            </p>
            <Link
              to="/register"
              className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </div>
    </ScrollContainer>
  );
} 