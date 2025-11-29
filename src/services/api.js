import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to every request automatically
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('greenbites_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login if unauthorized
      localStorage.removeItem('greenbites_token');
      localStorage.removeItem('greenbites_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const api = {
  // Authentication
  login: async (email, password) => {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data;
  },

  register: async (userData) => {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  },

  verifyToken: async () => {
    const response = await apiClient.get('/auth/verify');
    return response.data;
  },

  // Users
  getUsers: async () => {
    const response = await apiClient.get('/users');
    return response.data;
  },

  getUser: async (userId) => {
    const response = await apiClient.get(`/users/${userId}`);
    return response.data;
  },

  updateUser: async (userId, userData) => {
    const response = await apiClient.put(`/users/${userId}`, userData);
    return response.data;
  },

  deleteUser: async (userId) => {
    const response = await apiClient.delete(`/users/${userId}`);
    return response.data;
  },

  // Donations
  getDonations: async () => {
    const response = await apiClient.get('/donations');
    return response.data;
  },

  getDonationsByDonor: async (donorId) => {
    const response = await apiClient.get(`/donations/donor/${donorId}`);
    return response.data;
  },

  getAvailableDonations: async () => {
    const response = await apiClient.get('/donations/available');
    return response.data;
  },

  createDonation: async (donationData) => {
    const response = await apiClient.post('/donations', donationData);
    return response.data;
  },

  updateDonation: async (donationId, donationData) => {
    const response = await apiClient.put(`/donations/${donationId}`, donationData);
    return response.data;
  },

  deleteDonation: async (donationId) => {
    const response = await apiClient.delete(`/donations/${donationId}`);
    return response.data;
  },

  // Requests
  getRequests: async () => {
    const response = await apiClient.get('/requests');
    return response.data;
  },

  getRequestsByRecipient: async (recipientId) => {
    const response = await apiClient.get(`/requests/recipient/${recipientId}`);
    return response.data;
  },

  createRequest: async (requestData) => {
    const response = await apiClient.post('/requests', requestData);
    return response.data;
  },

  updateRequest: async (requestId, requestData) => {
    const response = await apiClient.put(`/requests/${requestId}`, requestData);
    return response.data;
  },

  deleteRequest: async (requestId) => {
    const response = await apiClient.delete(`/requests/${requestId}`);
    return response.data;
  }
};

export default api;
