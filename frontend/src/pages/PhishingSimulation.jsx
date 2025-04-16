import React, { useState } from 'react';
import { phishingScenarios, difficultyDescriptions } from '../data/phishingScenarios';
import SimulationScenario from '../components/Simulation/SimulationScenario';
import { motion } from 'framer-motion';

const PhishingSimulation = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy');
  const [selectedScenario, setSelectedScenario] = useState(null);

  const handleScenarioSelect = (scenario) => {
    setSelectedScenario(scenario);
  };

  const handleBack = () => {
    setSelectedScenario(null);
  };

  if (selectedScenario) {
    return <SimulationScenario scenario={selectedScenario} onBack={handleBack} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Phishing Simulation</h1>
          <p className="text-xl text-gray-600">Test your ability to identify phishing attempts</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {Object.entries(difficultyDescriptions).map(([level, info]) => (
            <motion.div
              key={level}
              className={`p-6 rounded-lg shadow-lg ${
                selectedDifficulty === level
                  ? 'bg-blue-600 text-white'
                  : 'bg-white hover:bg-blue-50 cursor-pointer'
              }`}
              onClick={() => setSelectedDifficulty(level)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <h2 className="text-2xl font-bold mb-2">{info.title}</h2>
              <p className="mb-4">{info.description}</p>
              <div className="space-y-2">
                <p className="font-semibold">Requirements:</p>
                <p>{info.requirements}</p>
                <p className="font-semibold mt-4">Focus Areas:</p>
                <ul className="list-disc list-inside">
                  {info.focus.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {phishingScenarios[selectedDifficulty].map((scenario) => (
            <motion.div
              key={scenario.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{scenario.title}</h3>
                <div className="mb-4">
                  <p className="text-sm text-gray-500">From: {scenario.sender.name}</p>
                  <p className="text-sm text-gray-500">Subject: {scenario.subject}</p>
                </div>
                <button
                  onClick={() => handleScenarioSelect(scenario)}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300"
                >
                  Start Simulation
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhishingSimulation; 