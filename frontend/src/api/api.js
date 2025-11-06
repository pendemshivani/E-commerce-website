// src/api/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // update if backend runs elsewhere
});

API.interceptors.request.use((config) => {
  const userId = localStorage.getItem('mock_user') || 'demoUser';
  if (config.method === 'get') {
    // Append userId for GET cart requests
    if (config.url.includes('/cart')) {
      config.url += `?userId=${userId}`;
    }
  } else if (config.data) {
    config.data.userId = userId; // attach to POST/PATCH
  }
  return config;
});

export default API;
