const axios = require('axios');

// Base URL for Blockchain.info API
const BLOCKCHAIN_API_BASE = 'https://blockchain.info';

/**
 * Fetch wallet data from Blockchain.info
 * @param {string} address - Bitcoin wallet address
 * @returns {object} Wallet data
 */
const getWalletData = async (address) => {
  try {
    // Fetch basic address info
    const response = await axios.get(
      `${BLOCKCHAIN_API_BASE}/rawaddr/${address}`,
      {
        timeout: 10000, // 10 second timeout
        params: {
          limit: 50 // Get last 50 transactions
        }
      }
    );

    const data = response.data;

    // Parse and structure the data
    return {
      address: data.address,
      balance: data.final_balance, // Balance in satoshis
      totalTransactions: data.n_tx,
      totalReceived: data.total_received,
      totalSent: data.total_sent,
      transactions: data.txs || []
    };
  } catch (error) {
    console.error('Blockchain API error:', error.message);
    
    if (error.response) {
      // API responded with error
      throw new Error(`Blockchain API error: ${error.response.status}`);
    } else if (error.request) {
      // No response received
      throw new Error('No response from Blockchain API');
    } else {
      // Other errors
      throw new Error('Error fetching wallet data');
    }
  }
};

/**
 * Process transactions and extract analytics
 * @param {array} transactions - Array of transactions
 * @param {string} walletAddress - The wallet address being analyzed
 * @returns {object} Transaction analytics
 */
const analyzeTransactions = (transactions, walletAddress) => {
  if (!transactions || transactions.length === 0) {
    return {
      firstTransactionDate: null,
      lastTransactionDate: null,
      largestIncoming: 0,
      largestOutgoing: 0,
      averageTransaction: 0,
      topConnectedWallets: [],
      oneTimeWallets: 0,
      transactionTimeline: []
    };
  }

  // Keep original address case for proper comparisons
  const targetAddress = walletAddress;
  const connectedWallets = {}; // Track frequency of connected wallets
  const monthlyActivity = {}; // Track transactions by month

  let totalIncoming = 0;
  let totalOutgoing = 0;
  let incomingCount = 0;
  let outgoingCount = 0;
  let largestIncoming = 0;
  let largestOutgoing = 0;

  transactions.forEach((tx) => {
    const txTime = new Date(tx.time * 1000); // Convert Unix timestamp to Date
    const monthKey = `${txTime.getFullYear()}-${String(txTime.getMonth() + 1).padStart(2, '0')}`;

    // Initialize monthly activity
    if (!monthlyActivity[monthKey]) {
      monthlyActivity[monthKey] = { count: 0, volume: 0 };
    }
    monthlyActivity[monthKey].count++;

    // Determine if transaction is incoming or outgoing
    let isIncoming = false;
    let transactionAmount = 0;

    // Check outputs (where money goes)
    tx.out.forEach((output) => {
      const outputAddress = output.addr || '';
      
      if (outputAddress === targetAddress) {
        // Money coming TO our wallet
        isIncoming = true;
        transactionAmount += output.value;
      } else if (outputAddress) {
        // Track connected wallet
        if (!connectedWallets[outputAddress]) {
          connectedWallets[outputAddress] = { count: 0, totalAmount: 0 };
        }
        connectedWallets[outputAddress].count++;
        connectedWallets[outputAddress].totalAmount += output.value;
      }
    });

    // Check inputs (where money comes from)
    tx.inputs.forEach((input) => {
      const inputAddress = input.prev_out?.addr || '';
      
      if (inputAddress !== targetAddress && inputAddress) {
        // Track connected wallet
        if (!connectedWallets[inputAddress]) {
          connectedWallets[inputAddress] = { count: 0, totalAmount: 0 };
        }
        connectedWallets[inputAddress].count++;
        connectedWallets[inputAddress].totalAmount += transactionAmount;
      }
    });

    // Update statistics
    if (isIncoming) {
      totalIncoming += transactionAmount;
      incomingCount++;
      if (transactionAmount > largestIncoming) {
        largestIncoming = transactionAmount;
      }
    } else {
      totalOutgoing += transactionAmount;
      outgoingCount++;
      if (transactionAmount > largestOutgoing) {
        largestOutgoing = transactionAmount;
      }
    }

    monthlyActivity[monthKey].volume += transactionAmount;
  });

  // Calculate top connected wallets
  const topConnectedWallets = Object.entries(connectedWallets)
    .map(([address, data]) => ({
      address,
      transactionCount: data.count,
      totalVolume: data.totalAmount
    }))
    .sort((a, b) => b.totalVolume - a.totalVolume)
    .slice(0, 10);

  // Count one-time wallets
  const oneTimeWallets = Object.values(connectedWallets).filter(
    (wallet) => wallet.count === 1
  ).length;

  // Prepare timeline data
  const transactionTimeline = Object.entries(monthlyActivity)
    .map(([month, data]) => ({
      month,
      count: data.count,
      volume: data.volume
    }))
    .sort((a, b) => a.month.localeCompare(b.month));

  // Get first and last transaction dates
  const sortedByTime = [...transactions].sort((a, b) => a.time - b.time);
  const firstTransactionDate = sortedByTime.length > 0 
    ? new Date(sortedByTime[0].time * 1000) 
    : null;
  const lastTransactionDate = sortedByTime.length > 0 
    ? new Date(sortedByTime[sortedByTime.length - 1].time * 1000) 
    : null;

  // Calculate average transaction
  const totalTransactions = incomingCount + outgoingCount;
  const averageTransaction = totalTransactions > 0 
    ? (totalIncoming + totalOutgoing) / totalTransactions 
    : 0;

  return {
    firstTransactionDate,
    lastTransactionDate,
    largestIncoming,
    largestOutgoing,
    averageTransaction,
    topConnectedWallets,
    oneTimeWallets,
    transactionTimeline
  };
};

/**
 * Format transaction for frontend display
 * @param {array} transactions - Array of transactions
 * @param {string} walletAddress - The wallet address
 * @returns {array} Formatted transactions
 */
const formatTransactions = (transactions, walletAddress) => {
  if (!transactions || transactions.length === 0) return [];

  // Keep original address case for proper comparisons
  const targetAddress = walletAddress;

  return transactions.slice(0, 50).map((tx) => {
    // Determine if incoming or outgoing
    let isIncoming = false;
    let amount = 0;

    tx.out.forEach((output) => {
      if (output.addr && output.addr === targetAddress) {
        isIncoming = true;
        amount += output.value;
      }
    });

    if (!isIncoming) {
      tx.out.forEach((output) => {
        amount += output.value;
      });
    }

    return {
      hash: tx.hash,
      time: new Date(tx.time * 1000),
      amount: amount,
      type: isIncoming ? 'received' : 'sent',
      confirmations: tx.block_height ? 'Confirmed' : 'Pending'
    };
  });
};

module.exports = {
  getWalletData,
  analyzeTransactions,
  formatTransactions
};