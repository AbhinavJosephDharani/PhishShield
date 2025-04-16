import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Simulation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  // Mock simulation data - replace with actual data from your backend
  const simulationData = {
    'easy-1': {
      title: 'Basic Email Verification',
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
              correctAnswer: 0
            },
            {
              id: 2,
              text: 'What is suspicious about the email content?',
              options: [
                'The urgent tone and threat of account suspension',
                'The professional formatting',
                'The clear instructions'
              ],
              correctAnswer: 0
            }
          ]
        }
      ]
    }
    // Add more simulation data for other scenarios
  };

  const currentSimulation = simulationData[id] || simulationData['easy-1'];
  const currentStepData = currentSimulation.steps[currentStep];

  const handleAnswer = (questionId, answerIndex) => {
    // Handle answer submission
    console.log(`Question ${questionId} answered with option ${answerIndex}`);
    
    // Move to next step or finish simulation
    if (currentStep < currentSimulation.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Simulation completed
      navigate('/simulation/complete');
    }
  };

  const handleBack = () => {
    navigate('/phishing-simulation');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <button
              onClick={handleBack}
              className="mb-6 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              ← Back to Simulations
            </button>

            <h1 className="text-3xl font-bold text-gray-900 mb-6">{currentSimulation.title}</h1>

            {currentStepData.type === 'email' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border rounded-lg p-6 mb-8"
              >
                <div className="mb-4">
                  <h2 className="text-lg font-semibold">Subject: {currentStepData.content.subject}</h2>
                  <p className="text-gray-600">From: {currentStepData.content.sender}</p>
                </div>
                <div className="whitespace-pre-line text-gray-800">
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
                  className="bg-gray-50 p-6 rounded-lg"
                >
                  <h3 className="text-lg font-medium text-gray-900 mb-4">{question.text}</h3>
                  <div className="space-y-3">
                    {question.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswer(question.id, index)}
                        className="w-full p-4 text-left bg-white hover:bg-blue-50 border rounded-lg transition-colors"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulation; 