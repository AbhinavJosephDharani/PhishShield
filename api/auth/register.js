import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Handler function
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  console.log('Registration request received:', {
    body: req.body,
    headers: req.headers
  });

  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  let client;
  try {
    console.log('Connecting to MongoDB...');
    client = await MongoClient.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 30000,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      retryWrites: true,
      w: 'majority'
    });

    const db = client.db('phishshield');
    const users = db.collection('users');

    // Check if user already exists
    console.log('Checking for existing user...');
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    console.log('Hashing password...');
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    console.log('Creating new user...');
    const result = await users.insertOne({
      email,
      password: hashedPassword,
      name,
      createdAt: new Date()
    });

    // Generate JWT
    console.log('Generating JWT...');
    const token = jwt.sign(
      { userId: result.insertedId },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    console.log('Registration successful');
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: result.insertedId,
        email,
        name
      }
    });
  } catch (error) {
    console.error('Registration error:', {
      message: error.message,
      name: error.name,
      code: error.code,
      stack: error.stack
    });
    res.status(500).json({
      message: 'Error registering user',
      details: error.message,
      code: error.code
    });
  } finally {
    if (client) {
      await client.close();
    }
  }
} 