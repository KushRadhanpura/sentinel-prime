import React, { useState } from 'react';
import { Settings as SettingsIcon, Lock, Bell, Shield, Eye, EyeOff, Save, AlertTriangle, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import Layout from '../components/Layout';

const Settings = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [settings, setSettings] = useState({
    notifications: true,
    twoFactor: localStorage.getItem('twoFactorEnabled') === 'true',
    autoLock: true,
    showPasswords: false,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleSavePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    // TODO: Add API call to change password
    console.log('Password change requested');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== 'DELETE') {
      alert('Please type DELETE to confirm');
      return;
    }
    
    try {
      console.log('🗑️ Deleting account...');
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://sentinel-prime-1a28.onrender.com'}/api/auth/account`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      if (response.ok) {
        alert('✅ Account deleted successfully. All your data has been permanently removed.');
        setShowDeleteModal(false);
        logout();
        window.location.href = '/login';
      } else {
        const error = await response.json();
        alert(`❌ Error: ${error.message}`);
      }
    } catch (error) {
      console.error('❌ Delete account error:', error);
      alert('❌ Failed to delete account. Please try again.');
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Header */}
          <div className="flex items-center space-x-4">
            <SettingsIcon className="w-12 h-12 text-cyan-400" />
            <div>
              <h1 className="text-3xl font-bold text-white">Settings</h1>
              <p className="text-gray-400">Manage your vault preferences</p>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-lg p-6 border border-cyan-500/20">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <Shield className="w-6 h-6 mr-2 text-cyan-400" />
              Security Settings
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Bell className="w-5 h-5 text-cyan-400" />
                  <div>
                    <p className="text-white font-medium">Email Notifications</p>
                    <p className="text-sm text-gray-400">Receive alerts for security events</p>
                  </div>
                </div>
                <button
                  onClick={() => handleToggle('notifications')}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    settings.notifications ? 'bg-cyan-500' : 'bg-gray-600'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.notifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Lock className="w-5 h-5 text-cyan-400" />
                  <div>
                    <p className="text-white font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-400">Add an extra layer of security</p>
                  </div>
                </div>
                {!settings.twoFactor && (
                  <button
                    onClick={() => navigate('/2fa-setup')}
                    className="px-4 py-2 rounded-lg font-medium transition-all bg-cyan-500 hover:bg-cyan-600 text-white"
                  >
                    Set Up Now
                  </button>
                )}
                {settings.twoFactor && (
                  <div className="px-4 py-2 rounded-lg font-medium bg-green-500/20 text-green-400 border border-green-500/50">
                    Enabled ✓
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Lock className="w-5 h-5 text-cyan-400" />
                  <div>
                    <p className="text-white font-medium">Auto-Lock Vault</p>
                    <p className="text-sm text-gray-400">Lock after 15 minutes of inactivity</p>
                  </div>
                </div>
                <button
                  onClick={() => handleToggle('autoLock')}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    settings.autoLock ? 'bg-cyan-500' : 'bg-gray-600'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.autoLock ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  {settings.showPasswords ? <Eye className="w-5 h-5 text-cyan-400" /> : <EyeOff className="w-5 h-5 text-cyan-400" />}
                  <div>
                    <p className="text-white font-medium">Show Passwords by Default</p>
                    <p className="text-sm text-gray-400">Reveal passwords when viewing secrets</p>
                  </div>
                </div>
                <button
                  onClick={() => handleToggle('showPasswords')}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    settings.showPasswords ? 'bg-cyan-500' : 'bg-gray-600'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.showPasswords ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-red-400" />
              <h2 className="text-xl font-bold text-red-400">Danger Zone</h2>
            </div>
            <p className="text-gray-400 mb-4">
              Delete your account and all associated data. This action cannot be undone.
            </p>
            <button 
              onClick={() => setShowDeleteModal(true)}
              className="px-6 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 font-bold rounded-lg transition-all border border-red-500/50"
            >
              Delete Account
            </button>
          </div>
        </motion.div>

        {/* Delete Account Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-slate-900 border border-red-500/30 rounded-xl p-6 max-w-md w-full"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                  <h3 className="text-xl font-bold text-red-400">Delete Account</h3>
                </div>
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setDeleteConfirmText('');
                  }}
                  className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-300">
                  This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
                </p>
                
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                  <p className="text-red-400 text-sm font-medium mb-2">
                    Please type <span className="font-bold">DELETE</span> to confirm:
                  </p>
                  <input
                    type="text"
                    value={deleteConfirmText}
                    onChange={(e) => setDeleteConfirmText(e.target.value)}
                    className="w-full bg-slate-800 text-white px-4 py-2 rounded-lg border border-red-500/30 focus:border-red-500 focus:outline-none"
                    placeholder="Type DELETE"
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      setShowDeleteModal(false);
                      setDeleteConfirmText('');
                    }}
                    className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteAccount}
                    disabled={deleteConfirmText !== 'DELETE'}
                    className="flex-1 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed border border-red-500/50"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Settings;
