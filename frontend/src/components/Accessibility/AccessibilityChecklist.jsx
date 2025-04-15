import { useState } from 'react';
import { FiCheck, FiAlertCircle } from 'react-icons/fi';

const AccessibilityChecklist = () => {
  const [items, setItems] = useState([
    {
      id: 'font-size',
      title: 'Font Size',
      description: 'Text is readable with minimum 16px for body text',
      status: 'pending',
      component: 'EmailSimulator'
    },
    {
      id: 'contrast',
      title: 'Color Contrast',
      description: 'Text has sufficient contrast ratio (minimum 4.5:1)',
      status: 'pending',
      component: 'EmailSimulator'
    },
    {
      id: 'headings',
      title: 'Heading Structure',
      description: 'Proper heading hierarchy (h1, h2, h3, etc.)',
      status: 'pending',
      component: 'PhishingSimulation'
    },
    {
      id: 'alt-text',
      title: 'Alternative Text',
      description: 'Images have descriptive alt text',
      status: 'pending',
      component: 'EmailSimulator'
    },
    {
      id: 'keyboard',
      title: 'Keyboard Navigation',
      description: 'All interactive elements are keyboard accessible',
      status: 'pending',
      component: 'EmailSimulator'
    },
    {
      id: 'focus',
      title: 'Focus Indicators',
      description: 'Clear focus indicators for interactive elements',
      status: 'pending',
      component: 'EmailSimulator'
    },
    {
      id: 'aria',
      title: 'ARIA Attributes',
      description: 'Proper ARIA roles and labels',
      status: 'pending',
      component: 'EmailSimulator'
    },
    {
      id: 'semantics',
      title: 'Semantic HTML',
      description: 'Appropriate HTML elements used',
      status: 'pending',
      component: 'EmailSimulator'
    }
  ]);

  const toggleStatus = (id) => {
    setItems(items.map(item => 
      item.id === id 
        ? { ...item, status: item.status === 'completed' ? 'pending' : 'completed' }
        : item
    ));
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Accessibility Checklist</h2>
      <div className="space-y-4">
        {items.map(item => (
          <div
            key={item.id}
            className={`p-4 rounded-lg border ${
              item.status === 'completed'
                ? 'bg-green-500/10 border-green-500/50'
                : 'bg-gray-700/50 border-gray-600'
            }`}
          >
            <div className="flex items-start gap-3">
              <button
                onClick={() => toggleStatus(item.id)}
                className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                  item.status === 'completed'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-600 text-gray-400'
                }`}
                aria-label={`Mark ${item.title} as ${item.status === 'completed' ? 'pending' : 'completed'}`}
              >
                {item.status === 'completed' ? <FiCheck size={14} /> : null}
              </button>
              <div>
                <h3 className="font-medium text-white">{item.title}</h3>
                <p className="text-gray-400 text-sm mt-1">{item.description}</p>
                <p className="text-gray-500 text-xs mt-2">Component: {item.component}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccessibilityChecklist; 