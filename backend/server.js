require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose'); // Added this to debug connection here
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
// const connectDB = require('./config/db'); // Commented out to use direct connection
const { errorHandler, notFound } = require('./middleware/errorMiddleware');
const authRoutes = require('./routes/authRoutes');
const vaultRoutes = require('./routes/vaultRoutes');

// Initialize Express
const app = express();

// ====================================
// 1. ROBUST DATABASE CONNECTION
// ====================================
const connectDB = async () => {
  try {
    // Debug logging to see if Render is passing the variable
    console.log("Attempting DB Connection...");
    
    // Check if URI exists
    if (!process.env.MONGO_URI) {
      console.error("FATAL ERROR: MONGO_URI is undefined in environment variables!");
      console.error("Please check Render Dashboard -> Environment -> MONGO_URI");
      process.exit(1);
    }

    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

// Connect to MongoDB
connectDB();

// ====================================
// LOGGING MIDDLEWARE
// ====================================
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`🔍 [${timestamp}] ${req.method} ${req.path} | Origin: ${req.headers.origin || 'None'}`);
  next();
});

// ====================================
// SECURITY MIDDLEWARE
// ====================================
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// ====================================
// 2. FIXED CORS FOR VERCEL
// ====================================
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      // Add your PRODUCTION domains here automatically or allow all for testing
    ];
    
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // TEMPORARY FIX: Allow Vercel apps by checking if it includes 'vercel.app'
    // This is safer than '*' but easier than pasting the specific URL every time
    if (allowedOrigins.indexOf(origin) !== -1 || origin.includes('vercel.app') || origin.includes('render.com')) {
      callback(null, true);
    } else {
      console.log(`⚠️ CORS BLOCKED: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Handle preflight requests
app.options('*', cors());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: 'Too many requests from this IP',
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
  res.json({ 
    status: 'OPERATIONAL',
    timestamp: new Date().toISOString(),
    db_status: mongoose.connection.readyState === 1 ? 'CONNECTED' : 'DISCONNECTED'
  });
});

app.get('/', (req, res) => {
  res.json({ message: '🛡️ Sentinel Prime API Active v2.0' });
});

// Error Handling
app.use(notFound);
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.error('[FATAL] Unhandled Rejection:', err);
  process.exit(1);
});