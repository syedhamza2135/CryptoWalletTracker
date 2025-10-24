import client from './client';

export const searchWallet = (address) => 
  client.post('/wallet/search', { address });

export const getWallet = (address) => 
  client.get(`/wallet/${address}`);