const mongoose = require('mongoose');
const User = require('../../backend/models/User');
const cors = require('cors');
const jwt = require('jsonwebtoken');

// MongoDB connection
const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

// CORS middleware
const corsMiddleware = cors({
  origin: ['https://phishshield.vercel.app', 'http://localhost:5173'],
  methods: ['POST'],
  credentials: true,
});

// Handler function
const handler = async (req, res) => {
  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();
    console.log('Registration request received:', req.body);
    const { email, password, name } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists:', email);
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = new User({
      email,
      password,
      name
    });

    // Validate user before saving
    const validationError = user.validateSync();
    if (validationError) {
      console.log('Validation error:', validationError.errors);
      return res.status(400).json({ 
        message: 'Validation error',
        errors: Object.values(validationError.errors).map(err => err.message)
      });
    }

    console.log('Attempting to save user:', { email, name });
    await user.save();
    console.log('User saved successfully');

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Registration error details:', error);
    res.status(500).json({ message: 'Error registering user', details: error.message });
  }
};

// Export the wrapped handler
module.exports = (req, res) => {
  return new Promise((resolve, reject) => {
    corsMiddleware(req, res, (err) => {
      if (err) {
        reject(err);
      } else {
        handler(req, res).catch(reject);
      }
    });
  });
}; 