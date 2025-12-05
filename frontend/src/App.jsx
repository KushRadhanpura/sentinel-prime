import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from './store/useAuthStore';

// Page Imports
import Landing from './pages/Landing';
import About from './pages/About';
import Developer from './pages/Developer';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import TwoFactorSetup from './pages/TwoFactorSetup';

function App() {
  const { isAuthenticated, loadUser, token, user } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('🚀 App initializing...');
    console.log('🔑 Token in localStorage:', localStorage.getItem('token') ? 'EXISTS' : 'NONE');
    console.log('🔑 Token in store:', token ? 'EXISTS' : 'NONE');
    console.log('🔐 Is authenticated:', isAuthenticated);
    console.log('👤 User:', user ? user.username : 'NONE');
    
    // Try to load the user from the token in local storage
    loadUser().finally(() => {
      console.log('✅ User load complete');
      console.log('🔐 Final auth state:', isAuthenticated);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a1628] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-cyan-400 font-bold text-xl tracking-widest">
            INITIALIZING SENTINEL PRIME...
          </p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/developer" element={<Developer />} />

        {/* Auth Routes - Redirect to Dashboard if already logged in */}
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />}
        />
        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />}
        />

        {/* Protected Routes - Redirect to Login if NOT logged in */}
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/settings"
          element={isAuthenticated ? <Settings /> : <Navigate to="/login" />}
        />
        <Route
          path="/2fa-setup"
          element={isAuthenticated ? <TwoFactorSetup /> : <Navigate to="/login" />}
        />

        {/* Catch all - 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;