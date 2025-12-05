require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // The key to fixing this
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');
const authRoutes = require('./routes/authRoutes');
const vaultRoutes = require('./routes/vaultRoutes');

// Initialize Express
const app = express();

// ====================================
// 1. RAMBAN CORS FIX (Allow Everything)
// ====================================
// This allows ANY website (Vercel, Localhost, Mobile) to talk to your server.
app.use(cors()); 

// ====================================
// 2. ROBUST DATABASE CONNECTION
// ====================================
const connectDB = async () => {
  try {
    console.log("Attempting DB Connection...");
    
    if (!process.env.MONGO_URI) {
      console.error("FATAL ERROR: MONGO_URI is undefined!");
      process.exit(1);
    }

    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

// ====================================
// LOGGING MIDDLEWARE
// ====================================
app.use((req, res, next) => {
  console.log(`🔍 ${req.method} ${req.path} | Origin: ${req.headers.origin || 'None'}`);
  next();
});

// Security Middleware (Relaxed for images/fonts)
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
});
app.use('/api', limiter);

// Body Parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/vault', vaultRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OPERATIONAL', db_status: mongoose.connection.readyState === 1 ? 'CONNECTED' : 'DISCONNECTED' });
});

app.get('/', (req, res) => {
  res.json({ message: '🛡️ Sentinel Prime API Active' });
});

// Error Handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});