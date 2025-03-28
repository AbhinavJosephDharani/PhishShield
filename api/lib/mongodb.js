const mongoose = require('mongoose');
const redis = require('./redis');

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

const mongooseOptions = {
  bufferCommands: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 3000,
  socketTimeoutMS: 30000,
  connectTimeoutMS: 5000,
  maxPoolSize: 1,
  minPoolSize: 1
};

async function connectDB() {
  try {
    // Check if we have a cached connection in Redis
    const cachedConn = await redis.get('mongodb_connection');
    if (cachedConn) {
      return mongoose.connect(MONGODB_URI, mongooseOptions);
    }

    // If no cached connection, create a new one
    const conn = await mongoose.connect(MONGODB_URI, mongooseOptions);
    
    // Cache the connection in Redis
    await redis.set('mongodb_connection', 'connected', {
      ex: 60 // Expire after 60 seconds
    });

    return conn;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

module.exports = connectDB; 