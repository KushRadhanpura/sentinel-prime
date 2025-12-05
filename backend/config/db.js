const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // FIXED: Changed MONGODB_URI to MONGO_URI to match Render
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // Optimized for low-memory systems (Free Tier)
      maxPoolSize: 10,
      minPoolSize: 2,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;