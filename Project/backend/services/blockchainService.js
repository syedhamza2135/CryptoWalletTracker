const axios = require('axios');

// Base URL for Blockstream API
const BLOCKCHAIN_API_BASE = 'https://blockstream.info/api';

/**
 * Fetch wallet data from Blockchain.info
 * @param {string} address - Bitcoin wallet address
 * @returns {object} Wallet data
 */
const getWalletData = async (address) => {
  try {
    // Get address stats from Blockstream
    const statsResponse = await axios.get(
      `${BLOCKCHAIN_API_BASE}/address/${address}`,
      { timeout: 10000 }
    );
    const stats = statsResponse.data;

    // Get recent transactions (last 50)
    const txsResponse = await axios.get(
      `${BLOCKCHAIN_API_BASE}/address/${address}/txs`,
      { timeout: 10000 }
    );
    const txs = txsResponse.data.slice(0, 50); // Get last 50 transactions

    // Parse and structure the data
    return {
      address: stats.address,
      balance: stats.chain_stats.funded_txo_sum - stats.chain_stats.spent_txo_sum, // Balance in satoshis
      totalTransactions: stats.chain_stats.tx_count,
      totalReceived: stats.chain_stats.funded_txo_sum,
      totalSent: stats.chain_stats.spent_txo_sum,
      transactions: txs
    };
  } catch (error) {
    console.error('Blockchain API error:', error.message);
    
    if (error.response) {
      // API responded with error
      const errorMsg = error.response?.data?.error || error.response?.data?.message || `HTTP ${error.response?.status}`;
      throw new Error(`Blockchain API error: ${errorMsg}`);
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
    if (!tx.status || !tx.vin || !tx.vout) return; // Skip invalid transactions

    const txTime = new Date(tx.status.block_time * 1000); // Blockstream uses Unix timestamp
    const monthKey = `${txTime.getFullYear()}-${String(txTime.getMonth() + 1).padStart(2, '0')}`;

    // Initialize monthly activity
    if (!monthlyActivity[monthKey]) {
      monthlyActivity[monthKey] = { count: 0, volume: 0 };
    }
    monthlyActivity[monthKey].count++;

    // Determine if transaction is incoming or outgoing and calculate amounts
    let isIncoming = false;
    let transactionAmount = 0;
    let isWalletInvolved = false;

    // Check if wallet is receiving (targetAddress in vout)
    const receivedAmount = tx.vout
      .filter(output => output.scriptpubkey_address === targetAddress)
      .reduce((sum, output) => sum + output.value, 0);

    if (receivedAmount > 0) {
      isIncoming = true;
      isWalletInvolved = true;
      transactionAmount = receivedAmount;
    }

    // Check if wallet is sending (targetAddress in vin prevout)
    const isSending = tx.vin.some(input => input.prevout?.scriptpubkey_address === targetAddress);

    if (isSending && !isIncoming) {
      isWalletInvolved = true;
      // For outgoing, amount is total sent from this wallet's inputs
      const sentAmount = tx.vin
        .filter(input => input.prevout?.scriptpubkey_address === targetAddress)
        .reduce((sum, input) => sum + (input.prevout?.value || 0), 0);
      transactionAmount = sentAmount;
    }

    // Skip if wallet not involved in this transaction
    if (!isWalletInvolved) return;

    // Track connected wallets
    tx.vout.forEach((output) => {
      const outputAddress = output.scriptpubkey_address;
      if (outputAddress && outputAddress !== targetAddress) {
        if (!connectedWallets[outputAddress]) {
          connectedWallets[outputAddress] = { count: 0, totalAmount: 0 };
        }
        connectedWallets[outputAddress].count++;
        connectedWallets[outputAddress].totalAmount += output.value;
      }
    });

    tx.vin.forEach((input) => {
      const inputAddress = input.prevout?.scriptpubkey_address;
      if (inputAddress && inputAddress !== targetAddress) {
        if (!connectedWallets[inputAddress]) {
          connectedWallets[inputAddress] = { count: 0, totalAmount: 0 };
        }
        connectedWallets[inputAddress].count++;
        connectedWallets[inputAddress].totalAmount += input.prevout?.value || 0;
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
  const sortedByTime = [...transactions].sort((a, b) => a.status.block_time - b.status.block_time);
  const firstTransactionDate = sortedByTime.length > 0 
    ? new Date(sortedByTime[0].status.block_time * 1000) 
    : null;
  const lastTransactionDate = sortedByTime.length > 0 
    ? new Date(sortedByTime[sortedByTime.length - 1].status.block_time * 1000) 
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
    if (!tx.txid || !tx.status || !tx.vin || !tx.vout) return null; // Skip invalid

    // Determine if incoming or outgoing and calculate amount
    let isIncoming = false;
    let amount = 0;

    // Check if receiving
    const receivedAmount = tx.vout
      .filter(output => output.scriptpubkey_address === targetAddress)
      .reduce((sum, output) => sum + output.value, 0);

    if (receivedAmount > 0) {
      isIncoming = true;
      amount = receivedAmount;
    } else {
      // Check if sending
      const isSending = tx.vin.some(input => input.prevout?.scriptpubkey_address === targetAddress);
      if (isSending) {
        amount = tx.vin
          .filter(input => input.prevout?.scriptpubkey_address === targetAddress)
          .reduce((sum, input) => sum + (input.prevout?.value || 0), 0);
      }
    }

    // Skip if not involved
    if (amount === 0) return null;

    return {
      hash: tx.txid,
      time: new Date(tx.status.block_time * 1000),
      amount: amount,
      type: isIncoming ? 'received' : 'sent',
      confirmations: tx.status.confirmed ? 'Confirmed' : 'Pending'
    };
  }).filter(tx => tx !== null);
};

module.exports = {
  getWalletData,
  analyzeTransactions,
  formatTransactions
};