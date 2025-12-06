const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, deleteAccount, updateProfilePicture, removeProfilePicture, enable2FA } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/profile', protect, getUserProfile);
router.delete('/account', protect, deleteAccount);
router.put('/profile/picture', protect, updateProfilePicture);
router.delete('/profile/picture', protect, removeProfilePicture);
router.put('/enable-2fa', protect, enable2FA);

module.exports = router;
