import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth APIs
export const authAPI = {
  register: (data) => api.post('/api/auth/register', data),
  login: (data) => api.post('/api/auth/login', data),
  googleAuth: (data) => api.post('/api/auth/google', data),
  verifyEmail: (email) => api.get(`/api/auth/verify-email/${email}`),
};

// Interview APIs
export const interviewAPI = {
  getAll: () => api.get('/api/interviews'),
  create: (data) => api.post('/api/interviews', data),
  getById: (id) => api.get(`/api/interviews/${id}`),
  getQuestions: (id) => api.get(`/api/interviews/${id}/questions`),
};

// Question APIs
export const questionAPI = {
  submitAnswer: (id, data) => api.post(`/api/questions/${id}/answer`, data),
};

// Dashboard APIs
export const dashboardAPI = {
  getData: () => api.get('/api/dashboard'),
};

export default api;