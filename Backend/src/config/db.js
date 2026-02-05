const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;

    if (!uri) {
      console.error('MONGO_URI is not set in environment variables');
      process.exit(1);
    }

    await mongoose.connect(uri, {
      dbName: process.env.MONGO_DB_NAME || 'trafficguard',
    });

    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

