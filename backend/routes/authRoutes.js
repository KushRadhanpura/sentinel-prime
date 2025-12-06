const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, deleteAccount } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/profile', protect, getUserProfile);
router.delete('/account', protect, deleteAccount);

module.exports = router;
