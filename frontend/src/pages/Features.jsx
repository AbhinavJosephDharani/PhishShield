import { FiShield, FiTarget, FiBriefcase, FiUsers, FiAward, FiTrendingUp } from 'react-icons/fi';
import { GlowOnHover } from '../components/ui/GlowOnHover';
import GlitchText from '../components/GlitchText';

const Features = () => {
  const features = [
    {
      title: 'Interactive Phishing Simulations',
      description: 'Experience real-world phishing scenarios in a safe environment. Learn to identify and respond to various types of phishing attempts.',
      icon: <FiTarget className="w-6 h-6" />,
      comingSoon: false
    },
    {
      title: 'Security Awareness Training',
      description: 'Comprehensive training modules covering email security, social engineering, and best practices for digital safety.',
      icon: <FiBriefcase className="w-6 h-6" />,
      comingSoon: false
    },
    {
      title: 'Progress Tracking',
      description: 'Monitor your security awareness journey with detailed progress tracking and performance metrics.',
      icon: <FiTrendingUp className="w-6 h-6" />,
      comingSoon: false
    },
    {
      title: 'Team Management',
      description: 'Organize and track security training for your entire team. Get insights into team performance and areas for improvement.',
      icon: <FiUsers className="w-6 h-6" />,
      comingSoon: true
    },
    {
      title: 'Custom Simulations',
      description: 'Create tailored phishing simulations specific to your organization\'s needs and threats.',
      icon: <FiShield className="w-6 h-6" />,
      comingSoon: true
    },
    {
      title: 'Certification Program',
      description: 'Earn certificates as you complete training modules and demonstrate your security awareness expertise.',
      icon: <FiAward className="w-6 h-6" />,
      comingSoon: true
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <GlitchText className="text-4xl font-bold mb-4">
            Features
          </GlitchText>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover the powerful tools and features that make PhishShield your ultimate defense against phishing attacks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <GlowOnHover key={index}>
              <div className="p-6 h-full">
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-4">
                    <div className="p-3 rounded-full bg-white/5">
                      {feature.icon}
                    </div>
                    {feature.comingSoon && (
                      <span className="ml-3 text-xs font-medium px-2 py-1 rounded-full bg-blue-500/10 text-blue-400">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-400 flex-grow">{feature.description}</p>
                </div>
              </div>
            </GlowOnHover>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features; 