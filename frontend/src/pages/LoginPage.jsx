import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// =====================================================
// 🛡️ SENTINEL PRIME: THE RAMBAN FIX
// =====================================================
import axios from 'axios';

// This forces EVERY request to go to your Render Backend
axios.defaults.baseURL = 'https://sentinel-prime-1a28.onrender.com';

// This allows cookies/tokens to work
axios.defaults.withCredentials = true; 

console.log("✅ Sentinel Prime Connected to: " + axios.defaults.baseURL);
// =====================================================

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)