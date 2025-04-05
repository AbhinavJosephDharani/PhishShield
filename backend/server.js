const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: ['https://phishshield.vercel.app', 'http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

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

// MongoDB connection
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    console.log('Using cached MongoDB connection');
    return cached.conn;
  }

  if (!cached.promise) {
    console.log('Creating new MongoDB connection with URI:', process.env.MONGODB_URI);
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 30000,
      family: 4,
      maxPoolSize: 10,
      minPoolSize: 2,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      retryWrites: true,
      w: 'majority'
    };

    cached.promise = mongoose.connect(process.env.MONGODB_URI, opts)
      .then((mongoose) => {
        console.log('Successfully connected to MongoDB');
        return mongoose;
      })
      .catch((error) => {
        console.error('MongoDB connection error:', {
          message: error.message,
          name: error.name,
          code: error.code,
          stack: error.stack
        });
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (e) {
    console.error('Failed to establish MongoDB connection:', {
      message: e.message,
      name: e.name,
      code: e.code,
      stack: e.stack
    });
    cached.promise = null;
    throw e;
  }
}

// Connect to MongoDB before handling requests
app.use(async (req, res, next) => {
  try {
    console.log('Attempting to connect to MongoDB for request:', req.method, req.path);
    await connectDB();
    next();
  } catch (error) {
    console.error('MongoDB connection error in request handler:', {
      message: error.message,
      name: error.name,
      code: error.code,
      stack: error.stack
    });
    res.status(500).json({ 
      message: 'Database connection error', 
      details: error.message,
      code: error.code
    });
  }
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'PhishShield API is running' });
});

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    console.log('Health check requested');
    const db = mongoose.connection;
    const dbState = db.readyState;
    
    const healthStatus = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      database: {
        status: dbState === 1 ? 'connected' : 'disconnected',
        readyState: dbState,
        error: dbState !== 1 ? 'Database not connected' : null
      },
      environment: {
        node_env: process.env.NODE_ENV,
        has_mongodb_uri: !!process.env.MONGODB_URI,
        has_jwt_secret: !!process.env.JWT_SECRET
      }
    };

    console.log('Health check response:', healthStatus);
    res.json(healthStatus);
  } catch (error) {
    console.error('Health check error:', error);
    res.status(500).json({
      status: 'error',
      error: error.message
    });
  }
});

// Test endpoint
app.get('/api/test', (req, res) => {
  console.log('Test endpoint hit');
  res.json({ 
    status: 'ok',
    message: 'Server is working',
    env: {
      node_env: process.env.NODE_ENV,
      has_mongodb_uri: !!process.env.MONGODB_URI,
      has_jwt_secret: !!process.env.JWT_SECRET
    }
  });
});

// Routes
app.use('/api/auth', authRoutes);

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

// Export the Express API for Vercel
module.exports = app; 