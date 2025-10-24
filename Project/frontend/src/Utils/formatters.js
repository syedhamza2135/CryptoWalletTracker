export const formatBTC = (satoshis) => {
  if (satoshis === null || satoshis === undefined) return '0 BTC';
  const btc = satoshis / 100000000;
  return `${btc.toFixed(8)} BTC`;
};

export const formatSatoshis = (satoshis) => {
  if (satoshis === null || satoshis === undefined) return '0';
  return satoshis.toLocaleString();
};

export const formatDate = (date) => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatDateTime = (date) => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const truncateAddress = (address, chars = 8) => {
  if (!address) return '';
  if (address.length <= chars * 2) return address;
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
};

export const formatNumber = (num) => {
  if (num === null || num === undefined) return '0';
  return num.toLocaleString();
};