import client from './client';

export const getHistory = () => 
  client.get('/search/history');

export const getSearchById = (id) => 
  client.get(`/search/${id}`);

export const deleteSearch = (id) => 
  client.delete(`/search/${id}`);

export const clearHistory = () => 
  client.delete('/search/history/clear');