import React, { useState } from 'react';
import { Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import useAuthStore from '../store/useAuthStore';

const LoginPage = ({ onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login({ email: formData.email, password: formData.password });
      } else {
        await register(formData);
      }
      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1628] via-[#0d1b2a] to-[#1b263b] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div 
            className="flex items-center justify-center mb-4"
            animate={{ rotateY: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Shield className="w-20 h-20 text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.8)]" />
          </motion.div>
          <h1 className="text-5xl font-bold text-white mb-2 animate-pulse drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]">
            SENTINEL PRIME
          </h1>
          <p className="text-cyan-300 font-semibold text-lg">Military-Grade Secure Vault</p>
        </div>

        {/* Login/Register Card */}
        <div className="bg-[#020817]/90 backdrop-blur-lg rounded-lg shadow-2xl p-8 border border-cyan-500/30">
          {/* Toggle Tabs */}
          <div className="flex gap-2 mb-6 bg-[#000000]/60 rounded-lg p-1">
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 rounded-md font-bold text-base transition-all ${
                isLogin
                  ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/50'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 rounded-md font-bold text-base transition-all ${
                !isLogin
                  ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/50'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Register
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-300 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#000000]/60 border border-cyan-500/40 rounded-lg focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 text-white placeholder-slate-500 transition-all"
                  placeholder="Enter username"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[#000000]/60 border border-cyan-500/40 rounded-lg focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 text-white placeholder-slate-500 transition-all"
                placeholder="Enter email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[#000000]/60 border border-cyan-500/40 rounded-lg focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 text-white placeholder-slate-500 transition-all"
                placeholder="Enter password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-cyan-500 hover:bg-cyan-400 text-white font-bold text-lg rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-6 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-400/40"
            >
              {loading ? 'Processing...' : isLogin ? 'Login' : 'Register'}
            </button>
          </form>

          {/* Security Badge */}
          <div className="mt-6 pt-4 border-t border-cyan-500/20">
            <div className="flex items-center justify-center gap-2 text-xs text-cyan-300/60">
              <Shield className="w-4 h-4" />
              <span>🔒 End-to-End Encrypted | 🛡️ Military-Grade Security</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
