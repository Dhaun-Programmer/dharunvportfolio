require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Message = require('./models/Message');

const app = express();
const PORT = process.env.PORT || 3001;

// MongoDB Connection Caching for Serverless
let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  if (!process.env.MONGODB_URI) {
    console.warn('⚠️ MONGODB_URI is not defined. Skipping DB save.');
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    isConnected = db.connections[0].readyState === 1;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
  }
}

app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.json());

// Nodemailer setup removed

// Test endpoint to verify API is alive
app.get(['/api/test', '/test'], (req, res) => res.json({ status: 'API is working!' }));

// Contact form endpoint
app.post(['/api/contact', '/contact'], async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields required' });
  }

  try {
    // 1. Save to MongoDB
    await connectDB();
    if (isConnected) {
      const newMessage = new Message({ name, email, message });
      await newMessage.save();
      console.log(`💾 Saved message from ${name} to MongoDB`);
    }

    res.json({ success: true, message: 'Message saved successfully!' });
  } catch (error) {
    console.error('Database save error:', error);
    res.status(500).json({ error: 'Failed to save message.' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Dharun's portfolio running at http://localhost:${PORT}`);
  });
}

module.exports = app;
