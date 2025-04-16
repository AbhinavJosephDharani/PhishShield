import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiShield, FiAward, FiClock } from 'react-icons/fi';
import { GlowOnHover } from '../components/ui/GlowOnHover';
import GlitchText from '../components/GlitchText';

const Simulation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

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
          title: 'Package Delivery Scam',
          description: 'Practice identifying suspicious URLs and fake website addresses.',
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
          id: 'intermediate-1',
          title: 'CEO Fraud Attack',
          description: 'Identify sophisticated business email compromise attempts.',
          duration: '10-15 mins',
          completed: false,
          locked: false
        },
        {
          id: 'intermediate-2',
          title: 'Tax Refund Scam',
          description: 'Learn to detect domain spoofing and lookalike domains.',
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
          id: 'advanced-1',
          title: 'Spear Phishing Attack',
          description: 'Complex scenarios combining multiple deception techniques.',
          duration: '15-20 mins',
          completed: false,
          locked: false
        }
      ]
    }
  ];

  const simulationData = {
    'easy-1': {
      title: 'Basic Email Verification',
      difficulty: 'Easy',
      steps: [
        {
          type: 'email',
          content: {
            subject: 'Urgent: Your Account Security',
            sender: 'secure-bank-support@securebank.net.co',
            body: `Dear Valued Customer,

We have detected unusual activity in your account. Your account will be suspended in 24 hours if you don't verify your information immediately.

Click here to verify your account: http://secure-bank.net.co/verify

Best regards,
SecureBank Team`
          },
          questions: [
            {
              id: 1,
              text: 'What is suspicious about the sender\'s email address?',
              options: [
                'The domain uses .co instead of .com',
                'The email looks legitimate',
                'The sender name is too formal'
              ],
              correctAnswer: 0,
              explanation: 'Legitimate banks typically use .com domains. The .co domain is often used in phishing attempts.'
            },
            {
              id: 2,
              text: 'What is suspicious about the email content?',
              options: [
                'The urgent tone and threat of account suspension',
                'The professional formatting',
                'The clear instructions'
              ],
              correctAnswer: 0,
              explanation: 'Phishing emails often create a sense of urgency to pressure victims into acting quickly.'
            }
          ]
        }
      ]
    },
    'easy-2': {
      title: 'Package Delivery Scam',
      difficulty: 'Easy',
      steps: [
        {
          type: 'email',
          content: {
            subject: 'Package Delivery Failed',
            sender: 'delivery@fedex-support.com',
            body: `Hello,

We attempted to deliver your package but were unable to do so. Please click the link below to schedule a new delivery time:

http://fedex-delivery-reschedule.com/package/12345

If you don't respond within 24 hours, your package will be returned to the sender.

FedEx Customer Service`
          },
          questions: [
            {
              id: 1,
              text: 'What is suspicious about the sender\'s email address?',
              options: [
                'The domain is fedex-support.com instead of fedex.com',
                'The email address looks legitimate',
                'The sender name is appropriate'
              ],
              correctAnswer: 0,
              explanation: 'Legitimate companies use their official domain names. Watch out for variations or subdomains.'
            },
            {
              id: 2,
              text: 'What is suspicious about the email content?',
              options: [
                'The link to an unfamiliar website',
                'The professional tone',
                'The clear delivery instructions'
              ],
              correctAnswer: 0,
              explanation: 'Always verify links in emails. Hover over them to see the actual URL before clicking.'
            }
          ]
        }
      ]
    },
    'intermediate-1': {
      title: 'CEO Fraud Attack',
      difficulty: 'Intermediate',
      steps: [
        {
          type: 'email',
          content: {
            subject: 'Urgent: Wire Transfer Request',
            sender: 'ceo@company.com',
            body: `Hi,

I need you to process a wire transfer immediately. I'm in a meeting and can't call right now.

Amount: $25,000
Account: 123456789
Bank: First National Bank
Routing: 987654321

Please complete this as soon as possible and send me the confirmation.

Thanks,
John Smith
CEO`
          },
          questions: [
            {
              id: 1,
              text: 'What makes this email suspicious?',
              options: [
                'The request for immediate action without proper verification',
                'The professional formatting',
                'The clear instructions'
              ],
              correctAnswer: 0,
              explanation: 'Legitimate financial requests should always be verified through proper channels.'
            },
            {
              id: 2,
              text: 'What should you do in this situation?',
              options: [
                'Verify the request through a separate communication channel',
                'Process the transfer immediately',
                'Reply to the email asking for more details'
              ],
              correctAnswer: 0,
              explanation: 'Always verify financial requests through a separate, trusted communication channel.'
            }
          ]
        }
      ]
    },
    'intermediate-2': {
      title: 'Tax Refund Scam',
      difficulty: 'Intermediate',
      steps: [
        {
          type: 'email',
          content: {
            subject: 'Your Tax Refund is Ready',
            sender: 'irs@tax-refund-gov.com',
            body: `Dear Taxpayer,

We are pleased to inform you that your tax refund of $1,250.00 has been processed and is ready for disbursement.

To receive your refund, please click the link below and complete the verification process:
http://tax-refund-gov.com/verify

This is a time-sensitive matter. Your refund will be voided if not claimed within 48 hours.

Sincerely,
IRS Tax Processing Department`
          },
          questions: [
            {
              id: 1,
              text: 'What is suspicious about this email?',
              options: [
                'The sender\'s domain and urgent time limit',
                'The professional formatting',
                'The clear refund amount'
              ],
              correctAnswer: 0,
              explanation: 'The IRS never sends emails about tax refunds and never uses non-.gov domains.'
            },
            {
              id: 2,
              text: 'What should you do if you receive this email?',
              options: [
                'Report it to the IRS and delete it',
                'Click the link to verify your information',
                'Reply asking for more details'
              ],
              correctAnswer: 0,
              explanation: 'Always report suspicious tax-related emails to the IRS and never click on links or provide personal information.'
            }
          ]
        }
      ]
    },
    'advanced-1': {
      title: 'Spear Phishing Attack',
      difficulty: 'Advanced',
      steps: [
        {
          type: 'email',
          content: {
            subject: 'Re: Project Update - Confidential',
            sender: 'jane.smith@company-partner.com',
            body: `Hi Team,

I hope this email finds you well. I wanted to follow up on our recent discussion about the Q4 project deliverables.

Attached is the updated project timeline and budget spreadsheet. Please review and let me know if you have any questions.

Also, I noticed some discrepancies in the financial projections. Could you verify the numbers in the attached document?

Best regards,
Jane Smith
Senior Project Manager
Company Partner Inc.`
          },
          questions: [
            {
              id: 1,
              text: 'What makes this email particularly dangerous?',
              options: [
                'The personalized content and professional tone',
                'The clear subject line',
                'The proper email signature'
              ],
              correctAnswer: 0,
              explanation: 'Spear phishing emails often appear very legitimate with personalized content and professional formatting.'
            },
            {
              id: 2,
              text: 'What should you do before opening the attachment?',
              options: [
                'Verify the sender\'s identity and check the email headers',
                'Open it since it looks professional',
                'Forward it to IT for review'
              ],
              correctAnswer: 0,
              explanation: 'Always verify the sender\'s identity and check email headers for authenticity before opening attachments.'
            }
          ]
        }
      ]
    }
  };

  // If no simulation ID is provided, show the selection interface
  if (!id) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <GlitchText text="Phishing Simulation" className="text-4xl font-bold mb-4" />
            <p className="text-gray-400 max-w-2xl mx-auto">
              Test your ability to identify phishing attempts through realistic scenarios.
              Start with beginner levels and progress to more challenging simulations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {difficulties.map((difficulty) => (
              <motion.div
                key={difficulty.level}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-[#1a1a1a] rounded-lg p-6 border border-gray-800 ${
                  selectedDifficulty === difficulty.level ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <div className={`flex items-center mb-4 ${difficulty.color}`}>
                  {difficulty.icon}
                  <h3 className="text-xl font-semibold ml-2">{difficulty.title}</h3>
                </div>
                <p className="text-gray-400 mb-6">{difficulty.description}</p>
                <div className="space-y-4">
                  {difficulty.simulations.map((simulation) => (
                    <GlowOnHover key={simulation.id}>
                      <button
                        onClick={() => handleStartSimulation(simulation.id)}
                        disabled={simulation.locked}
                        className={`w-full p-4 text-left rounded-lg transition-colors ${
                          simulation.locked
                            ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                            : 'bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">{simulation.title}</h4>
                            <p className="text-sm text-gray-400">{simulation.description}</p>
                          </div>
                          {simulation.locked && (
                            <svg
                              className="w-5 h-5 text-gray-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                              />
                            </svg>
                          )}
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-400">
                          <FiClock className="mr-1" />
                          <span>{simulation.duration}</span>
                        </div>
                      </button>
                    </GlowOnHover>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // If a simulation ID is provided, show the actual simulation
  const currentSimulation = simulationData[id] || simulationData['easy-1'];
  const currentStepData = currentSimulation.steps[currentStep];

  const handleAnswer = (questionId, answerIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    currentStepData.questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    const newScore = (correctAnswers / currentStepData.questions.length) * 100;
    setScore(newScore);
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (currentStep < currentSimulation.steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setAnswers({});
      setShowFeedback(false);
    } else {
      navigate('/simulation');
    }
  };

  const handleBack = () => {
    navigate('/simulation');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#1a1a1a] rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <button
              onClick={handleBack}
              className="mb-6 px-4 py-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white rounded-lg transition-colors"
            >
              ← Back to Simulations
            </button>

            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-white">{currentSimulation.title}</h1>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                currentSimulation.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                currentSimulation.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-red-500/20 text-red-400'
              }`}>
                {currentSimulation.difficulty}
              </span>
            </div>

            {currentStepData.type === 'email' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-gray-800 rounded-lg p-6 mb-8 bg-[#2a2a2a]"
              >
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-white">Subject: {currentStepData.content.subject}</h2>
                  <p className="text-gray-400">From: {currentStepData.content.sender}</p>
                </div>
                <div className="whitespace-pre-line text-gray-300">
                  {currentStepData.content.body}
                </div>
              </motion.div>
            )}

            <div className="space-y-6">
              {currentStepData.questions.map((question) => (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#2a2a2a] p-6 rounded-lg"
                >
                  <h3 className="text-lg font-medium text-white mb-4">{question.text}</h3>
                  <div className="space-y-3">
                    {question.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswer(question.id, index)}
                        className={`w-full p-4 text-left border rounded-lg transition-colors ${
                          answers[question.id] === index
                            ? 'bg-blue-500/20 border-blue-500 text-white'
                            : 'bg-[#3a3a3a] border-gray-700 text-gray-300 hover:bg-[#4a4a4a]'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 flex justify-between">
              <button
                onClick={calculateScore}
                disabled={Object.keys(answers).length !== currentStepData.questions.length}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Answers
              </button>
              {showFeedback && (
                <button
                  onClick={handleNext}
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                >
                  Continue
                </button>
              )}
            </div>

            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 p-6 bg-[#2a2a2a] rounded-lg"
              >
                <h3 className="text-xl font-bold text-white mb-4">Your Score: {score}%</h3>
                <div className="space-y-4">
                  {currentStepData.questions.map((question) => (
                    <div key={question.id} className="p-4 rounded-lg bg-[#3a3a3a]">
                      <div className="flex items-center mb-2">
                        <span className={`mr-2 ${
                          answers[question.id] === question.correctAnswer
                            ? 'text-green-400'
                            : 'text-red-400'
                        }`}>
                          {answers[question.id] === question.correctAnswer ? '✓' : '✗'}
                        </span>
                        <span className="text-white">{question.text}</span>
                      </div>
                      <p className="text-gray-400 text-sm">{question.explanation}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulation; 