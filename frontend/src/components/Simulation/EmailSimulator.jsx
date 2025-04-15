import { useState } from 'react';
import { FiMail, FiLink, FiPaperclip, FiAlertCircle, FiCheck, FiX } from 'react-icons/fi';

const EmailSimulator = ({ simulation, onComplete }) => {
  const [selectedIndicators, setSelectedIndicators] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [hoveredElement, setHoveredElement] = useState(null);

  const handleIndicatorSelect = (indicator) => {
    if (selectedIndicators.includes(indicator)) {
      setSelectedIndicators(selectedIndicators.filter(i => i !== indicator));
    } else {
      setSelectedIndicators([...selectedIndicators, indicator]);
    }
  };

  const handleSubmit = () => {
    const correctSelections = selectedIndicators.filter(indicator => 
      simulation.indicators.includes(indicator)
    );
    const missedIndicators = simulation.indicators.filter(indicator => 
      !selectedIndicators.includes(indicator)
    );
    
    const score = (correctSelections.length / simulation.indicators.length) * 100;
    setScore(score);
    setIsSubmitted(true);
    onComplete(score);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Email Header */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
            {simulation.sender.name.charAt(0)}
          </div>
          <div>
            <div className="font-medium text-gray-900">{simulation.sender.name}</div>
            <div className="text-sm text-gray-500">{simulation.sender.email}</div>
          </div>
        </div>
        <div className="text-sm text-gray-500">To: You</div>
        <div className="font-medium text-gray-900 mt-2">{simulation.subject}</div>
      </div>

      {/* Email Body */}
      <div className="p-6">
        <div className="prose max-w-none">
          {simulation.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4 text-gray-700">{paragraph}</p>
          ))}
        </div>

        {/* Interactive Links */}
        {simulation.links && simulation.links.length > 0 && (
          <div className="mt-4 space-y-2">
            {simulation.links.map((link, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                onMouseEnter={() => setHoveredElement(`link-${index}`)}
                onMouseLeave={() => setHoveredElement(null)}
              >
                <FiLink className="text-blue-500" />
                <span className="text-blue-600 hover:underline">{link.text}</span>
                {hoveredElement === `link-${index}` && (
                  <div className="text-sm text-gray-500 ml-2">
                    {link.isPhishing ? '⚠️ Suspicious link' : '✅ Safe link'}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Attachments */}
        {simulation.attachments && simulation.attachments.length > 0 && (
          <div className="mt-4 space-y-2">
            {simulation.attachments.map((attachment, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                onMouseEnter={() => setHoveredElement(`attachment-${index}`)}
                onMouseLeave={() => setHoveredElement(null)}
              >
                <FiPaperclip className="text-gray-500" />
                <span className="text-gray-700">{attachment.name}</span>
                {hoveredElement === `attachment-${index}` && (
                  <div className="text-sm text-gray-500 ml-2">
                    {attachment.isPhishing ? '⚠️ Suspicious file' : '✅ Safe file'}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Phishing Indicators */}
      {!isSubmitted && (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Select all phishing indicators you find:</h3>
          <div className="space-y-2">
            {simulation.indicators.map((indicator, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${
                  selectedIndicators.includes(indicator)
                    ? 'bg-blue-50 border border-blue-200'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => handleIndicatorSelect(indicator)}
              >
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  selectedIndicators.includes(indicator)
                    ? 'bg-blue-500 border-blue-500 text-white'
                    : 'border-gray-300'
                }`}>
                  {selectedIndicators.includes(indicator) && <FiCheck size={14} />}
                </div>
                <span className="text-gray-700">{indicator}</span>
              </div>
            ))}
          </div>
          <button
            onClick={handleSubmit}
            className="mt-4 w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Submit Analysis
          </button>
        </div>
      )}

      {/* Results */}
      {isSubmitted && (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="text-center mb-4">
            <div className="text-2xl font-bold text-gray-900">{score}%</div>
            <div className="text-sm text-gray-500">Your Score</div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Learning Points:</h4>
              <ul className="space-y-2">
                {simulation.learningPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <FiCheck className="text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Tips for Next Time:</h4>
              <ul className="space-y-2">
                {simulation.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <FiAlertCircle className="text-blue-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailSimulator; 