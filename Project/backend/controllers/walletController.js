const Search = require('../models/Search');
const {
  getWalletData,
  analyzeTransactions,
  formatTransactions
} = require('../services/blockchainService');

/**
 * @desc    Search and analyze wallet
 * @route   POST /api/wallet/search
 * @access  Private
 */
const searchWallet = async (req, res) => {
  try {
    const { address } = req.body;
    const userId = req.user._id;

    // Fetch wallet data from blockchain
    const walletData = await getWalletData(address);

    // Analyze transactions
    const analytics = analyzeTransactions(walletData.transactions, address);

    // Format transactions for display
    const formattedTransactions = formatTransactions(
      walletData.transactions,
      address
    );

    // Save search to database
    const search = await Search.create({
      userId,
      walletAddress: address,
      walletData: {
        balance: walletData.balance,
        totalTransactions: walletData.totalTransactions,
        totalReceived: walletData.totalReceived,
        totalSent: walletData.totalSent,
        firstTransactionDate: analytics.firstTransactionDate,
        lastTransactionDate: analytics.lastTransactionDate
      },
      apiStatus: 'success'
    });

    res.status(200).json({
      success: true,
      message: 'Wallet data fetched successfully',
      data: {
        address: walletData.address,
        balance: walletData.balance,
        balanceBTC: (walletData.balance / 100000000).toFixed(8),
        totalTransactions: walletData.totalTransactions,
        totalReceived: walletData.totalReceived,
        totalReceivedBTC: (walletData.totalReceived / 100000000).toFixed(8),
        totalSent: walletData.totalSent,
        totalSentBTC: (walletData.totalSent / 100000000).toFixed(8),
        firstTransactionDate: analytics.firstTransactionDate,
        lastTransactionDate: analytics.lastTransactionDate,
        transactions: formattedTransactions,
        analytics: {
          largestIncoming: analytics.largestIncoming,
          largestIncomingBTC: (analytics.largestIncoming / 100000000).toFixed(8),
          largestOutgoing: analytics.largestOutgoing,
          largestOutgoingBTC: (analytics.largestOutgoing / 100000000).toFixed(8),
          averageTransaction: analytics.averageTransaction,
          averageTransactionBTC: (analytics.averageTransaction / 100000000).toFixed(8),
          topConnectedWallets: analytics.topConnectedWallets,
          oneTimeWallets: analytics.oneTimeWallets,
          transactionTimeline: analytics.transactionTimeline
        },
        searchId: search._id
      }
    });
  } catch (error) {
    console.error('Search wallet error:', error);

    // Save failed search attempt
    try {
      await Search.create({
        userId: req.user._id,
        walletAddress: req.body.address,
        walletData: {
          balance: 0,
          totalTransactions: 0,
          totalReceived: 0,
          totalSent: 0
        },
        apiStatus: 'error',
        errorMessage: error.message
      });
    } catch (dbError) {
      console.error('Error saving failed search:', dbError);
    }

    res.status(500).json({
      success: false,
      message: 'Error fetching wallet data',
      error: error.message
    });
  }
};

/**
 * @desc    Get wallet info (without saving to search history)
 * @route   GET /api/wallet/:address
 * @access  Private
 */
const getWallet = async (req, res) => {
  try {
    const { address } = req.params;

    // Fetch wallet data from blockchain
    const walletData = await getWalletData(address);

    // Analyze transactions
    const analytics = analyzeTransactions(walletData.transactions, address);

    // Format transactions
    const formattedTransactions = formatTransactions(
      walletData.transactions,
      address
    );

    res.status(200).json({
      success: true,
      message: 'Wallet data fetched successfully',
      data: {
        address: walletData.address,
        balance: walletData.balance,
        balanceBTC: (walletData.balance / 100000000).toFixed(8),
        totalTransactions: walletData.totalTransactions,
        totalReceived: walletData.totalReceived,
        totalReceivedBTC: (walletData.totalReceived / 100000000).toFixed(8),
        totalSent: walletData.totalSent,
        totalSentBTC: (walletData.totalSent / 100000000).toFixed(8),
        firstTransactionDate: analytics.firstTransactionDate,
        lastTransactionDate: analytics.lastTransactionDate,
        transactions: formattedTransactions,
        analytics: {
          largestIncoming: analytics.largestIncoming,
          largestIncomingBTC: (analytics.largestIncoming / 100000000).toFixed(8),
          largestOutgoing: analytics.largestOutgoing,
          largestOutgoingBTC: (analytics.largestOutgoing / 100000000).toFixed(8),
          averageTransaction: analytics.averageTransaction,
          averageTransactionBTC: (analytics.averageTransaction / 100000000).toFixed(8),
          topConnectedWallets: analytics.topConnectedWallets,
          oneTimeWallets: analytics.oneTimeWallets,
          transactionTimeline: analytics.transactionTimeline
        }
      }
    });
  } catch (error) {
    console.error('Get wallet error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching wallet data',
      error: error.message
    });
  }
};

module.exports = {
  searchWallet,
  getWallet
};