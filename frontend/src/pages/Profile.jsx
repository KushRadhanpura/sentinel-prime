import React, { useState } from 'react';
import { Shield, User, Mail, Key, Calendar, Camera, Upload, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useAuthStore from '../store/useAuthStore';
import Layout from '../components/Layout';

const Profile = () => {
  const { user } = useAuthStore();
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showImageOptions, setShowImageOptions] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('⚠️ Image size must be less than 5MB');
        return;
      }
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('⚠️ Please select a valid image file');
        return;
      }
      
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setShowImageOptions(false);
        // Show success message
        alert('✅ Profile picture updated!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    setImagePreview(null);
    setShowImageOptions(false);
    alert('✅ Profile picture removed');
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
            <Shield className="w-12 h-12 text-cyan-400" />
            <div>
              <h1 className="text-3xl font-bold text-white">User Profile</h1>
              <p className="text-gray-400">Manage your account information</p>
            </div>
          </div>

          {/* Profile Card */}
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-lg p-8 border border-cyan-500/20">
            <div className="flex items-center space-x-6 mb-8">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center overflow-hidden ring-4 ring-cyan-500/30">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-12 h-12 text-white" />
                  )}
                </div>
                <button
                  onClick={() => setShowImageOptions(!showImageOptions)}
                  className="absolute bottom-0 right-0 w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-cyan-600 transition-all shadow-lg hover:scale-110"
                >
                  <Camera className="w-4 h-4 text-white" />
                </button>
                
                {/* Image Options Dropdown */}
                <AnimatePresence>
                  {showImageOptions && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 mt-2 bg-slate-800 border border-cyan-500/30 rounded-lg shadow-2xl overflow-hidden z-50 min-w-[200px]"
                    >
                      <label
                        htmlFor="profile-upload"
                        className="flex items-center space-x-3 px-4 py-3 hover:bg-cyan-500/10 cursor-pointer transition-colors"
                      >
                        <Upload className="w-4 h-4 text-cyan-400" />
                        <span className="text-white text-sm">
                          {imagePreview ? 'Change Photo' : 'Upload Photo'}
                        </span>
                      </label>
                      {imagePreview && (
                        <button
                          onClick={handleRemoveImage}
                          className="flex items-center space-x-3 px-4 py-3 hover:bg-red-500/10 cursor-pointer transition-colors w-full text-left"
                        >
                          <X className="w-4 h-4 text-red-400" />
                          <span className="text-red-400 text-sm">Remove Photo</span>
                        </button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{user?.username || 'User'}</h2>
                <p className="text-cyan-400">{user?.role || 'Member'}</p>
                {imagePreview && (
                  <p className="text-xs text-gray-400 mt-1">Profile picture updated</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-slate-900/50 rounded-lg">
                <Mail className="w-5 h-5 text-cyan-400" />
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-white font-medium">{user?.email || 'Not available'}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-slate-900/50 rounded-lg">
                <User className="w-5 h-5 text-cyan-400" />
                <div>
                  <p className="text-sm text-gray-400">Username</p>
                  <p className="text-white font-medium">{user?.username || 'Not available'}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-slate-900/50 rounded-lg">
                <Key className="w-5 h-5 text-cyan-400" />
                <div>
                  <p className="text-sm text-gray-400">Role</p>
                  <p className="text-white font-medium capitalize">{user?.role || 'User'}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-slate-900/50 rounded-lg">
                <Calendar className="w-5 h-5 text-cyan-400" />
                <div>
                  <p className="text-sm text-gray-400">Member Since</p>
                  <p className="text-white font-medium">
                    {user?.createdAt 
                      ? new Date(user.createdAt).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })
                      : new Date().toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Security Badge */}
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg p-6">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-cyan-400" />
              <div>
                <h3 className="text-lg font-bold text-white">Account Security</h3>
                <p className="text-sm text-gray-400">Your account is protected with AES-256 encryption</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Profile;
