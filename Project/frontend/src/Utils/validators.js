export const isValidBitcoinAddress = (address) => {
  const p2pkhRegex = /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/;
  const bech32Regex = /^(bc1)[a-z0-9]{39,59}$/;
  return p2pkhRegex.test(address) || bech32Regex.test(address);
};

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password) => {
  return password && password.length >= 6;
};

export const isValidName = (name) => {
  return name && name.length >= 2 && name.length <= 50;
};