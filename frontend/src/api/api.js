import axios from 'axios';

const base = process.env.REACT_APP_API_BASE || 'http://localhost:5000/api';

const API = axios.create({
  baseURL: base,
  timeout: 7000
});

export default API;
