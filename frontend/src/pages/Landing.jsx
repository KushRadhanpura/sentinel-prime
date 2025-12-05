import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Lock, Key, Zap, Database, Eye, Github, Star } from 'lucide-react';
import PublicLayout from '../components/layout/PublicLayout';
import HoloImage from '../components/ui/HoloImage';

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Lock className="w-8 h-8" />,
      title: 'AES-256 Encryption',
      description: 'Military-grade encryption securing every byte of your data',
    },
    {
      icon: <Key className="w-8 h-8" />,
      title: 'Zero-Knowledge',
      description: 'Your data is encrypted before it even touches our servers',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Lightning Fast',
      description: 'Optimized for speed without compromising security',
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: 'Secure Vault',
      description: 'Centralized storage for all your sensitive credentials',
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: 'Privacy First',
      description: 'We cannot see your data. Only you have the keys.',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Battle-Tested',
      description: 'Built with industry-standard security protocols',
    },
  ];

  return (
    <PublicLayout>
      {/* GitHub Star Banner - Ultra Eye-Catching */}
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="relative glass-card border-2 border-cyan-400/60 bg-gradient-to-r from-cyan-500/15 via-blue-500/15 to-purple-500/15 overflow-hidden group hover:border-cyan-300 transition-all duration-500 mx-4 sm:mx-6 lg:mx-8 mt-6"
      >
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent animate-pulse"></div>
        
        {/* Glowing Border Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 via-blue-500/30 to-purple-500/30 blur-2xl"></div>
        </div>

        {/* Content */}
        <div className="relative flex flex-col sm:flex-row items-center justify-between p-4 sm:p-6 gap-4">
          <div className="flex items-center space-x-3 sm:space-x-6">
            <motion.div 
              className="flex items-center space-x-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 px-5 py-3 rounded-xl border-2 border-cyan-400/50 backdrop-blur-sm"
              animate={{ 
                boxShadow: [
                  "0 0 30px rgba(34, 211, 238, 0.4)",
                  "0 0 60px rgba(59, 130, 246, 0.6)",
                  "0 0 30px rgba(34, 211, 238, 0.4)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Github className="w-7 h-7 text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
              </motion.div>
              <div>
                <span className="font-rajdhani font-black text-cyan-300 text-xl block leading-tight drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]">
                  💎 LOVE SENTINEL PRIME?
                </span>
                <span className="hidden sm:block text-cyan-100/80 text-xs font-mono font-bold tracking-wide">
                  ⚡ JOIN THE ELITE SQUAD
                </span>
              </div>
            </motion.div>
            
            <div className="hidden lg:flex items-center space-x-3">
              <motion.div 
                className="w-3 h-3 bg-cyan-400 rounded-full"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-sm font-mono text-cyan-200/90 font-semibold">
                🚀 Star us on GitHub & get exclusive updates!
              </span>
            </div>
          </div>

          <motion.a
            href="https://github.com/KushRadhanpura/sentinel-prime"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ 
              scale: 1.1,
              boxShadow: "0 0 40px rgba(34, 211, 238, 0.8), 0 0 80px rgba(59, 130, 246, 0.5)"
            }}
            whileTap={{ scale: 0.95 }}
            className="relative flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 border-2 border-cyan-300 rounded-2xl transition-all duration-300 group/btn overflow-hidden shadow-[0_0_30px_rgba(34,211,238,0.5)]"
          >
            {/* Button Shine Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              animate={{ x: [-300, 300] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            />
            
            <motion.div
              animate={{ 
                rotate: [0, 20, -20, 0],
                scale: [1, 1.3, 1.3, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Star className="w-6 h-6 text-white fill-white drop-shadow-[0_0_12px_rgba(255,255,255,1)]" />
            </motion.div>
            <span className="relative font-rajdhani font-black text-white text-xl tracking-wider drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
              ⭐ STAR NOW
            </span>
            
            {/* Particle Effects */}
            <motion.div
              className="absolute -right-2 -top-2 w-3 h-3 bg-white rounded-full"
              animate={{ 
                scale: [0, 1.5, 0],
                opacity: [0, 1, 0]
              }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <motion.div
              className="absolute -left-2 -bottom-2 w-3 h-3 bg-white rounded-full"
              animate={{ 
                scale: [0, 1.5, 0],
                opacity: [0, 1, 0]
              }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
            />
          </motion.a>
        </div>

        {/* Bottom Accent Lines */}
        <div className="relative h-1 overflow-hidden">
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"
            animate={{ 
              x: ["-100%", "100%"]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden grid-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="inline-block">
                <span className="px-4 py-2 bg-gold/10 border border-gold/30 rounded-full text-gold text-sm font-rajdhani font-bold uppercase tracking-wider">
                  🛡️ Cybernetic Fortress
                </span>
              </div>

              <h1 className="text-6xl md:text-7xl font-rajdhani font-bold leading-tight">
                <span className="text-gradient-gold glow-gold-strong">THE FORT KNOX</span>
                <br />
                <span className="text-silver glow-silver">
                  OF YOUR
                </span>
                <br />
                <span className="text-gold glow-gold-strong">
                  DIGITAL LIFE
                </span>
              </h1>

              <p className="text-xl text-silver/80 max-w-xl font-inter">
                Military-grade encrypted vault protecting your passwords, secrets, and sensitive data
                with <span className="text-gold font-semibold">AES-256 encryption</span>.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 relative z-20">
                <Link
                  to="/login"
                  className="btn-gold text-center px-8 py-4 text-lg font-bold cursor-pointer inline-flex items-center justify-center"
                >
                  <Shield className="w-6 h-6 inline mr-2" />
                  Enter the Vault
                </Link>
                <Link
                  to="/about"
                  className="btn-ghost text-center px-8 py-4 text-lg font-bold cursor-pointer inline-flex items-center justify-center border border-gold/30 text-gold hover:bg-gold/10 transition-all duration-300 rounded-lg"
                >
                  Learn More
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gold/20">
                <div>
                  <p className="text-3xl font-rajdhani font-bold text-gold">256-bit</p>
                  <p className="text-sm text-silver/60">Encryption</p>
                </div>
                <div>
                  <p className="text-3xl font-rajdhani font-bold text-gold">100%</p>
                  <p className="text-sm text-silver/60">Private</p>
                </div>
                <div>
                  <p className="text-3xl font-rajdhani font-bold text-gold">∞</p>
                  <p className="text-sm text-silver/60">Secrets</p>
                </div>
              </div>
            </motion.div>

            {/* Right: 3D Cyber Lock Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative h-[600px] lg:h-[700px] flex items-center justify-center"
            >
              {/* Advanced Animated Shield */}
              <div className="relative w-[600px] h-[600px]">
                {/* Inner Shield Core with 3D Rotation */}
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ perspective: '1000px' }}
                >
                  <motion.div
                    animate={{ rotateY: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="relative"
                  >
                    <Shield className="w-[500px] h-[500px] text-gold drop-shadow-2xl" 
                      style={{ 
                        filter: 'drop-shadow(0 0 40px rgba(212, 175, 55, 0.8)) drop-shadow(0 0 80px rgba(212, 175, 55, 0.5))',
                      }} 
                    />
                    {/* Lock embedded in shield center */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <Lock className="w-32 h-32 text-gold/80" 
                        style={{ 
                          filter: 'drop-shadow(0 0 20px rgba(212, 175, 55, 0.6))',
                        }} 
                      />
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gold rounded-full blur-3xl animate-pulse-glow" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-armor/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-rajdhani font-bold text-gold mb-4">
              FORTRESS-GRADE SECURITY
            </h2>
            <p className="text-xl text-silver/70 max-w-2xl mx-auto">
              Every layer of Sentinel Prime is engineered for maximum protection
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 hover:border-gold/50 transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-gold/10 border border-gold/30 rounded-lg flex items-center justify-center mb-4 group-hover:glow-gold-strong transition-all">
                  <div className="text-gold">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-rajdhani font-bold text-gold mb-2">
                  {feature.title}
                </h3>
                <p className="text-silver/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-transparent to-gold/5" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Shield className="w-20 h-20 text-gold mx-auto mb-6 glow-gold-strong" />
            <h2 className="text-5xl font-rajdhani font-bold text-gold mb-6">
              READY TO SECURE YOUR DATA?
            </h2>
            <p className="text-xl text-silver/80 mb-8 max-w-2xl mx-auto">
              Join the elite ranks of users who trust Sentinel Prime with their most sensitive information.
            </p>
            <Link to="/register" className="btn-gold text-lg inline-block">
              <Lock className="w-6 h-6 inline mr-2" />
              Create Your Vault Now
            </Link>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Landing;
