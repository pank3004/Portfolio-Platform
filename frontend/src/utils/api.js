// API utility functions
// This file contains helper functions for making HTTP requests to the backend

import axios from 'axios';

// Base URL for API requests
const API_BASE_URL = 'https://portfolio-platform-paff.onrender.com/api';      // for production(put backend url)

// const API_BASE_URL = 'http://localhost:5000/api';    // for local


// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 120000, // 120 seconds timeout (for cold starts on Render)
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if user is logged in (for admin routes)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout - server might be sleeping');
    } else if (error.response?.status === 500) {
      console.error('Server error:', error.response.data);
    }
    return Promise.reject(error);
  }
);

// API functions

// Auth APIs
export const loginAdmin = (credentials) => api.post('/auth/login', credentials);
export const verifyOTP = (data, tempToken) => {
  return axios.post(`${API_BASE_URL}/auth/verify-otp`, data, {
    headers: {
      'Authorization': `Bearer ${tempToken}`,
      'Content-Type': 'application/json'
    },
    timeout: 120000 // 120 seconds timeout
  });
};
export const resendOTP = (tempToken) => {
  return axios.post(`${API_BASE_URL}/auth/resend-otp`, {}, {
    headers: {
      'Authorization': `Bearer ${tempToken}`,
      'Content-Type': 'application/json'
    },
    timeout: 120000 // 120 seconds timeout
  });
};
export const resetEmail = (data) => api.post('/auth/reset-email', data);
export const resetPassword = (data) => api.post('/auth/reset-password', data);
export const createAdmin = (data) => api.post('/auth/create-admin', data);
export const getAdminInfo = () => api.get('/auth/me');

// Project APIs
export const getAllProjects = () => api.get('/projects');
export const getProjectById = (id) => api.get(`/projects/${id}`);
export const getAllProjectsAdmin = () => api.get('/projects/admin/all');
export const createProject = (formData) => api.post('/projects', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const updateProject = (id, formData) => api.put(`/projects/${id}`, formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const deleteProject = (id) => api.delete(`/projects/${id}`);

// Study Material APIs
export const getAllMaterials = () => api.get('/study-materials');
export const getMaterialsByCategory = (category) => api.get(`/study-materials/category/${category}`);
export const getMaterialById = (id) => api.get(`/study-materials/${id}`);
export const getAllMaterialsAdmin = () => api.get('/study-materials/admin/all');
export const createMaterial = (formData) => api.post('/study-materials', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const updateMaterial = (id, formData) => api.put(`/study-materials/${id}`, formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const deleteMaterial = (id) => api.delete(`/study-materials/${id}`);

// Blog APIs
export const getAllBlogs = (type) => api.get('/blogs', { params: { type } });
export const getBlogById = (id) => api.get(`/blogs/${id}`);
export const getAllBlogsAdmin = () => api.get('/blogs/admin/all');
export const createBlog = (formData) => api.post('/blogs', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const updateBlog = (id, formData) => api.put(`/blogs/${id}`, formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const deleteBlog = (id) => api.delete(`/blogs/${id}`);

// AI Update APIs
export const getAllAIUpdates = () => api.get('/ai-updates');
export const getAIUpdateById = (id) => api.get(`/ai-updates/${id}`);
export const getAllAIUpdatesAdmin = () => api.get('/ai-updates/admin/all');
export const createAIUpdate = (formData) => api.post('/ai-updates', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const updateAIUpdate = (id, formData) => api.put(`/ai-updates/${id}`, formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const deleteAIUpdate = (id) => api.delete(`/ai-updates/${id}`);

export default api;
