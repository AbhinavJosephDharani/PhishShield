import React, { useState } from 'react';
import { FiMail, FiPaperclip, FiAlertTriangle, FiCheck, FiX, FiExternalLink } from 'react-icons/fi';

const EmailSimulator = ({ simulation, onComplete }) => {
  const [selectedIndicators, setSelectedIndicators] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [hoveredElement, setHoveredElement] = useState(null);

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
        {/* Visual Email Header */}
        <div className="mb-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <span className="text-blue-400 font-bold">
                  {simulation.email.from.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-gray-300 font-medium">{simulation.email.from}</p>
                <p className="text-gray-400 text-sm">to me</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-sm">Today, 10:30 AM</p>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-white mb-4">
            {simulation.email.subject}
          </h3>
        </div>

        {/* Visual Email Body */}
        <div className="mb-6 bg-white/5 rounded-lg p-6">
          <div className="whitespace-pre-line text-gray-300">
            {simulation.email.content}
          </div>
          
          {/* Interactive Link */}
          <div 
            className="mt-4 inline-flex items-center text-blue-400 hover:text-blue-300 cursor-pointer"
            onMouseEnter={() => setHoveredElement('link')}
            onMouseLeave={() => setHoveredElement(null)}
          >
            <FiExternalLink className="mr-2" />
            <span>https://yourbank-verify.com/account</span>
          </div>

          {/* Visual Attachments */}
          {simulation.email.attachments && simulation.email.attachments.length > 0 && (
            <div className="mt-6">
              <h4 className="text-gray-400 mb-4">Attachments:</h4>
              <div className="space-y-2">
                {simulation.email.attachments.map((attachment, index) => (
                  <div
                    key={index}
                    className="flex items-center p-3 bg-gray-700/30 rounded-lg cursor-pointer hover:bg-gray-700/50 transition-colors"
                    onMouseEnter={() => setHoveredElement(`attachment-${index}`)}
                    onMouseLeave={() => setHoveredElement(null)}
                  >
                    <div className="w-10 h-10 bg-gray-600/50 rounded flex items-center justify-center mr-4">
                      <FiPaperclip className="text-gray-400" />
                    </div>
                    <div>
                      <p className="text-gray-300">{attachment.name}</p>
                      <p className="text-gray-400 text-sm">{attachment.size}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Interactive Elements */}
        {!isSubmitted ? (
          <div className="mt-8">
            <h4 className="text-gray-300 mb-4">Select all phishing indicators:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {simulation.indicators.map((indicator) => (
                <button
                  key={indicator.id}
                  onClick={() => handleIndicatorClick(indicator.id)}
                  className={`p-4 rounded-lg transition-all duration-200 ${
                    selectedIndicators.includes(indicator.id)
                      ? 'bg-blue-600/20 border-2 border-blue-500/50'
                      : 'bg-gray-700/50 hover:bg-gray-700 border border-gray-600'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      selectedIndicators.includes(indicator.id)
                        ? 'bg-blue-500'
                        : 'bg-gray-600'
                    }`}>
                      {selectedIndicators.includes(indicator.id) && (
                        <FiCheck className="text-white" />
                      )}
                    </div>
                    <span className="text-gray-300 text-left">{indicator.text}</span>
                  </div>
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
              <div className="inline-block p-4 bg-blue-500/20 rounded-full mb-4">
                <FiAlertTriangle className="text-blue-400 text-4xl" />
              </div>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {simulation.learningPoints.map((point, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-700/30 rounded-lg flex items-start space-x-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-400">{index + 1}</span>
                    </div>
                    <span className="text-gray-300">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailSimulator; 