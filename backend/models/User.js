const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  organization: {
    type: String,
    trim: true
  },
  trainingProgress: {
    completedModules: [{
      moduleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Module'
      },
      completedAt: Date,
      score: Number
    }],
    totalScore: {
      type: Number,
      default: 0
    },
    lastActivity: Date
  },
  phishingTestResults: [{
    testId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PhishingTest'
    },
    identified: Boolean,
    responseTime: Number,
    date: Date
  }],
  authProvider: {
    type: String,
    enum: ['local', 'google', 'github', 'facebook'],
    default: 'local'
  },
  providerId: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: Date
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema); 