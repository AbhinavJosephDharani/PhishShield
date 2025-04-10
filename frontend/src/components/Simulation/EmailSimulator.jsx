import React, { useState } from 'react';
import { FiMail, FiPaperclip, FiAlertTriangle, FiCheck, FiX } from 'react-icons/fi';

const EmailSimulator = ({ simulation, onComplete }) => {
  const [selectedIndicators, setSelectedIndicators] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleIndicatorClick = (indicatorId) => {
    setSelectedIndicators(prev => {
      if (prev.includes(indicatorId)) {
        return prev.filter(id => id !== indicatorId);
      }
      return [...prev, indicatorId];
    });
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    const correctSelections = selectedIndicators.filter(id => 
      simulation.indicators.find(ind => ind.id === id)?.correct
    );
    const incorrectSelections = selectedIndicators.filter(id => 
      !simulation.indicators.find(ind => ind.id === id)?.correct
    );
    const missedIndicators = simulation.indicators
      .filter(ind => ind.correct && !selectedIndicators.includes(ind.id))
      .length;

    const calculatedScore = Math.max(
      0,
      (correctSelections.length * 2) - 
      (incorrectSelections.length + missedIndicators)
    );
    setScore(calculatedScore);
    onComplete(calculatedScore);
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 overflow-hidden">
      <div className="p-6">
        {/* Email Header */}
        <div className="mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-300">From: {simulation.email.from}</p>
              <p className="text-gray-300">To: {simulation.email.to}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-sm">Today, 10:30 AM</p>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-white mb-4">
            {simulation.email.subject}
          </h3>
        </div>

        {/* Email Body */}
        <div className="mb-6">
          <div className="whitespace-pre-line text-gray-300">
            {simulation.email.content}
          </div>
        </div>

        {/* Attachments */}
        {simulation.email.attachments && simulation.email.attachments.length > 0 && (
          <div className="mb-6">
            <h4 className="text-gray-400 mb-2">Attachments:</h4>
            <div className="space-y-2">
              {simulation.email.attachments.map((attachment, index) => (
                <div
                  key={index}
                  className="flex items-center text-gray-300"
                >
                  <FiPaperclip className="mr-2" />
                  <span>{attachment.name}</span>
                  <span className="text-gray-400 text-sm ml-2">
                    ({attachment.size})
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Interactive Elements */}
        {!isSubmitted ? (
          <div className="mt-8">
            <h4 className="text-gray-300 mb-4">Select all phishing indicators:</h4>
            <div className="space-y-2">
              {simulation.indicators.map((indicator) => (
                <button
                  key={indicator.id}
                  onClick={() => handleIndicatorClick(indicator.id)}
                  className={`w-full text-left p-3 rounded-md transition-colors ${
                    selectedIndicators.includes(indicator.id)
                      ? 'bg-blue-600/20 border border-blue-500/50'
                      : 'bg-gray-700/50 hover:bg-gray-700'
                  }`}
                >
                  <span className="text-gray-300">{indicator.text}</span>
                </button>
              ))}
            </div>
            <button
              onClick={handleSubmit}
              className="mt-6 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Submit Analysis
            </button>
          </div>
        ) : (
          <div className="mt-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">
                Your Score: {score}/6
              </h3>
              <p className="text-gray-300">
                {score >= 4
                  ? "Great job! You've identified most of the phishing indicators."
                  : "Good effort! Let's review what you missed."}
              </p>
            </div>

            <div className="mb-6">
              <h4 className="text-gray-300 mb-4">Learning Points:</h4>
              <ul className="space-y-2">
                {simulation.learningPoints.map((point, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span className="text-gray-300">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailSimulator; 