import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import EmailSimulator from '../components/Simulation/EmailSimulator';
import GlitchText from '../components/GlitchText';
import { FiArrowLeft, FiRefreshCw } from 'react-icons/fi';
import AccessibilityChecklist from '../components/Accessibility/AccessibilityChecklist';

const sampleSimulations = [
  {
    id: 1,
    title: "Urgent: Your Account Security Alert",
    sender: {
      name: "Security Team",
      email: "security@yourbank.com"
    },
    subject: "⚠️ Important: Unusual Login Activity Detected",
    content: `Dear Valued Customer,

We have detected unusual login activity on your account from a new device. For your security, we need to verify this activity.

Please review the following login attempt:
- Location: New York, USA
- Device: iPhone 13
- Time: 2 minutes ago

If this was you, you can ignore this message. If not, please click the link below to secure your account immediately.

Best regards,
Security Team`,
    links: [
      {
        text: "Secure My Account",
        isPhishing: true
      }
    ],
    attachments: [],
    indicators: [
      "Urgent language creating panic",
      "Generic greeting ('Dear Valued Customer')",
      "Suspicious link to 'secure account'",
      "Request for immediate action",
      "Unusual sender email format"
    ],
    learningPoints: [
      "Banks never ask you to click links in emails to secure your account",
      "Look for personalized greetings in legitimate bank communications",
      "Check the sender's email address carefully",
      "Don't be pressured by urgent language",
      "Always verify through official channels"
    ],
    tips: [
      "Hover over links to check their actual destination",
      "Contact your bank directly through official channels",
      "Check for spelling and grammar errors",
      "Look for personalized information that only your bank would know"
    ]
  },
  {
    id: 2,
    title: "Your Package Delivery Update",
    sender: {
      name: "Amazon Delivery",
      email: "delivery@amazon-prime.com"
    },
    subject: "Package Delivery Issue - Action Required",
    content: `Hello,

We attempted to deliver your package today but were unable to complete the delivery due to an incorrect address.

Package Details:
- Tracking Number: AMZ-987654321
- Delivery Date: Today
- Status: Pending

Please click the link below to update your delivery address and schedule a new delivery time.

Thank you for choosing Amazon Prime.

Customer Service Team`,
    links: [
      {
        text: "Update Delivery Address",
        isPhishing: true
      }
    ],
    attachments: [
      {
        name: "delivery_receipt.pdf",
        isPhishing: true
      }
    ],
    indicators: [
      "Suspicious sender email domain",
      "Generic greeting",
      "Attachment from unknown sender",
      "Request to click link for address update",
      "No specific order details"
    ],
    learningPoints: [
      "Amazon uses amazon.com domain for official communications",
      "Legitimate delivery notifications include specific order details",
      "Be cautious of unexpected attachments",
      "Check tracking numbers in your Amazon account directly",
      "Look for personalized order information"
    ],
    tips: [
      "Always check the sender's email domain",
      "Verify tracking numbers in your account",
      "Don't open unexpected attachments",
      "Look for specific order details in delivery notifications"
    ]
  }
];

function PhishingSimulation() {
  const [currentSimulation, setCurrentSimulation] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const navigate = useNavigate();

  const handleComplete = (score) => {
    console.log('Simulation completed with score:', score);
    setIsCompleted(true);
  };

  const handleRetry = () => {
    setCurrentSimulation((prev) => (prev + 1) % sampleSimulations.length);
    setIsCompleted(false);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-lg"
            aria-label="Back to dashboard"
          >
            <FiArrowLeft aria-hidden="true" />
            Back to Dashboard
          </button>
          <GlitchText className="text-2xl font-bold">
            Phishing Simulation Training
          </GlitchText>
          <div className="w-8" aria-hidden="true" /> {/* Spacer for alignment */}
        </div>

        <div className="mb-8 text-center">
          <h1 className="text-xl font-semibold text-gray-300 mb-2">
            {sampleSimulations[currentSimulation].title}
          </h1>
          <p className="text-gray-400">
            Analyze the email below and identify all phishing indicators
          </p>
        </div>

        <EmailSimulator
          simulation={sampleSimulations[currentSimulation]}
          onComplete={handleComplete}
        />

        {isCompleted && (
          <div className="mt-8 text-center">
            <button
              onClick={handleRetry}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              aria-label="Try another simulation"
            >
              <FiRefreshCw aria-hidden="true" />
              Try Another Simulation
            </button>
          </div>
        )}

        <div className="mt-12">
          <AccessibilityChecklist />
        </div>
      </div>
    </Layout>
  );
}

export default PhishingSimulation; 