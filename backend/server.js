require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');
const authRoutes = require('./routes/authRoutes');
const vaultRoutes = require('./routes/vaultRoutes');

// Initialize Express
const app = express();

// Connect to MongoDB
connectDB();

// ====================================
// LOGGING MIDDLEWARE - SEE ALL REQUESTS
// ====================================
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`
🔍 [${timestamp}] INCOMING REQUEST:
   Method: ${req.method}
   Path: ${req.path}
   Origin: ${req.headers.origin || 'No Origin'}
   IP: ${req.ip}
  `);
  next();
});

// ====================================
// SECURITY MIDDLEWARE
// ====================================
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS - EXPLICITLY ALLOW VITE FRONTEND
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      'http://localhost:5174', // Backup port
    ];
    
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      console.log(`✅ CORS ALLOWED: ${origin}`);
      callback(null, true);
    } else {
      console.log(`❌ CORS BLOCKED: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Handle preflight requests
app.options('*', cors());

// Rate limiting - Optimized for low resources
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP',
});
app.use('/api', limiter);

// Body Parser Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/vault', vaultRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  console.log('💚 Health check pinged');
  res.json({ 
    status: 'SENTINEL PRIME OPERATIONAL',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: '🛡️ Sentinel Prime API Active',
    version: '2.0.0',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      vault: '/api/vault',
    },
  });
});

// Error Handling
app.use(notFound);
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`
╔═══════════════════════════════════════════════╗
║     🛡️  SENTINEL PRIME - ACTIVE 🛡️           ║
╠═══════════════════════════════════════════════╣
║  Status: OPERATIONAL                          ║
║  Port: ${PORT}                                    ║
║  Mode: ${process.env.NODE_ENV || 'development'}                      ║
║  Security: MAXIMUM                            ║
║  CORS: http://localhost:5173                  ║
╚═══════════════════════════════════════════════╝

🔍 Monitoring all incoming requests...
  `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('[FATAL] Unhandled Promise Rejection:', err);
  process.exit(1);
});
