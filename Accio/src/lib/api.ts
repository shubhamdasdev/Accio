import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  login: async (email: string, password: string) => {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', data.token);
    return data;
  },
  register: async (name: string, email: string, password: string) => {
    const { data } = await api.post('/auth/register', { name, email, password });
    localStorage.setItem('token', data.token);
    return data;
  },
  logout: () => {
    localStorage.removeItem('token');
  },
};

export const documents = {
  getAll: async () => {
    const { data } = await api.get('/documents');
    return data;
  },
  create: async (document: any) => {
    const { data } = await api.post('/documents', document);
    return data;
  },
  update: async (id: string, document: any) => {
    const { data } = await api.put(`/documents/${id}`, document);
    return data;
  },
  delete: async (id: string) => {
    await api.delete(`/documents/${id}`);
  },
};

export const chat = {
  getHistory: async () => {
    const { data } = await api.get('/chat');
    return data;
  },
  sendMessage: async (message: string) => {
    const { data } = await api.post('/chat', { message });
    return data;
  },
};