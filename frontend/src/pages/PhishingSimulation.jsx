import { useState } from 'react';
import GlitchText from '../components/GlitchText';
import EmailSimulator from '../components/Simulation/EmailSimulator';

const sampleSimulation = {
  id: 1,
  title: "Phishing Email Simulation",
  description: "Identify phishing indicators in this simulated email",
  email: {
    from: "support@yourbank.com",
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
};

function PhishingSimulation() {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleComplete = (score) => {
    console.log('Simulation completed with score:', score);
    setIsCompleted(true);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <GlitchText className="text-2xl sm:text-3xl font-bold mb-6">
        {sampleSimulation.title}
      </GlitchText>
      
      <p className="text-gray-300 mb-8">
        {sampleSimulation.description}
      </p>

      <EmailSimulator
        simulation={sampleSimulation}
        onComplete={handleComplete}
      />

      {isCompleted && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setIsCompleted(false)}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}

export default PhishingSimulation; 