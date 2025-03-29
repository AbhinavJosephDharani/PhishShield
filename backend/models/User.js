const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

// Initialize mongoose Schema
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long'],
    select: false // Don't include password in queries by default
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
  passwordResetToken: String,
  passwordResetExpires: Date,
  loginAttempts: {
    count: { type: Number, default: 0 },
    lastAttempt: Date
  },
  isLocked: {
    type: Boolean,
    default: false
  },
  lockUntil: Date,
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

// Generate password reset token
userSchema.methods.generatePasswordResetToken = async function() {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  return resetToken;
};

// Check if account is locked
userSchema.methods.isAccountLocked = function() {
  return this.isLocked && this.lockUntil && this.lockUntil > Date.now();
};

// Increment login attempts
userSchema.methods.incrementLoginAttempts = async function() {
  this.loginAttempts.count += 1;
  this.loginAttempts.lastAttempt = Date.now();
  
  // Lock account if too many attempts
  if (this.loginAttempts.count >= 5) {
    this.isLocked = true;
    this.lockUntil = Date.now() + 30 * 60 * 1000; // Lock for 30 minutes
  }
  
  await this.save();
};

// Reset login attempts on successful login
userSchema.methods.resetLoginAttempts = async function() {
  this.loginAttempts = { count: 0, lastAttempt: null };
  this.isLocked = false;
  this.lockUntil = null;
  await this.save();
};

// Create the model
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User; 