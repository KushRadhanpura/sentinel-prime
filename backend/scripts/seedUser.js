require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const createTestUser = async () => {
  try {
    console.log('🌱 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Check if user already exists
    const existingUser = await User.findOne({ email: 'test@sentinel.com' });
    
    if (existingUser) {
      console.log('ℹ️ Test user already exists:', existingUser.email);
      console.log('📧 Email:', existingUser.email);
      console.log('👤 Username:', existingUser.username);
      process.exit(0);
    }

    // Create test user
    const user = await User.create({
      username: 'sentinel_admin',
      email: 'test@sentinel.com',
      password: 'Test@123',
    });

    console.log('✅ Test user created successfully!');
    console.log('═══════════════════════════════════');
    console.log('📧 Email: test@sentinel.com');
    console.log('🔑 Password: Test@123');
    console.log('👤 Username:', user.username);
    console.log('🆔 User ID:', user._id);
    console.log('═══════════════════════════════════');
    console.log('');
    console.log('🎯 Use these credentials to login!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

createTestUser();
