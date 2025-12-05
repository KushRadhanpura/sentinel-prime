import { create } from 'zustand';
import axios from 'axios';

// DON'T set baseURL - let Vite proxy handle it
// axios.defaults.baseURL will interfere with the proxy

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
      const response = await axios.post('/api/auth/register', userData);
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
      const response = await axios.post('/api/auth/login', credentials);
      const { token, ...user } = response.data;
      
      get().setAuthHeader(token);
      set({ user, token, isAuthenticated: true, isLoading: false });
      return response.data;
    } catch (error) {
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
    if (!token) return;

    get().setAuthHeader(token);
    try {
      const response = await axios.get('/api/auth/profile');
      set({ user: response.data, isAuthenticated: true });
    } catch (error) {
      get().logout();
    }
  },

  // Clear error
  clearError: () => set({ error: null }),
}));

export default useAuthStore;
