import { create } from 'zustand';
import axios from 'axios';

// ✅ FIXED: We define the Live Backend URL here
const API_URL = 'https://sentinel-prime-1a28.onrender.com';

const useAuthStore = create((set, get) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  // Set auth header
  setAuthHeader: (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
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
    const token = get().token;
    if (!token) {
      set({ isLoading: false });
      return;
    }

    console.log('🔐 Loading user with token...');
    get().setAuthHeader(token);
    
    try {
      // ✅ FIXED: Using full Render URL
      const response = await axios.get(`${API_URL}/api/auth/profile`);
      console.log('✅ User loaded successfully:', response.data);
      set({ user: response.data, isAuthenticated: true, isLoading: false });
    } catch (error) {
      console.error('❌ Failed to load user:', error.response?.status, error.response?.data);
      // Only logout if token is invalid (401), not on network errors
      if (error.response?.status === 401) {
        console.log('🔓 Token invalid, logging out...');
        get().logout();
      } else {
        console.log('⚠️ Network error, keeping token for retry');
        set({ isLoading: false });
      }
    }
  },

  // Clear error
  clearError: () => set({ error: null }),
}));

export default useAuthStore;