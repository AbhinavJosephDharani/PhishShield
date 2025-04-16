import { useState } from 'react';
import { FiMail, FiShield, FiAward, FiClock } from 'react-icons/fi';
import { GlowOnHover } from '../components/ui/GlowOnHover';
import GlitchText from '../components/GlitchText';
import { useNavigate } from 'react-router-dom';

const PhishingSimulation = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const navigate = useNavigate();

  const handleStartSimulation = (simulationId) => {
    navigate(`/simulation/${simulationId}`);
  };

  const difficulties = [
    {
      level: 'easy',
      title: 'Beginner',
      description: 'Learn the basics of identifying phishing attempts through simple scenarios.',
      icon: <FiMail className="w-6 h-6" />,
      color: 'text-green-400',
      simulations: [
        {
          id: 'easy-1',
          title: 'Basic Email Verification',
          description: 'Learn to identify suspicious sender addresses and basic email red flags.',
          duration: '5-10 mins',
          completed: false,
          locked: false
        },
        {
          id: 'easy-2',
          title: 'URL Analysis',
          description: 'Practice identifying suspicious URLs and fake website addresses.',
          duration: '5-10 mins',
          completed: false,
          locked: false
        },
        {
          id: 'easy-3',
          title: 'Grammar and Spelling',
          description: 'Spot common linguistic red flags in phishing attempts.',
          duration: '5-10 mins',
          completed: false,
          locked: false
        },
        {
          id: 'easy-4',
          title: 'Attachment Safety',
          description: 'Learn to identify suspicious email attachments and file types.',
          duration: '5-10 mins',
          completed: false,
          locked: false
        },
        {
          id: 'easy-5',
          title: 'Sender Verification',
          description: 'Practice verifying email sender authenticity.',
          duration: '5-10 mins',
          completed: false,
          locked: false
        },
        {
          id: 'easy-6',
          title: 'Basic Social Engineering',
          description: 'Identify basic social engineering attempts in emails.',
          duration: '5-10 mins',
          completed: false,
          locked: false
        },
        {
          id: 'easy-7',
          title: 'Email Header Analysis',
          description: 'Learn to analyze email headers for signs of spoofing.',
          duration: '5-10 mins',
          completed: false,
          locked: false
        },
        {
          id: 'easy-8',
          title: 'Link Safety',
          description: 'Practice safe clicking habits and link verification.',
          duration: '5-10 mins',
          completed: false,
          locked: false
        },
        {
          id: 'easy-9',
          title: 'Basic Phishing Patterns',
          description: 'Recognize common patterns in phishing attempts.',
          duration: '5-10 mins',
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 'moderate',
      title: 'Intermediate',
      description: 'Face more sophisticated phishing attempts with subtle deception techniques.',
      icon: <FiShield className="w-6 h-6" />,
      color: 'text-yellow-400',
      simulations: [
        {
          id: 'moderate-1',
          title: 'Social Engineering Tactics',
          description: 'Learn to identify manipulation techniques in communications.',
          duration: '10-15 mins',
          completed: false,
          locked: false
        },
        {
          id: 'moderate-2',
          title: 'Business Email Compromise',
          description: 'Identify sophisticated business email compromise attempts.',
          duration: '10-15 mins',
          completed: false,
          locked: false
        },
        {
          id: 'moderate-3',
          title: 'Spear Phishing Defense',
          description: 'Protect against targeted phishing attempts using public information.',
          duration: '10-15 mins',
          completed: false,
          locked: false
        },
        {
          id: 'moderate-4',
          title: 'Advanced URL Analysis',
          description: 'Identify sophisticated URL manipulation techniques.',
          duration: '10-15 mins',
          completed: false,
          locked: false
        },
        {
          id: 'moderate-5',
          title: 'Domain Spoofing',
          description: 'Learn to detect domain spoofing and lookalike domains.',
          duration: '10-15 mins',
          completed: false,
          locked: false
        },
        {
          id: 'moderate-6',
          title: 'Multi-Stage Attacks',
          description: 'Identify complex phishing campaigns with multiple stages.',
          duration: '10-15 mins',
          completed: false,
          locked: false
        },
        {
          id: 'moderate-7',
          title: 'Brand Impersonation',
          description: 'Spot sophisticated brand impersonation attempts.',
          duration: '10-15 mins',
          completed: false,
          locked: false
        },
        {
          id: 'moderate-8',
          title: 'Advanced Social Engineering',
          description: 'Recognize complex social engineering techniques.',
          duration: '10-15 mins',
          completed: false,
          locked: false
        },
        {
          id: 'moderate-9',
          title: 'Email Authentication',
          description: 'Understand and verify email authentication methods.',
          duration: '10-15 mins',
          completed: false,
          locked: false
        }
      ]
    },
    {
      level: 'hard',
      title: 'Advanced',
      description: 'Challenge yourself with complex, multi-layered phishing scenarios.',
      icon: <FiAward className="w-6 h-6" />,
      color: 'text-red-400',
      simulations: [
        {
          id: 'hard-1',
          title: 'Advanced Social Engineering',
          description: 'Complex scenarios combining multiple deception techniques.',
          duration: '15-20 mins',
          completed: false,
          locked: false
        },
        {
          id: 'hard-2',
          title: 'Zero-Day Threat Response',
          description: 'Handle emerging phishing threats and attack patterns.',
          duration: '15-20 mins',
          completed: false,
          locked: false
        },
        {
          id: 'hard-3',
          title: 'Enterprise Security Challenge',
          description: 'Protect against sophisticated enterprise-level attacks.',
          duration: '15-20 mins',
          completed: false,
          locked: false
        },
        {
          id: 'hard-4',
          title: 'Advanced BEC Attacks',
          description: 'Identify sophisticated Business Email Compromise attempts.',
          duration: '15-20 mins',
          completed: false,
          locked: false
        },
        {
          id: 'hard-5',
          title: 'Whaling Attacks',
          description: 'Protect against executive-targeted phishing attempts.',
          duration: '15-20 mins',
          completed: false,
          locked: false
        },
        {
          id: 'hard-6',
          title: 'Supply Chain Attacks',
          description: 'Identify phishing attempts through supply chain vulnerabilities.',
          duration: '15-20 mins',
          completed: false,
          locked: false
        },
        {
          id: 'hard-7',
          title: 'Advanced Spear Phishing',
          description: 'Handle highly targeted and personalized phishing attempts.',
          duration: '15-20 mins',
          completed: false,
          locked: false
        },
        {
          id: 'hard-8',
          title: 'Multi-Vector Attacks',
          description: 'Identify and respond to attacks using multiple vectors.',
          duration: '15-20 mins',
          completed: false,
          locked: false
        },
        {
          id: 'hard-9',
          title: 'Advanced Threat Analysis',
          description: 'Analyze and respond to sophisticated threat scenarios.',
          duration: '15-20 mins',
          completed: false,
          locked: false
        }
      ]
    }
  ];

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <GlitchText className="text-4xl font-bold mb-4">
            Phishing Simulations
          </GlitchText>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Test and improve your phishing detection skills through interactive scenarios.
            Start with beginner levels and work your way up to advanced challenges.
          </p>
        </div>

        {/* Difficulty Selection */}
        {!selectedDifficulty && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {difficulties.map((difficulty) => (
              <GlowOnHover key={difficulty.level}>
                <button
                  onClick={() => setSelectedDifficulty(difficulty.level)}
                  className="w-full p-6 text-left"
                >
                  <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-full bg-white/5 ${difficulty.color}`}>
                      {difficulty.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{difficulty.title}</h3>
                  <p className="text-gray-400 mb-4">{difficulty.description}</p>
                </button>
              </GlowOnHover>
            ))}
          </div>
        )}

        {/* Simulations List */}
        {selectedDifficulty && (
          <>
            <button
              onClick={() => setSelectedDifficulty(null)}
              className="mb-8 px-4 py-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
            >
              ← Back to Difficulties
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {difficulties
                .find(d => d.level === selectedDifficulty)
                ?.simulations.map((simulation) => (
                  <GlowOnHover key={simulation.id}>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold">{simulation.title}</h3>
                      </div>
                      <p className="text-gray-400 mb-4">{simulation.description}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <FiClock className="mr-2" />
                        <span>{simulation.duration}</span>
                      </div>
                      <button
                        onClick={() => handleStartSimulation(simulation.id)}
                        className="mt-4 w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
                      >
                        Start Simulation
                      </button>
                    </div>
                  </GlowOnHover>
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PhishingSimulation; 