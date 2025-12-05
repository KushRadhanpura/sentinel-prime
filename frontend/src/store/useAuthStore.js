import { create } from 'zustand';
import axios from 'axios';

// ✅ FIXED: We define the Live Backend URL here
const API_URL = 'https://sentinel-prime-1a28.onrender.com';

// Initialize token from localStorage on app start
const storedToken = localStorage.getItem('token');
if (storedToken) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
  console.log('🔐 Token found in localStorage and set in axios headers');
}

const useAuthStore = create((set, get) => ({
  user: null,
  token: storedToken || null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  // Set auth header
  setAuthHeader: (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
      console.log('✅ Token set in axios headers and localStorage');
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
      console.log('🗑️ Token removed from axios headers and localStorage');
    }
  },

  // Register
  register: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      // ✅ FIXED: Using full Render URL
      const response = await axios.post(`${API_URL}/api/auth/register`, userData);
      const { token, ...user } = response.data;
      
      get().setAuthHeader(token);
      set({ user, token, isAuthenticated: true, isLoading: false });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      set({ error: message, isLoading: false });
      throw new Error(message);
    }
  },

  // Login
  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      console.log('🔑 Attempting login...');
      // ✅ FIXED: Using full Render URL
      const response = await axios.post(`${API_URL}/api/auth/login`, credentials);
      const { token, ...user } = response.data;
      
      console.log('✅ Login successful, token received');
      get().setAuthHeader(token);
      set({ user, token, isAuthenticated: true, isLoading: false });
      console.log('✅ Auth state updated, user authenticated');
      return response.data;
    } catch (error) {
      console.error('❌ Login failed:', error.response?.data);
      const message = error.response?.data?.message || 'Login failed';
      set({ error: message, isLoading: false });
      throw new Error(message);
    }
  },

  // Logout
  logout: () => {
    get().setAuthHeader(null);
    set({ user: null, token: null, isAuthenticated: false, error: null });
  },

  // Load user from token
  loadUser: async () => {
    const token = get().token || localStorage.getItem('token');
    if (!token) {
      console.log('ℹ️ No token found, skipping user load');
      set({ isLoading: false, isAuthenticated: false });
      return;
    }

    console.log('🔐 Loading user with token...');
    // Ensure token is set in axios headers
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    try {
      const response = await axios.get(`${API_URL}/api/auth/profile`);
      console.log('✅ User loaded successfully:', response.data.username);
      set({ 
        user: response.data, 
        token,
        isAuthenticated: true, 
        isLoading: false 
      });
    } catch (error) {
      console.error('❌ Failed to load user:', error.response?.status, error.response?.data?.message);
      // Only logout on 401 (invalid token)
      if (error.response?.status === 401) {
        console.log('🔓 Token expired/invalid, clearing auth...');
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        set({ 
          user: null, 
          token: null, 
          isAuthenticated: false, 
          isLoading: false 
        });
      } else {
        console.log('⚠️ Network error, keeping current auth state');
        set({ isLoading: false });
      }
    }
  },

  // Clear error
  clearError: () => set({ error: null }),
}));

export default useAuthStore;