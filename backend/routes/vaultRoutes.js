const express = require('express');
const router = express.Router();
const {
  createSecret,
  getSecrets,
  getSecretById,
  updateSecret,
  deleteSecret,
  generatePassword,
} = require('../controllers/vaultController');
const { protect } = require('../middleware/authMiddleware');

// All routes are protected
router.use(protect);

// Password generator
router.post('/generate-password', generatePassword);

router.route('/')
  .post(createSecret)
  .get(getSecrets);

router.route('/:id')
  .get(getSecretById)
  .put(updateSecret)
  .delete(deleteSecret);

module.exports = router;
