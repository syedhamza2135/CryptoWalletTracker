/**
 * Data transformation utilities for wallet and analytics data
 */

/**
 * Format balance from satoshis to BTC
 * @param {number} satoshis - Balance in satoshis
 * @returns {string} Formatted BTC balance
 */
export const formatBalance = (satoshis) => {
  if (!satoshis || satoshis === 0) return '0.00000000';
  return (satoshis / 100000000).toFixed(8);
};

/**
 * Format large numbers with appropriate suffixes
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
export const formatLargeNumber = (num) => {
  if (!num || num === 0) return '0';

  const suffixes = ['', 'K', 'M', 'B', 'T'];
  let suffixIndex = 0;

  while (num >= 1000 && suffixIndex < suffixes.length - 1) {
    num /= 1000;
    suffixIndex++;
  }

  return `${num.toFixed(1)}${suffixes[suffixIndex]}`;
};

/**
 * Format transaction amount
 * @param {number} amount - Amount in satoshis
 * @param {boolean} showBTC - Whether to show BTC or satoshis
 * @returns {string} Formatted amount
 */
export const formatTransactionAmount = (amount, showBTC = true) => {
  if (!amount || amount === 0) return '0';

  if (showBTC) {
    return formatBalance(amount);
  }

  return amount.toLocaleString();
};

/**
 * Format date for display
 * @param {Date|string|number} date - Date to format
 * @param {Object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date
 */
export const formatDate = (date, options = {}) => {
  if (!date) return 'N/A';

  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };

  try {
    return new Intl.DateTimeFormat('en-US', { ...defaultOptions, ...options })
      .format(new Date(date));
  } catch (error) {
    console.warn('Date formatting error:', error);
    return 'Invalid Date';
  }
};

/**
 * Format relative time (e.g., "2 hours ago")
 * @param {Date|string|number} date - Date to compare
 * @returns {string} Relative time string
 */
export const formatRelativeTime = (date) => {
  if (!date) return 'N/A';

  try {
    const now = new Date();
    const past = new Date(date);
    const diffInSeconds = Math.floor((now - past) / 1000);

    const intervals = [
      { label: 'year', seconds: 31536000 },
      { label: 'month', seconds: 2592000 },
      { label: 'week', seconds: 604800 },
      { label: 'day', seconds: 86400 },
      { label: 'hour', seconds: 3600 },
      { label: 'minute', seconds: 60 },
      { label: 'second', seconds: 1 }
    ];

    for (const interval of intervals) {
      const count = Math.floor(diffInSeconds / interval.seconds);
      if (count >= 1) {
        return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
      }
    }

    return 'Just now';
  } catch (error) {
    console.warn('Relative time formatting error:', error);
    return 'Unknown';
  }
};

/**
 * Format wallet analytics for display
 * @param {Object} analytics - Raw analytics data
 * @returns {Object} Formatted analytics
 */
export const formatWalletAnalytics = (analytics) => {
  if (!analytics) return {};

  return {
    largestIncoming: {
      satoshis: analytics.largestIncoming || 0,
      btc: formatBalance(analytics.largestIncoming || 0)
    },
    largestOutgoing: {
      satoshis: analytics.largestOutgoing || 0,
      btc: formatBalance(analytics.largestOutgoing || 0)
    },
    averageTransaction: {
      satoshis: analytics.averageTransaction || 0,
      btc: formatBalance(analytics.averageTransaction || 0)
    },
    topConnectedWallets: (analytics.topConnectedWallets || []).map(wallet => ({
      ...wallet,
      totalVolumeBTC: formatBalance(wallet.totalVolume)
    })),
    oneTimeWallets: analytics.oneTimeWallets || 0,
    transactionTimeline: (analytics.transactionTimeline || []).map(item => ({
      ...item,
      volumeBTC: formatBalance(item.volume)
    })),
    firstTransactionDate: analytics.firstTransactionDate
      ? formatDate(analytics.firstTransactionDate, { year: 'numeric', month: 'short', day: 'numeric' })
      : 'N/A',
    lastTransactionDate: analytics.lastTransactionDate
      ? formatRelativeTime(analytics.lastTransactionDate)
      : 'N/A'
  };
};

/**
 * Format transaction for display
 * @param {Object} transaction - Raw transaction data
 * @returns {Object} Formatted transaction
 */
export const formatTransaction = (transaction) => {
  if (!transaction) return {};

  return {
    ...transaction,
    amountBTC: formatBalance(transaction.amount),
    timeFormatted: formatDate(transaction.time),
    timeRelative: formatRelativeTime(transaction.time),
    confirmationsText: transaction.confirmations === 'Confirmed' ? 'Confirmed' : 'Pending'
  };
};

/**
 * Sort transactions by date
 * @param {Array} transactions - Array of transactions
 * @param {string} order - 'asc' or 'desc'
 * @returns {Array} Sorted transactions
 */
export const sortTransactionsByDate = (transactions, order = 'desc') => {
  if (!Array.isArray(transactions)) return [];

  return [...transactions].sort((a, b) => {
    const dateA = new Date(a.time);
    const dateB = new Date(b.time);

    return order === 'desc' ? dateB - dateA : dateA - dateB;
  });
};

/**
 * Filter transactions by type
 * @param {Array} transactions - Array of transactions
 * @param {string} type - 'all', 'received', 'sent'
 * @returns {Array} Filtered transactions
 */
export const filterTransactionsByType = (transactions, type = 'all') => {
  if (!Array.isArray(transactions) || type === 'all') return transactions;

  return transactions.filter(tx => tx.type === type);
};

/**
 * Format wallet address for display (truncate middle)
 * @param {string} address - Wallet address
 * @param {number} startChars - Number of characters to show at start
 * @param {number} endChars - Number of characters to show at end
 * @returns {string} Formatted address
 */
export const formatAddress = (address, startChars = 8, endChars = 8) => {
  if (!address) return '';
  if (address.length <= startChars + endChars) return address;

  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
};

/**
 * Format currency amount (USD) from satoshis
 * @param {number} satoshis - Amount in satoshis
 * @param {number} btcPrice - Current BTC price in USD (default: 45000)
 * @returns {string} Formatted USD amount
 */
export const formatCurrency = (satoshis, btcPrice = 45000) => {
  if (!satoshis || satoshis === 0) return '$0.00';
  const usdValue = (satoshis / 100000000) * btcPrice;
  return `$${usdValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};