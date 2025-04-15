import { FiShield, FiTarget, FiUsers } from 'react-icons/fi';
import { GlowOnHover } from '../components/ui/GlowOnHover';
import GlitchText from '../components/GlitchText';

const About = () => {
  const sections = [
    {
      title: 'Our Mission',
      content: 'PhishShield is dedicated to empowering individuals and organizations with the knowledge and tools needed to defend against phishing attacks. Through interactive training and real-world simulations, we help create a more secure digital environment for everyone.',
      icon: <FiShield className="w-8 h-8" />
    },
    {
      title: 'What We Do',
      content: 'We provide comprehensive phishing awareness training through interactive simulations, educational resources, and real-time feedback. Our platform helps users identify and respond to various types of phishing attempts, from basic email scams to sophisticated social engineering attacks.',
      icon: <FiTarget className="w-8 h-8" />
    },
    {
      title: 'Who We Serve',
      content: 'Our platform is designed for individuals, teams, and organizations of all sizes. Whether you\'re an individual looking to improve your security awareness or an organization seeking to protect your employees, PhishShield has the tools and resources you need.',
      icon: <FiUsers className="w-8 h-8" />
    }
  ];

  const stats = [
    { label: 'Active Users', value: '1,000+' },
    { label: 'Phishing Attempts Identified', value: '50,000+' },
    { label: 'Success Rate', value: '92%' }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <GlitchText className="text-4xl font-bold mb-4">
            About PhishShield
          </GlitchText>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Your first line of defense against phishing attacks
          </p>
        </div>

        {/* Main sections */}
        <div className="space-y-8 mb-16">
          {sections.map((section, index) => (
            <GlowOnHover key={index}>
              <div className="p-8">
                <div className="flex items-start">
                  <div className="p-4 rounded-full bg-white/5 mr-6">
                    {section.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4">{section.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{section.content}</p>
                  </div>
                </div>
              </div>
            </GlowOnHover>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <GlowOnHover key={index}>
              <div className="p-6 text-center">
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            </GlowOnHover>
          ))}
        </div>

        {/* Call to Action */}
        <GlowOnHover>
          <div className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to strengthen your security?</h3>
            <p className="text-gray-400 mb-6">
              Join PhishShield today and take the first step towards better security awareness.
            </p>
            <button className="px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors">
              Get Started
            </button>
          </div>
        </GlowOnHover>
      </div>
    </div>
  );
};

export default About; 