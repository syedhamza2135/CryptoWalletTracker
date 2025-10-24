import client from './client';

export const getStats = () => 
  client.get('/admin/stats');

export const getUsers = () => 
  client.get('/admin/users');

export const getUserById = (id) => 
  client.get(`/admin/users/${id}`);

export const deleteUser = (id) => 
  client.delete(`/admin/users/${id}`);

export const getSearches = () => 
  client.get('/admin/searches');

export const getAnalytics = () => 
  client.get('/admin/analytics');