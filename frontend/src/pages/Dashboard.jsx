import React, { useState, useEffect } from 'react';
import { Plus, Shield, Lock, Eye, EyeOff, Copy, Trash2, Key, Database, Activity, Zap, Star, Github } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import Layout from '../components/Layout';
import HolographicCube from '../components/3d/HolographicCube';

const Dashboard = () => {
  const [secrets, setSecrets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [revealedSecrets, setRevealedSecrets] = useState({});
  const [scanningSecret, setScanningSecret] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    weak: 0,
    strength: 256,
  });

  const [formData, setFormData] = useState({
    title: '',
    password: '',
    category: 'Social',
    tags: '',
    websiteUrl: '',
    username: '',
    notes: '',
  });

  useEffect(() => {
    fetchSecrets();
  }, []);

  const fetchSecrets = async () => {
    setLoading(true);
    try {
      console.log('📥 Fetching secrets from API...');
      console.log('🔑 Current token:', localStorage.getItem('token') ? 'EXISTS' : 'MISSING');
      console.log('🔑 Axios auth header:', axios.defaults.headers.common['Authorization'] ? 'SET' : 'NOT SET');
      
      const response = await axios.get('/api/vault');
      console.log('✅ Secrets fetched successfully');
      console.log('📊 Number of secrets:', response.data.length);
      console.log('📄 Secrets data:', response.data);
      
      setSecrets(response.data);
      setStats({
        total: response.data.length,
        weak: response.data.filter(s => s.passwordStrength === 'weak').length,
        strength: 256,
      });
      setLoading(false);
    } catch (error) {
      console.error('❌ Failed to fetch secrets:', error);
      console.error('Error response:', error.response);
      setLoading(false);
      
      if (error.response?.status === 401) {
        console.log('🚨 401 error - Session expired');
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        window.location.href = '/login';
      } else if (error.response?.status >= 500) {
        console.log('⚠️ Server error, will retry...');
        // Don't show error for server issues
      } else {
        console.log('⚠️ Network error');
      }
    }
  };

  const handleCreateSecret = async (e) => {
    e.preventDefault();
    
    console.log('🔵 Form submitted - Starting encryption process...');
    console.log('📝 Form data:', formData);
    
    setSubmitting(true);
    
    try {
      const tags = formData.tags.split(',').map(t => t.trim()).filter(Boolean);
      
      const payload = {
        ...formData,
        tags,
      };
      
      console.log('📤 Sending to API:', payload);
      
      const response = await axios.post('/api/vault', payload);
      
      console.log('✅ Secret created successfully:', response.data);
      console.log('🔄 Refreshing secrets list...');
      
      // Clear form and close modal
      setShowCreateModal(false);
      setFormData({
        title: '',
        password: '',
        category: 'Social',
        tags: '',
        websiteUrl: '',
        username: '',
        notes: '',
      });
      
      // Refetch secrets to update the list
      await fetchSecrets();
      
      // Success notification
      alert('✅ Secret encrypted and stored successfully!');
    } catch (error) {
      console.error('❌ Failed to create secret:', error);
      console.error('Error details:', error.response?.data || error.message);
      alert(`❌ Error: ${error.response?.data?.message || error.message || 'Failed to create secret. Please try again.'}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRevealSecret = async (id) => {
    setScanningSecret(id);
    
    // Simulate scanning animation
    setTimeout(async () => {
      try {
        const response = await axios.get(`/api/vault/${id}`);
        setRevealedSecrets(prev => ({
          ...prev,
          [id]: response.data.password,
        }));
        setScanningSecret(null);
      } catch (error) {
        console.error('Failed to reveal secret:', error);
        setScanningSecret(null);
      }
    }, 1500);
  };

  const handleCopyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDeleteSecret = async (id) => {
    if (confirm('⚠️ PERMANENT DELETION - Are you sure?')) {
      try {
        await axios.delete(`/api/vault/${id}`);
        fetchSecrets();
        setRevealedSecrets(prev => {
          const newRevealed = { ...prev };
          delete newRevealed[id];
          return newRevealed;
        });
      } catch (error) {
        console.error('Failed to delete secret:', error);
      }
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      Social: 'border-blue-500/60 bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-blue-600/10',
      Work: 'border-purple-500/60 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-purple-600/10',
      Finance: 'border-emerald-500/60 bg-gradient-to-br from-emerald-500/10 via-green-500/5 to-teal-600/10',
      Personal: 'border-amber-500/60 bg-gradient-to-br from-amber-500/10 via-yellow-500/5 to-orange-600/10',
      Shopping: 'border-rose-500/60 bg-gradient-to-br from-rose-500/10 via-pink-500/5 to-red-600/10',
      Entertainment: 'border-violet-500/60 bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-indigo-600/10',
      Other: 'border-slate-500/60 bg-gradient-to-br from-slate-500/10 via-gray-500/5 to-zinc-600/10',
    };
    return colors[category] || colors.Other;
  };

  const getCategoryBadgeColor = (category) => {
    const badgeColors = {
      Social: 'bg-blue-500/20 border-blue-400/60 text-blue-300',
      Work: 'bg-purple-500/20 border-purple-400/60 text-purple-300',
      Finance: 'bg-emerald-500/20 border-emerald-400/60 text-emerald-300',
      Personal: 'bg-amber-500/20 border-amber-400/60 text-amber-300',
      Shopping: 'bg-rose-500/20 border-rose-400/60 text-rose-300',
      Entertainment: 'bg-violet-500/20 border-violet-400/60 text-violet-300',
      Other: 'bg-slate-500/20 border-slate-400/60 text-slate-300',
    };
    return badgeColors[category] || badgeColors.Other;
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4 glow-gold-strong"></div>
            <p className="text-gold font-rajdhani font-bold text-xl animate-pulse">
              DECRYPTING VAULT...
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* GitHub Star Banner - Ultra Eye-Catching */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="relative glass-card border-2 border-cyan-400/60 bg-gradient-to-r from-cyan-500/15 via-blue-500/15 to-purple-500/15 overflow-hidden group hover:border-cyan-300 transition-all duration-500"
        >
          {/* Animated Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent animate-pulse"></div>
          
          {/* Glowing Border Effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 via-blue-500/30 to-purple-500/30 blur-2xl"></div>
          </div>

          {/* Content */}
          <div className="relative flex items-center justify-between p-5 sm:p-6">
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
              
              <div className="hidden md:flex items-center space-x-3">
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

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center"
        >
          <div>
            <h1 className="text-4xl font-rajdhani font-bold text-gold mb-2 glow-gold">
              THE VAULT
            </h1>
            <p className="text-silver/70">
              🔒 Zero-Knowledge Encrypted Storage | AES-256-CBC
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCreateModal(true)}
            className="btn-gold flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>NEW SECRET</span>
          </motion.button>
        </motion.div>

        {/* Stats Grid - Fixed at top, no collision */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card border-gold/30 p-6 text-center"
          >
            <Database className="w-8 h-8 text-gold mb-3 mx-auto" />
            <p className="text-4xl font-bold text-gold glow-gold mb-1">{stats.total}</p>
            <p className="text-xs text-silver/80 font-mono uppercase tracking-wider">Total Secrets</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card border-green-500/30 p-6 text-center"
          >
            <Activity className="w-8 h-8 text-green-500 mb-3 mx-auto" />
            <p className="text-4xl font-bold text-green-500 glow-green mb-1">100%</p>
            <p className="text-xs text-silver/80 font-mono uppercase tracking-wider">Security Level</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card border-red-500/30 p-6 text-center"
          >
            <Zap className="w-8 h-8 text-red-500 mb-3 mx-auto" />
            <p className="text-4xl font-bold text-red-500 mb-1">{stats.strength}</p>
            <p className="text-xs text-silver/80 font-mono uppercase tracking-wider">Bit Encryption</p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Sentinel Guardian Only */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card border-gold/30 p-6 sticky top-6"
            >
              <h2 className="text-lg font-rajdhani font-bold text-gold mb-2 flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                SENTINEL GUARDIAN
              </h2>
              <div className="h-[340px] relative">
                <HolographicCube />
              </div>
            </motion.div>
          </div>

          {/* Main Content - Secrets Grid (Scrollable, no collision) */}
          <div className="lg:col-span-3">
            {secrets.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-card border-gold/30 p-12 text-center"
              >
                <Lock className="w-16 h-16 text-gold/50 mx-auto mb-4" />
                <h3 className="text-2xl font-rajdhani font-bold text-gold mb-2">
                  VAULT EMPTY
                </h3>
                <p className="text-silver/70 mb-6">
                  No secrets stored yet. Create your first encrypted entry.
                </p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="btn-gold"
                >
                  CREATE FIRST SECRET
                </button>
              </motion.div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {secrets.map((secret, index) => (
                  <motion.div
                    key={secret._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`glass-card ${getCategoryColor(secret.category)} p-5 relative overflow-hidden group`}
                  >
                    {/* Scanning Animation Overlay */}
                    {scanningSecret === secret._id && (
                      <div className="absolute inset-0 bg-gradient-to-b from-gold/20 via-transparent to-gold/20 animate-scan-fast z-10"></div>
                    )}

                    {/* Category Badge */}
                    <div className="absolute top-2 right-2">
                      <span className={`px-3 py-1 border rounded-full text-xs font-bold tracking-wide backdrop-blur-sm ${getCategoryBadgeColor(secret.category)}`}>
                        {secret.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-gold/20 border border-gold/50 flex items-center justify-center flex-shrink-0">
                          <Key className="w-5 h-5 text-gold" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-rajdhani font-bold text-lg text-gold truncate">
                            {secret.title}
                          </h3>
                          {secret.username && (
                            <p className="text-sm text-silver/70 truncate">
                              @{secret.username}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Password Field */}
                      <div className="bg-void-black/50 border border-silver/20 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <code className="text-silver font-mono text-sm flex-1">
                            {revealedSecrets[secret._id] || '••••••••••••••••'}
                          </code>
                          <button
                            onClick={() =>
                              revealedSecrets[secret._id]
                                ? setRevealedSecrets(prev => {
                                    const newRevealed = { ...prev };
                                    delete newRevealed[secret._id];
                                    return newRevealed;
                                  })
                                : handleRevealSecret(secret._id)
                            }
                            disabled={scanningSecret === secret._id}
                            className="ml-2 p-1 hover:bg-gold/20 rounded transition-colors"
                          >
                            {scanningSecret === secret._id ? (
                              <div className="w-5 h-5 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
                            ) : revealedSecrets[secret._id] ? (
                              <EyeOff className="w-5 h-5 text-gold" />
                            ) : (
                              <Eye className="w-5 h-5 text-silver/70" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Tags */}
                      {secret.tags && secret.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {secret.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 bg-silver/10 border border-silver/30 rounded text-xs text-silver/80"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex items-center space-x-2 pt-2 border-t border-silver/10">
                        <button
                          onClick={() =>
                            handleCopyToClipboard(
                              revealedSecrets[secret._id] || 'Hidden',
                              secret._id
                            )
                          }
                          className={`flex-1 py-2 border rounded text-sm font-mono transition-all flex items-center justify-center space-x-1 ${
                            copiedId === secret._id
                              ? 'bg-green-500/20 border-green-500/50 text-green-400'
                              : 'bg-gold/10 hover:bg-gold/20 border-gold/30 text-gold'
                          }`}
                        >
                          <Copy className="w-4 h-4" />
                          <span>{copiedId === secret._id ? 'PASSWORD COPIED!' : 'COPY PASSWORD'}</span>
                        </button>
                        <button
                          onClick={() => handleDeleteSecret(secret._id)}
                          className="p-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Create Secret Modal */}
        <AnimatePresence>
          {showCreateModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-void-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowCreateModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="glass-card border-gold/50 p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <h2 className="text-2xl font-rajdhani font-bold text-gold mb-6 flex items-center">
                  <Plus className="w-6 h-6 mr-2" />
                  CREATE NEW SECRET
                </h2>

                <form onSubmit={handleCreateSecret} className="space-y-4">
                  <div>
                    <label className="block text-silver text-sm font-mono mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="w-full bg-void-black/50 border border-silver/30 rounded-lg px-4 py-3 text-silver focus:border-gold focus:outline-none transition-colors"
                      placeholder="e.g., Gmail Account"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-silver text-sm font-mono mb-2">
                        Username
                      </label>
                      <input
                        type="text"
                        value={formData.username}
                        onChange={(e) =>
                          setFormData({ ...formData, username: e.target.value })
                        }
                        className="w-full bg-void-black/50 border border-silver/30 rounded-lg px-4 py-3 text-silver focus:border-gold focus:outline-none transition-colors"
                        placeholder="user@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-silver text-sm font-mono mb-2">
                        Category
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({ ...formData, category: e.target.value })
                        }
                        className="w-full bg-void-black/50 border border-silver/30 rounded-lg px-4 py-3 text-silver focus:border-gold focus:outline-none transition-colors"
                      >
                        <option value="Social">Social</option>
                        <option value="Work">Work</option>
                        <option value="Finance">Finance</option>
                        <option value="Personal">Personal</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-silver text-sm font-mono mb-2">
                      Password *
                    </label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className="w-full bg-void-black/50 border border-silver/30 rounded-lg px-4 py-3 text-silver focus:border-gold focus:outline-none transition-colors font-mono"
                      placeholder="••••••••••••"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-silver text-sm font-mono mb-2">
                      Website URL
                    </label>
                    <input
                      type="url"
                      value={formData.websiteUrl}
                      onChange={(e) =>
                        setFormData({ ...formData, websiteUrl: e.target.value })
                      }
                      className="w-full bg-void-black/50 border border-silver/30 rounded-lg px-4 py-3 text-silver focus:border-gold focus:outline-none transition-colors"
                      placeholder="https://example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-silver text-sm font-mono mb-2">
                      Tags (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) =>
                        setFormData({ ...formData, tags: e.target.value })
                      }
                      className="w-full bg-void-black/50 border border-silver/30 rounded-lg px-4 py-3 text-silver focus:border-gold focus:outline-none transition-colors"
                      placeholder="important, work, 2fa"
                    />
                  </div>

                  <div>
                    <label className="block text-silver text-sm font-mono mb-2">
                      Notes
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
                      className="w-full bg-void-black/50 border border-silver/30 rounded-lg px-4 py-3 text-silver focus:border-gold focus:outline-none transition-colors"
                      placeholder="Additional information..."
                      rows={3}
                    />
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 btn-gold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <span className="flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-dark border-t-transparent rounded-full animate-spin mr-2"></div>
                          ENCRYPTING...
                        </span>
                      ) : (
                        'ENCRYPT & STORE'
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowCreateModal(false)}
                      className="flex-1 py-3 bg-silver/10 hover:bg-silver/20 border border-silver/30 rounded-lg text-silver transition-colors"
                    >
                      CANCEL
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Made with Love Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center pb-8"
        >
          <p className="text-2xl font-rajdhani font-bold text-gold glow-gold">
            Made with <span className="text-red-500 text-3xl animate-pulse">♥</span> Love
          </p>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Dashboard;
