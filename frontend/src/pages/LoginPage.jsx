import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Mail, Lock, User, Eye, EyeOff, LogIn, UserPlus } from 'lucide-react';
import PublicLayout from '../components/layout/PublicLayout';
import useAuthStore from '../store/useAuthStore';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, register, error, clearError, isLoading } = useAuthStore();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();

    try {
      if (isLogin) {
        await login({ email: formData.email, password: formData.password });
      } else {
        await register(formData);
      }
      // Navigation will happen automatically via App.jsx routing
      navigate('/dashboard');
    } catch (err) {
      console.error('Auth error:', err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    clearError();
    setFormData({ username: '', email: '', password: '' });
  };

  return (
    <PublicLayout>
      <div className="min-h-screen flex items-center justify-center px-4 py-20 grid-bg">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl w-full items-center">
          {/* Left Side - 3D Shield Animation */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-[400px] h-[400px]">
              {/* Rotating Shield */}
              <motion.div
                animate={{ rotateY: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 flex items-center justify-center"
                style={{ perspective: '1000px' }}
              >
                <Shield 
                  className="w-[350px] h-[350px] text-gold drop-shadow-2xl" 
                  style={{ 
                    filter: 'drop-shadow(0 0 60px rgba(0, 191, 255, 0.8)) drop-shadow(0 0 100px rgba(0, 191, 255, 0.5))',
                  }} 
                />
                {/* Lock in center */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Lock 
                      className="w-24 h-24 text-cyan-400" 
                      style={{ 
                        filter: 'drop-shadow(0 0 30px rgba(0, 191, 255, 0.8))',
                      }} 
                    />
                  </motion.div>
                </div>
              </motion.div>

              {/* Orbiting Particles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 bg-cyan-400 rounded-full"
                  style={{
                    top: '50%',
                    left: '50%',
                  }}
                  animate={{
                    rotate: 360,
                    x: Math.cos((i * Math.PI * 2) / 6) * 150,
                    y: Math.sin((i * Math.PI * 2) / 6) * 150,
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-md mx-auto lg:mx-0"
          >
            {/* Header */}
            <div className="text-center lg:text-left mb-8">
              <h1 className="text-5xl font-rajdhani font-bold mb-2">
                <span className="text-gradient-gold glow-gold-strong">
                  {isLogin ? 'WELCOME BACK' : 'JOIN SENTINEL'}
                </span>
              </h1>
              <p className="text-cyan-400/80 text-lg">
                {isLogin
                  ? '🔒 Access your encrypted vault'
                  : '🛡️ Create your secure account'}
              </p>
            </div>

            {/* Form Card */}
            <div className="glass-card border-gold/30 p-8 backdrop-blur-xl">
              {error && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg"
                >
                  <p className="text-red-400 text-sm font-mono">⚠️ {error}</p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Username (Register only) */}
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-rajdhani font-bold text-gold mb-2 uppercase tracking-wider">
                      <User className="w-4 h-4 inline mr-2" />
                      USERNAME
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      required={!isLogin}
                      className="w-full px-4 py-3 bg-dark-lighter/50 border border-gold/20 rounded-lg text-silver focus:border-gold focus:outline-none transition-all duration-300 focus:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                      placeholder="Choose a username"
                    />
                  </div>
                )}

                {/* Email */}
                <div>
                  <label className="block text-sm font-rajdhani font-bold text-gold mb-2 uppercase tracking-wider">
                    <Mail className="w-4 h-4 inline mr-2" />
                    EMAIL
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-dark-lighter/50 border border-gold/20 rounded-lg text-silver focus:border-gold focus:outline-none transition-all duration-300 focus:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-rajdhani font-bold text-gold mb-2 uppercase tracking-wider">
                    <Lock className="w-4 h-4 inline mr-2" />
                    PASSWORD
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-dark-lighter/50 border border-gold/20 rounded-lg text-silver focus:border-gold focus:outline-none transition-all duration-300 focus:shadow-[0_0_20px_rgba(212,175,55,0.3)] pr-12"
                      placeholder="Enter secure password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-silver/50 hover:text-gold transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-gradient-to-r from-gold to-gold/80 hover:from-gold/90 hover:to-gold text-dark font-rajdhani font-black text-xl rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_50px_rgba(212,175,55,0.6)] border border-gold"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-dark border-t-transparent rounded-full animate-spin mr-3"></div>
                      AUTHENTICATING...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      {isLogin ? (
                        <>
                          <LogIn className="w-5 h-5 mr-2" />
                          ENTER THE VAULT
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-5 h-5 mr-2" />
                          JOIN SENTINEL PRIME
                        </>
                      )}
                    </span>
                  )}
                </motion.button>
              </form>

              {/* Toggle Mode */}
              <div className="mt-6 text-center pt-6 border-t border-gold/20">
                <p className="text-silver/70">
                  {isLogin ? "Don't have an account?" : 'Already have an account?'}
                  <button
                    onClick={toggleMode}
                    className="ml-2 text-gold hover:text-gold/80 font-bold transition-colors glow-gold-subtle"
                  >
                    {isLogin ? 'Register Now' : 'Login Here'}
                  </button>
                </p>
              </div>
            </div>

            {/* Back to Home */}
            <div className="mt-6 text-center">
              <Link
                to="/"
                className="text-silver/60 hover:text-gold transition-colors text-sm inline-flex items-center"
              >
                <Shield className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default LoginPage;
