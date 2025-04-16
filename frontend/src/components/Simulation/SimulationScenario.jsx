import { useState } from 'react';
import { FiMail, FiPaperclip, FiAlertTriangle, FiCheck, FiX } from 'react-icons/fi';

const SimulationScenario = ({ scenario, onComplete }) => {
  const [userAnswers, setUserAnswers] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);

  const handleIndicatorClick = (indicator) => {
    if (showFeedback) return;
    
    if (userAnswers.includes(indicator)) {
      setUserAnswers(userAnswers.filter(a => a !== indicator));
    } else {
      setUserAnswers([...userAnswers, indicator]);
    }
  };

  const handleSubmit = () => {
    const correctIndicators = scenario.indicators;
    const totalIndicators = correctIndicators.length;
    let correctCount = 0;

    // Calculate score based on correct identifications and false positives
    userAnswers.forEach(answer => {
      if (correctIndicators.includes(answer)) {
        correctCount++;
      } else {
        correctCount--; // Penalty for false positives
      }
    });

    const calculatedScore = Math.max(0, Math.round((correctCount / totalIndicators) * 100));
    setScore(calculatedScore);
    setShowFeedback(true);
    onComplete(calculatedScore);
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      {/* Email Header */}
      <div className="border-b border-gray-700 pb-4 mb-4">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-gray-800 rounded-full">
            <FiMail className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{scenario.subject}</h3>
            <div className="text-sm text-gray-400">
              <p>From: {scenario.sender.name} &lt;{scenario.sender.email}&gt;</p>
              <p>To: you@example.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Email Content */}
      <div className="mb-6 whitespace-pre-wrap text-gray-300">
        {scenario.content}
      </div>

      {/* Attachments */}
      {scenario.attachments?.length > 0 && (
        <div className="mb-6">
          <div className="text-sm text-gray-400 mb-2">Attachments:</div>
          {scenario.attachments.map((attachment, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-2 bg-gray-800 rounded cursor-pointer hover:bg-gray-700"
              onClick={() => handleIndicatorClick(`Suspicious attachment: ${attachment.name}`)}
            >
              <FiPaperclip />
              <span>{attachment.name}</span>
            </div>
          ))}
        </div>
      )}

      {/* Interactive Elements */}
      <div className="mb-6">
        <div className="text-sm text-gray-400 mb-2">Click on any suspicious elements:</div>
        {scenario.links.map((link, index) => (
          <button
            key={index}
            onClick={() => handleIndicatorClick(`Suspicious link: ${link.text}`)}
            className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2 mb-2 ${
              userAnswers.includes(`Suspicious link: ${link.text}`) ? 'ring-2 ring-yellow-400' : ''
            }`}
          >
            {link.text}
          </button>
        ))}
      </div>

      {/* Indicators Selection */}
      <div className="mb-6">
        <div className="text-sm text-gray-400 mb-2">Common Phishing Indicators:</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {[
            'Urgent/threatening language',
            'Generic greeting',
            'Suspicious sender address',
            'Request for sensitive information',
            'Poor grammar/spelling',
            'Mismatched URLs',
            'Unexpected attachments',
            'Unusual requests'
          ].map((indicator) => (
            <button
              key={indicator}
              onClick={() => handleIndicatorClick(indicator)}
              className={`p-2 text-left rounded ${
                userAnswers.includes(indicator)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {indicator}
            </button>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      {!showFeedback ? (
        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Submit Analysis
        </button>
      ) : (
        <div className="space-y-4">
          <div className="p-4 bg-gray-800 rounded-lg">
            <div className="text-xl font-bold mb-2">
              Score: {score}%
            </div>
            <div className="space-y-2">
              {scenario.indicators.map((indicator, index) => (
                <div key={index} className="flex items-start gap-2">
                  {userAnswers.includes(indicator) ? (
                    <FiCheck className="text-green-500 mt-1" />
                  ) : (
                    <FiX className="text-red-500 mt-1" />
                  )}
                  <div>
                    <div className="font-medium">{indicator}</div>
                    <div className="text-sm text-gray-400">
                      {scenario.learningPoints[index]}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-blue-900/30 rounded-lg">
            <div className="font-bold mb-2 flex items-center gap-2">
              <FiAlertTriangle />
              Tips for Future Reference:
            </div>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
              {scenario.tips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimulationScenario; 