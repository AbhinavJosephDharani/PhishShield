const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  type: {
    type: String,
    enum: ['lesson', 'quiz', 'simulation'],
    required: true
  },
  content: {
    theory: [{
      title: String,
      body: String,
      media: [{
        type: String,
        url: String
      }]
    }],
    quiz: [{
      question: String,
      options: [String],
      correctAnswer: Number,
      explanation: String
    }],
    simulation: {
      scenario: {
        type: String,
        required: function() { return this.type === 'simulation'; }
      },
      aiParameters: {
        difficulty: Number,
        complexity: Number,
        realWorldBasedOn: String,
        customization: mongoose.Schema.Types.Mixed
      }
    }
  },
  prerequisites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Module'
  }],
  estimatedTime: Number, // in minutes
  points: {
    type: Number,
    default: 100
  },
  category: {
    type: String,
    enum: [
      'email-phishing',
      'spear-phishing',
      'social-engineering',
      'website-security',
      'password-security',
      'mobile-security'
    ],
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  metadata: {
    version: String,
    lastUpdated: Date,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    aiGenerated: {
      type: Boolean,
      default: false
    },
    aiModel: String,
    aiPrompt: String
  },
  statistics: {
    completions: {
      type: Number,
      default: 0
    },
    averageScore: {
      type: Number,
      default: 0
    },
    successRate: {
      type: Number,
      default: 0
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Update statistics when users complete the module
moduleSchema.methods.updateStatistics = async function(score) {
  const stats = this.statistics;
  stats.completions += 1;
  stats.averageScore = ((stats.averageScore * (stats.completions - 1)) + score) / stats.completions;
  stats.successRate = (score >= 70) ? 
    ((stats.successRate * (stats.completions - 1) + 100) / stats.completions) : 
    ((stats.successRate * (stats.completions - 1)) / stats.completions);
  
  await this.save();
};

module.exports = mongoose.model('Module', moduleSchema); 