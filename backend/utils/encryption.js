const crypto = require('crypto');

// Military-Grade AES-256-CBC Encryption
// Uses Node's native crypto library for maximum security

const ALGORITHM = 'aes-256-cbc';
const IV_LENGTH = 16; // AES block size

// Derive a 32-byte key from the encryption key
const getKey = () => {
  const key = process.env.ENCRYPTION_KEY;
  if (!key) {
    throw new Error('ENCRYPTION_KEY not set');
  }
  // Ensure key is exactly 32 bytes
  return crypto.createHash('sha256').update(key).digest();
};

/**
 * Encrypt sensitive data using AES-256-CBC
 * @param {string} text - Plain text to encrypt
 * @returns {object} - { encrypted: string, iv: string }
 */
const encrypt = (text) => {
  try {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, getKey(), iv);
    
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    return {
      encrypted: encrypted,
      iv: iv.toString('hex')
    };
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Failed to encrypt data');
  }
};

/**
 * Decrypt sensitive data using AES-256-CBC
 * @param {string} encryptedText - Encrypted data (hex)
 * @param {string} ivHex - Initialization vector (hex)
 * @returns {string} - Decrypted plain text
 */
const decrypt = (encryptedText, ivHex) => {
  try {
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv(ALGORITHM, getKey(), iv);
    
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Failed to decrypt data');
  }
};

/**
 * Generate a cryptographically secure random password
 * @param {number} length - Password length (default: 24)
 * @returns {string} - Random password
 */
const generateSecurePassword = (length = 24) => {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
  let password = '';
  const randomBytes = crypto.randomBytes(length);
  
  for (let i = 0; i < length; i++) {
    password += charset[randomBytes[i] % charset.length];
  }
  
  return password;
};

module.exports = { encrypt, decrypt, generateSecurePassword };
