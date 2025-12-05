const VaultSecret = require('../models/VaultSecret');
const { encrypt, decrypt, generateSecurePassword } = require('../utils/encryption');

// @desc    Create new vault secret
// @route   POST /api/vault
// @access  Private
const createSecret = async (req, res) => {
  try {
    const { title, password, category, tags, websiteUrl, username, notes } = req.body;

    if (!title || !password) {
      res.status(400);
      throw new Error('Title and password are required');
    }

    // Encrypt the password with AES-256-CBC
    const { encrypted, iv } = encrypt(password);

    const secret = await VaultSecret.create({
      user: req.user._id,
      title,
      encryptedPassword: encrypted,
      iv,
      category: category || 'Other',
      tags: tags || [],
      websiteUrl: websiteUrl || '',
      username: username || '',
      notes: notes || '',
    });

    res.status(201).json({
      _id: secret._id,
      title: secret.title,
      category: secret.category,
      tags: secret.tags,
      websiteUrl: secret.websiteUrl,
      username: secret.username,
      createdAt: secret.createdAt,
    });
  } catch (error) {
    res.status(res.statusCode || 500).json({ message: error.message });
  }
};

// @desc    Get all vault secrets for user
// @route   GET /api/vault
// @access  Private
const getSecrets = async (req, res) => {
  try {
    const secrets = await VaultSecret.find({ user: req.user._id })
      .select('-encryptedPassword -iv')
      .sort({ createdAt: -1 })
      .lean();

    res.json(secrets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single vault secret (with decrypted password)
// @route   GET /api/vault/:id
// @access  Private
const getSecretById = async (req, res) => {
  try {
    const secret = await VaultSecret.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!secret) {
      res.status(404);
      throw new Error('Secret not found');
    }

    // Decrypt the password
    const decryptedPassword = decrypt(secret.encryptedPassword, secret.iv);

    res.json({
      _id: secret._id,
      title: secret.title,
      password: decryptedPassword,
      category: secret.category,
      tags: secret.tags,
      websiteUrl: secret.websiteUrl,
      username: secret.username,
      notes: secret.notes,
      createdAt: secret.createdAt,
      updatedAt: secret.updatedAt,
    });
  } catch (error) {
    res.status(res.statusCode || 500).json({ message: error.message });
  }
};

// @desc    Update vault secret
// @route   PUT /api/vault/:id
// @access  Private
const updateSecret = async (req, res) => {
  try {
    const secret = await VaultSecret.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!secret) {
      res.status(404);
      throw new Error('Secret not found');
    }

    const { title, password, category, tags, websiteUrl, username, notes } = req.body;

    secret.title = title || secret.title;
    secret.category = category || secret.category;
    secret.tags = tags || secret.tags;
    secret.websiteUrl = websiteUrl !== undefined ? websiteUrl : secret.websiteUrl;
    secret.username = username !== undefined ? username : secret.username;
    secret.notes = notes !== undefined ? notes : secret.notes;

    if (password) {
      const { encrypted, iv } = encrypt(password);
      secret.encryptedPassword = encrypted;
      secret.iv = iv;
    }

    const updatedSecret = await secret.save();

    res.json({
      _id: updatedSecret._id,
      title: updatedSecret.title,
      category: updatedSecret.category,
      tags: updatedSecret.tags,
      websiteUrl: updatedSecret.websiteUrl,
      username: updatedSecret.username,
      updatedAt: updatedSecret.updatedAt,
    });
  } catch (error) {
    res.status(res.statusCode || 500).json({ message: error.message });
  }
};

// @desc    Delete vault secret
// @route   DELETE /api/vault/:id
// @access  Private
const deleteSecret = async (req, res) => {
  try {
    const secret = await VaultSecret.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!secret) {
      res.status(404);
      throw new Error('Secret not found');
    }

    await secret.deleteOne();
    res.json({ message: 'Secret deleted successfully' });
  } catch (error) {
    res.status(res.statusCode || 500).json({ message: error.message });
  }
};

// @desc    Generate secure password
// @route   POST /api/vault/generate-password
// @access  Private
const generatePassword = async (req, res) => {
  try {
    const { length } = req.body;
    const passwordLength = length && length >= 12 && length <= 64 ? length : 24;
    
    const password = generateSecurePassword(passwordLength);
    
    res.json({ password });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createSecret,
  getSecrets,
  getSecretById,
  updateSecret,
  deleteSecret,
  generatePassword,
};
