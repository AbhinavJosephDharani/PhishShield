const mongoose = require('mongoose');

const phishingTestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['email', 'website', 'sms', 'social-media'],
    required: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard', 'expert'],
    required: true
  },
  content: {
    template: {
      type: String,
      required: true
    },
    variables: {
      type: Map,
      of: String
    },
    indicators: [{
      type: String,
      description: String,
      severity: {
        type: String,
        enum: ['low', 'medium', 'high']
      }
    }]
  },
  aiGeneration: {
    model: String,
    prompt: String,
    parameters: mongoose.Schema.Types.Mixed,
    baseTemplate: String,
    modifications: [{
      field: String,
      original: String,
      modified: String,
      reason: String
    }]
  },
  learningObjectives: [{
    objective: String,
    category: String
  }],
  hints: [{
    text: String,
    points: Number
  }],
  correctResponse: {
    action: {
      type: String,
      enum: ['report', 'delete', 'ignore', 'verify'],
      required: true
    },
    explanation: String
  },
  scoring: {
    maxPoints: {
      type: Number,
      default: 100
    },
    timeLimit: Number, // seconds
    penaltyPerHint: Number,
    bonusForSpeed: Boolean
  },
  statistics: {
    timesAttempted: {
      type: Number,
      default: 0
    },
    successRate: {
      type: Number,
      default: 0
    },
    averageResponseTime: {
      type: Number,
      default: 0
    },
    hintUsage: {
      type: Number,
      default: 0
    }
  },
  status: {
    type: String,
    enum: ['draft', 'active', 'archived'],
    default: 'draft'
  },
  metadata: {
    version: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    lastUpdated: Date,
    targetAudience: [String],
    tags: [String]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Update statistics after each attempt
phishingTestSchema.methods.updateStatistics = async function(success, responseTime, hintsUsed) {
  const stats = this.statistics;
  stats.timesAttempted += 1;
  stats.successRate = ((stats.successRate * (stats.timesAttempted - 1) + (success ? 100 : 0)) / stats.timesAttempted);
  stats.averageResponseTime = ((stats.averageResponseTime * (stats.timesAttempted - 1) + responseTime) / stats.timesAttempted);
  stats.hintUsage = ((stats.hintUsage * (stats.timesAttempted - 1) + hintsUsed) / stats.timesAttempted);
  
  await this.save();
};

// Generate new test content using AI
phishingTestSchema.methods.generateNewVariation = async function() {
  // This would integrate with your AI service to generate new content
  // based on the original template and parameters
  // Implementation depends on your AI service
};

module.exports = mongoose.model('PhishingTest', phishingTestSchema); 