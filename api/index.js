const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authRoutes = require('./routes/auth');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: ['https://phishshield.vercel.app', 'http://localhost:5173'],
  credentials: true
}));
app.use(express.json());

// MongoDB connection options
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 3000,
  socketTimeoutMS: 30000,
  connectTimeoutMS: 5000,
  maxPoolSize: 1,
  minPoolSize: 1
};

// Connect to MongoDB
let cachedDb = null;

const connectDB = async () => {
  if (cachedDb) {
    return cachedDb;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, mongooseOptions);
    cachedDb = conn;
    console.log('Connected to MongoDB');
    return conn;
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
};

// Debug middleware
app.use((req, res, next) => {
  console.log('Request received:', {
    method: req.method,
    path: req.path,
    body: req.body,
    headers: req.headers
  });
  next();
});

// Routes
app.use('/api', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: err.message || 'Internal server error' });
});

// Handle 404 errors
app.use((req, res) => {
  console.log('404 Not Found:', req.method, req.url);
  res.status(404).json({ message: 'Route not found' });
});

// Export the serverless function handler
module.exports = async (req, res) => {
  try {
    await connectDB();
    return app(req, res);
  } catch (error) {
    console.error('Serverless function error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}; 