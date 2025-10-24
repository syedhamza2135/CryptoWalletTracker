import client from './client';

export const getProfile = () => 
  client.get('/user/profile');

export const updateProfile = (data) => 
  client.put('/user/profile', data);

export const changePassword = (passwords) => 
  client.put('/user/password', passwords);