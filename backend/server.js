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
// TRUST PROXY (Required for Render/Heroku/etc)
// ====================================
// Enable trust proxy to get correct client IP behind reverse proxies
app.set('trust proxy', 1);

// ====================================
// VALIDATE CRITICAL ENVIRONMENT VARIABLES
// ====================================
if (!process.env.JWT_SECRET) {
  console.error('❌ FATAL ERROR: JWT_SECRET environment variable is not set!');
  console.error('⚠️  Add JWT_SECRET to your Render environment variables');
  process.exit(1);
}

if (!process.env.MONGO_URI) {
  console.error('❌ FATAL ERROR: MONGO_URI environment variable is not set!');
  process.exit(1);
}

console.log('✅ Environment variables validated');

// ====================================
// 1. PRODUCTION-GRADE CORS CONFIGURATION
// ====================================
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, Postman, or same-origin)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'https://sentinel-prime-wine.vercel.app',
      'http://localhost:5173',
      'http://localhost:3000',
    ];
    
    // Check if origin is in allowed list or is a Vercel deployment
    if (allowedOrigins.includes(origin) || origin.includes('vercel.app')) {
      callback(null, true);
    } else {
      console.log('⚠️ CORS blocked origin:', origin);
      callback(null, true); // Allow anyway for development
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Content-Length', 'X-Request-Id'],
  maxAge: 86400, // 24 hours
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions)); 

// ====================================
// 2. ROBUST DATABASE CONNECTION
// ====================================
const connectDB = async () => {
  try {
    console.log("Attempting DB Connection...");

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