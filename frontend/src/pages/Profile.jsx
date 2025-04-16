import React from 'react';
import { motion } from 'framer-motion';

const Profile = () => {
  // Mock user data - replace with actual user data from your backend
  const userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    joinDate: 'January 2024',
    stats: {
      totalSimulations: 12,
      averageScore: 85,
      bestScore: 95,
      completedScenarios: {
        easy: 4,
        moderate: 5,
        hard: 3
      }
    },
    achievements: [
      {
        title: 'Phishing Pro',
        description: 'Completed all easy level simulations',
        icon: '🏆',
        unlocked: true
      },
      {
        title: 'Social Engineering Expert',
        description: 'Scored above 90% in a moderate simulation',
        icon: '🛡️',
        unlocked: true
      },
      {
        title: 'Master Defender',
        description: 'Completed all difficulty levels',
        icon: '👑',
        unlocked: false
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-blue-600 px-6 py-8 text-white">
            <div className="flex items-center">
              <div className="h-24 w-24 rounded-full bg-white flex items-center justify-center text-4xl font-bold text-blue-600">
                {userData.name.charAt(0)}
              </div>
              <div className="ml-6">
                <h1 className="text-3xl font-bold">{userData.name}</h1>
                <p className="text-blue-100">{userData.email}</p>
                <p className="text-blue-100">Member since {userData.joinDate}</p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <motion.div
                className="bg-blue-50 p-6 rounded-lg"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-lg font-semibold text-gray-900">Total Simulations</h3>
                <p className="text-3xl font-bold text-blue-600">{userData.stats.totalSimulations}</p>
              </motion.div>
              <motion.div
                className="bg-green-50 p-6 rounded-lg"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-lg font-semibold text-gray-900">Average Score</h3>
                <p className="text-3xl font-bold text-green-600">{userData.stats.averageScore}%</p>
              </motion.div>
              <motion.div
                className="bg-yellow-50 p-6 rounded-lg"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-lg font-semibold text-gray-900">Best Score</h3>
                <p className="text-3xl font-bold text-yellow-600">{userData.stats.bestScore}%</p>
              </motion.div>
              <motion.div
                className="bg-purple-50 p-6 rounded-lg"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-lg font-semibold text-gray-900">Completion Rate</h3>
                <p className="text-3xl font-bold text-purple-600">
                  {Math.round((userData.stats.completedScenarios.easy + 
                    userData.stats.completedScenarios.moderate + 
                    userData.stats.completedScenarios.hard) / 9 * 100)}%
                </p>
              </motion.div>
            </div>
          </div>

          {/* Progress Section */}
          <div className="p-6 border-t">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Progress by Difficulty</h2>
            <div className="space-y-6">
              {Object.entries(userData.stats.completedScenarios).map(([level, count]) => (
                <div key={level}>
                  <div className="flex justify-between mb-2">
                    <span className="text-lg font-semibold capitalize">{level}</span>
                    <span className="text-gray-600">{count}/3 completed</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${(count / 3) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements Section */}
          <div className="p-6 border-t">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {userData.achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  className={`p-6 rounded-lg ${
                    achievement.unlocked ? 'bg-white shadow-md' : 'bg-gray-100'
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center mb-4">
                    <span className="text-4xl mr-4">{achievement.icon}</span>
                    <div>
                      <h3 className="text-lg font-semibold">{achievement.title}</h3>
                      <p className="text-gray-600">{achievement.description}</p>
                    </div>
                  </div>
                  {!achievement.unlocked && (
                    <div className="text-sm text-gray-500">Locked - Keep practicing!</div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 