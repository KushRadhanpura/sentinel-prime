const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // Optimized for low-memory systems
      maxPoolSize: 10,
      minPoolSize: 2,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log(`[SENTINEL] MongoDB Connected: ${conn.connection.host}`);
    
    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('[SENTINEL] MongoDB connection closed');
      process.exit(0);
    });
  } catch (error) {
    console.error(`[SENTINEL] MongoDB Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
