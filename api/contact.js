const mongoose = require('mongoose');
const Message = require('../models/Message');

let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  if (!process.env.MONGODB_URI) {
    console.warn('⚠️ MONGODB_URI is not defined.');
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    isConnected = db.connections[0].readyState === 1;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
  }
}

module.exports = async (req, res) => {
  // CORS Headers (just in case Vercel blocks it)
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields required' });
  }

  try {
    await connectDB();
    if (isConnected) {
      const newMessage = new Message({ name, email, message });
      await newMessage.save();
      return res.status(200).json({ success: true, message: 'Message saved successfully!' });
    } else {
      return res.status(500).json({ error: 'Database connection failed.' });
    }
  } catch (error) {
    console.error('Database save error:', error);
    return res.status(500).json({ error: 'Failed to save message.' });
  }
};
