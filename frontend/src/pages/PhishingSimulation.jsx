import { useState } from 'react';
import GlitchText from '../components/GlitchText';
import EmailSimulator from '../components/Simulation/EmailSimulator';

const sampleSimulations = [
  {
    id: 1,
    title: "Bank Security Alert",
    description: "Identify phishing indicators in this bank security email",
    email: {
      from: "security@yourbank.com",
      to: "user@example.com",
      subject: "Urgent: Account Security Alert",
      content: `
        Dear Valued Customer,

        We have detected unusual activity on your account. To ensure your account security, please verify your information by clicking the link below:

        https://yourbank-verify.com/account

        If you do not verify your account within 24 hours, we will be forced to temporarily suspend your account.

        Best regards,
        Your Bank Security Team
      `,
      attachments: [
        {
          name: "Account_Statement.pdf",
          size: "2.4 MB",
          type: "pdf"
        }
      ]
    },
    indicators: [
      {
        id: 1,
        text: "Urgent language creating a sense of panic",
        correct: true
      },
      {
        id: 2,
        text: "Suspicious link to an external domain",
        correct: true
      },
      {
        id: 3,
        text: "Threatening account suspension",
        correct: true
      },
      {
        id: 4,
        text: "Professional email signature",
        correct: false
      }
    ],
    learningPoints: [
      "Banks never ask for personal information via email",
      "Always check the sender's email address carefully",
      "Be wary of urgent or threatening language",
      "Hover over links to verify their destination"
    ]
  },
  {
    id: 2,
    title: "Package Delivery Scam",
    description: "Spot the red flags in this delivery notification",
    email: {
      from: "delivery@amazzon.com",
      to: "user@example.com",
      subject: "Your Package Delivery is Pending",
      content: `
        Hello Customer,

        Your package #AMZ-987654321 is ready for delivery but we need additional information to complete the process.

        Please click the link below to update your delivery preferences:
        https://amazzon-delivery.com/update

        If we don't receive your response within 48 hours, your package will be returned to the sender.

        Thank you for shopping with us!
        Amazon Delivery Team
      `,
      attachments: [
        {
          name: "Delivery_Details.pdf",
          size: "1.2 MB",
          type: "pdf"
        }
      ]
    },
    indicators: [
      {
        id: 1,
        text: "Misspelled company name (Amazzon)",
        correct: true
      },
      {
        id: 2,
        text: "Generic greeting (Hello Customer)",
        correct: true
      },
      {
        id: 3,
        text: "Suspicious link to update information",
        correct: true
      },
      {
        id: 4,
        text: "Professional formatting",
        correct: false
      }
    ],
    learningPoints: [
      "Legitimate companies rarely misspell their own name",
      "Be cautious of generic greetings in official communications",
      "Delivery companies don't usually ask for information updates via email",
      "Check the sender's email domain carefully"
    ]
  }
];

function PhishingSimulation() {
  const [currentSimulation, setCurrentSimulation] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleComplete = (score) => {
    console.log('Simulation completed with score:', score);
    setIsCompleted(true);
  };

  const handleNext = () => {
    if (currentSimulation < sampleSimulations.length - 1) {
      setCurrentSimulation(prev => prev + 1);
      setIsCompleted(false);
    }
  };

  const handleRetry = () => {
    setIsCompleted(false);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <GlitchText className="text-2xl sm:text-3xl font-bold">
          {sampleSimulations[currentSimulation].title}
        </GlitchText>
        <div className="text-gray-400">
          Simulation {currentSimulation + 1} of {sampleSimulations.length}
        </div>
      </div>
      
      <p className="text-gray-300 mb-8">
        {sampleSimulations[currentSimulation].description}
      </p>

      <EmailSimulator
        simulation={sampleSimulations[currentSimulation]}
        onComplete={handleComplete}
      />

      {isCompleted && (
        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={handleRetry}
            className="px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            Try Again
          </button>
          {currentSimulation < sampleSimulations.length - 1 && (
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Next Simulation
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default PhishingSimulation; 