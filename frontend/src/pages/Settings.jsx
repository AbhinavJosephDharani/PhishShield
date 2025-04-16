import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      weeklyReport: true
    },
    preferences: {
      theme: 'light',
      difficulty: 'moderate',
      language: 'en'
    },
    security: {
      twoFactor: false,
      password: '********'
    }
  });

  const handleToggle = (category, setting) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: !prev[category][setting]
      }
    }));
  };

  const handleSelect = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>

            {/* Notifications Section */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Notifications</h2>
              <div className="space-y-4">
                {Object.entries(settings.notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {key === 'email' && 'Receive email notifications about your progress'}
                        {key === 'push' && 'Get push notifications for new simulations'}
                        {key === 'weeklyReport' && 'Receive weekly progress reports'}
                      </p>
                    </div>
                    <button
                      onClick={() => handleToggle('notifications', key)}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        value ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full bg-white transform transition-transform ${
                          value ? 'translate-x-6' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Preferences Section */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Preferences</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Theme</h3>
                  <select
                    value={settings.preferences.theme}
                    onChange={(e) => handleSelect('preferences', 'theme', e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="system">System</option>
                  </select>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Default Difficulty</h3>
                  <select
                    value={settings.preferences.difficulty}
                    onChange={(e) => handleSelect('preferences', 'difficulty', e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="easy">Easy</option>
                    <option value="moderate">Moderate</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Language</h3>
                  <select
                    value={settings.preferences.language}
                    onChange={(e) => handleSelect('preferences', 'language', e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Security Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Security</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-500">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggle('security', 'twoFactor')}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      settings.security.twoFactor ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full bg-white transform transition-transform ${
                        settings.security.twoFactor ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Password</h3>
                  <div className="flex items-center">
                    <input
                      type="password"
                      value={settings.security.password}
                      className="w-full p-2 border rounded-md"
                      disabled
                    />
                    <button className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                      Change
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 