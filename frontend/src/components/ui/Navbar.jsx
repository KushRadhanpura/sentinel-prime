import React from 'react';
import { Shield, LogOut, Home, Settings, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import useAuthStore from '../../store/useAuthStore';

const Navbar = () => {
  const { user, logout } = useAuthStore();

  return (
    <nav className="bg-gray-900/50 backdrop-blur-md border-b border-sentinel-blue/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Shield className="w-8 h-8 text-sentinel-blue" />
            <span className="text-2xl font-bold glow-blue">SENTINEL PRIME</span>
          </div>

          {/* User Info */}
          {user && (
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="p-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 transition-colors"
                title="Home"
              >
                <Home className="w-5 h-5" />
              </Link>
              <Link
                to="/profile"
                className="flex items-center space-x-2 p-2 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 transition-colors"
                title="Profile"
              >
                {user.profilePicture ? (
                  <img 
                    src={user.profilePicture} 
                    alt="Profile" 
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-cyan-400/30"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center ring-2 ring-cyan-400/30">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </Link>
              <Link
                to="/settings"
                className="p-2 rounded-lg bg-gray-500/10 hover:bg-gray-500/20 text-gray-400 transition-colors"
                title="Settings"
              >
                <Settings className="w-5 h-5" />
              </Link>
              <div className="text-right">
                <p className="text-sm font-medium text-sentinel-blue">{user.username}</p>
                <p className="text-xs text-gray-400">{user.role}</p>
              </div>
              <button
                onClick={logout}
                className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
