const mongoose = require('mongoose');

const vaultSecretSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: 100,
    },
    encryptedPassword: {
      type: String,
      required: [true, 'Encrypted password is required'],
    },
    iv: {
      type: String,
      required: [true, 'IV is required for decryption'],
    },
    category: {
      type: String,
      enum: ['Social', 'Work', 'Finance', 'Shopping', 'Entertainment', 'Other'],
      default: 'Other',
    },
    tags: [String],
    websiteUrl: {
      type: String,
      trim: true,
    },
    username: {
      type: String,
      trim: true,
    },
    notes: {
      type: String,
      maxlength: 500,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient querying
vaultSecretSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('VaultSecret', vaultSecretSchema);
