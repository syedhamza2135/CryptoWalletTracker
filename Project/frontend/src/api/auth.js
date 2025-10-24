import client from './client';

export const register = (userData) => 
  client.post('/auth/register', userData);

export const login = (credentials) => 
  client.post('/auth/login', credentials);

export const getMe = () => 
  client.get('/auth/me');

export const logout = () => {
  localStorage.removeItem('token');
  return Promise.resolve();
};