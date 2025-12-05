import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Lock, Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import useAuthStore from '../../store/useAuthStore';

const PublicLayout = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-void-black text-silver flex flex-col">
      {/* Glassmorphic Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="glass-navbar sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <Shield className="w-10 h-10 text-gold group-hover:animate-pulse-glow transition-all" />
                <Lock className="w-4 h-4 text-gold absolute bottom-0 right-0" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-rajdhani font-bold text-gold glow-gold">
                  SENTINEL PRIME
                </span>
                <span className="text-xs text-silver/60 uppercase tracking-widest">
                  Cybernetic Fortress
                </span>
              </div>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className="nav-link-premium"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="nav-link-premium"
              >
                About
              </Link>
              <Link
                to="/developer"
                className="nav-link-premium"
              >
                Developer
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className="nav-link-premium"
                  >
                    Vault
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="btn-ghost text-sm"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn-ghost text-sm">
                    Login
                  </Link>
                  <Link to="/register" className="btn-gold text-sm">
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="glass-navbar mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="w-8 h-8 text-gold" />
                <span className="text-xl font-rajdhani font-bold text-gold">
                  SENTINEL PRIME
                </span>
              </div>
              <p className="text-sm text-silver/60">
                Military-Grade Encrypted Vault. Securing the Digital Frontier.
              </p>
            </div>

            {/* Links */}
            <div>
              <h3 className="font-rajdhani font-bold text-gold mb-4 uppercase">
                Navigation
              </h3>
              <div className="flex flex-col space-y-2">
                <Link to="/" className="text-sm hover:text-gold transition-colors">
                  Home
                </Link>
                <Link to="/about" className="text-sm hover:text-gold transition-colors">
                  About Us
                </Link>
                <Link to="/developer" className="text-sm hover:text-gold transition-colors">
                  Developer
                </Link>
                <Link to="/login" className="text-sm hover:text-gold transition-colors">
                  Access Vault
                </Link>
              </div>
            </div>

            {/* Social & Copyright */}
            <div>
              <h3 className="font-rajdhani font-bold text-gold mb-4 uppercase">
                Connect
              </h3>
              <div className="flex space-x-4 mb-4">
                <a
                  href="https://github.com/KushRadhanpura"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-silver hover:text-gold transition-colors p-2 rounded-lg hover:bg-gold/10"
                  title="GitHub - KushRadhanpura"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a
                  href="https://www.linkedin.com/in/kush-radhanpura-550393320/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-silver hover:text-gold transition-colors p-2 rounded-lg hover:bg-gold/10"
                  title="LinkedIn - Kush Radhanpura"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="mailto:kushsoni1675@gmail.com"
                  className="text-silver hover:text-gold transition-colors p-2 rounded-lg hover:bg-gold/10"
                  title="Email - kushsoni1675@gmail.com"
                >
                  <Mail className="w-6 h-6" />
                </a>
              </div>
              <p className="text-xs text-silver/50">
                © 2025 Kush Soni. All Rights Reserved.
              </p>
              <p className="text-xs text-silver/50 mt-1">
                AI Engineer & Full Stack Developer
              </p>
              <div className="mt-3 space-y-1">
                <p className="text-xs text-gold/70">📧 kushsoni1675@gmail.com</p>
                <p className="text-xs text-gold/70">🔗 github.com/KushRadhanpura</p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gold/20 text-center">
            <p className="text-xs text-silver/40">
              Built with ⚡ React · Node.js · MongoDB · Three.js
            </p>
            <p className="text-xs text-gold/60 mt-1">
              AES-256 Encryption · Military-Grade Security
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
