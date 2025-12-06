const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d', // 7 days expiration
  });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      res.status(400);
      throw new Error('Please provide all fields');
    }

    // Check if user exists
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    // Create user
    const user = await User.create({
      username,
      email,
      password,
    });

    if (user) {
      // Do NOT send token on registration - user must login
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        message: 'Registration successful! Please login with your credentials.',
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch (error) {
    res.status(res.statusCode || 500).json({ message: error.message });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(`
🔐 LOGIN ATTEMPT:
   Email: ${email}
   Password Provided: ${password ? 'YES' : 'NO'}
   Password Length: ${password ? password.length : 0}
   Timestamp: ${new Date().toISOString()}
    `);

    if (!email || !password) {
      console.log('❌ Missing credentials');
      return res.status(400).json({ 
        message: 'Please provide email and password',
        code: 'MISSING_CREDENTIALS'
      });
    }

    // Find user by email
    const user = await User.findOne({ email });
    console.log(`👤 User search result:`, {
      found: !!user,
      email: email,
      userInDB: user ? user.email : 'NOT_FOUND'
    });

    if (!user) {
      console.log('❌ User not found in database');
      return res.status(401).json({ 
        message: 'Invalid email or password',
        code: 'USER_NOT_FOUND'
      });
    }

    // Check password
    const isPasswordMatch = await user.matchPassword(password);
    console.log('🔑 Password match:', isPasswordMatch);

    if (isPasswordMatch) {
      const token = generateToken(user._id);
      console.log('✅ Login successful for:', email);
      console.log('🎫 Token generated:', token.substring(0, 20) + '...');
      
      return res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        token: token,
      });
    } else {
      console.log('❌ Password mismatch for:', email);
      return res.status(401).json({ 
        message: 'Invalid email or password',
        code: 'INVALID_PASSWORD'
      });
    }
  } catch (error) {
    console.error('🚨 LOGIN ERROR:', error);
    return res.status(500).json({ 
      message: error.message,
      code: 'SERVER_ERROR'
    });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    
    if (user) {
      res.json(user);
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    res.status(res.statusCode || 500).json({ message: error.message });
  }
};

// @desc    Delete user account
// @route   DELETE /api/auth/account
// @access  Private
const deleteAccount = async (req, res) => {
  try {
    const userId = req.user._id;
    
    console.log('🗑️ Deleting account for user:', userId);
    
    // Delete all user's vault secrets
    const VaultSecret = require('../models/VaultSecret');
    const deletedSecrets = await VaultSecret.deleteMany({ user: userId });
    console.log(`✅ Deleted ${deletedSecrets.deletedCount} vault secrets`);
    
    // Delete user account
    await User.findByIdAndDelete(userId);
    console.log('✅ User account deleted successfully');
    
    res.json({ 
      message: 'Account and all data deleted successfully',
      deletedSecrets: deletedSecrets.deletedCount
    });
  } catch (error) {
    console.error('❌ Delete account error:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  deleteAccount,
};
