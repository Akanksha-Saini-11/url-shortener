import axios from 'axios';
import { getToken } from '../utils/auth';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
});

API.interceptors.request.use((req) => {
  const token = getToken();
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const registerUser = (data) => API.post('/api/auth/register', data);
export const loginUser    = (data) => API.post('/api/auth/login', data);
export const shortenUrl   = (data) => API.post('/shorten', data);
export const getAllUrls   = ()     => API.get('/all');
export const deleteUrl = (id) => API.delete(`/delete/${id}`);