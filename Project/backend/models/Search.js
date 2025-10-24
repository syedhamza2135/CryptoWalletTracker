const mongoose = require('mongoose');

const searchSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
    index: true
  },
  walletAddress: {
    type: String,
    required: [true, 'Wallet address is required'],
    trim: true,
    index: true,
    minlength: [20, 'Wallet address must be at least 20 characters'],
    maxlength: [100, 'Wallet address must be at most 100 characters']
  },
  // Snapshot of wallet data at time of search
  walletData: {
    balance: {
      type: Number,
      default: 0,
      min: [0, 'Balance cannot be negative']
    },
    totalTransactions: {
      type: Number,
      default: 0,
      min: [0, 'Total transactions cannot be negative']
    },
    totalReceived: {
      type: Number,
      default: 0,
      min: [0, 'Total received cannot be negative']
    },
    totalSent: {
      type: Number,
      default: 0,
      min: [0, 'Total sent cannot be negative']
    },
    firstTransactionDate: {
      type: Date,
      default: null
    },
    lastTransactionDate: {
      type: Date,
      default: null
    }
  },
  // API response status for debugging
  apiStatus: {
    type: String,
    enum: ['success', 'error', 'partial'],
    default: 'success'
  },
  // Error message if API call failed
  errorMessage: {
    type: String,
    default: null
  }
}, {
  timestamps: true  // Adds createdAt and updatedAt
});

// Compound indexes for better query performance
searchSchema.index({ userId: 1, createdAt: -1 });  // User history (newest first)
searchSchema.index({ walletAddress: 1, createdAt: -1 });  // Wallet search frequency
searchSchema.index({ createdAt: -1 });  // Recent searches

// Virtual field: searchDate (alias for createdAt)
searchSchema.virtual('searchDate').get(function() {
  return this.createdAt;
});

// Virtual field: formatted BTC balance
searchSchema.virtual('balanceBTC').get(function() {
  return this.walletData.balance ? 
    (this.walletData.balance / 100000000).toFixed(8) : 
    '0.00000000';
});

// Ensure virtuals are included in JSON output
searchSchema.set('toJSON', { virtuals: true });
searchSchema.set('toObject', { virtuals: true });

// Static method: Get most searched addresses
searchSchema.statics.getMostSearchedAddresses = function(limit = 10) {
  return this.aggregate([
    {
      $group: {
        _id: '$walletAddress',
        searchCount: { $sum: 1 },
        lastSearched: { $max: '$createdAt' },
        uniqueUsers: { $addToSet: '$userId' }
      }
    },
    {
      $addFields: {
        uniqueUserCount: { $size: '$uniqueUsers' }
      }
    },
    {
      $sort: { searchCount: -1 }
    },
    {
      $limit: limit
    },
    {
      $project: {
        walletAddress: '$_id',
        searchCount: 1,
        lastSearched: 1,
        uniqueUserCount: 1,
        _id: 0
      }
    }
  ]);
};

// Static method: Get search statistics
searchSchema.statics.getSearchStats = function() {
  return this.aggregate([
    {
      $group: {
        _id: null,
        totalSearches: { $sum: 1 },
        uniqueWallets: { $addToSet: '$walletAddress' },
        uniqueUsers: { $addToSet: '$userId' }
      }
    },
    {
      $addFields: {
        uniqueWalletCount: { $size: '$uniqueWallets' },
        uniqueUserCount: { $size: '$uniqueUsers' }
      }
    },
    {
      $project: {
        totalSearches: 1,
        uniqueWalletCount: 1,
        uniqueUserCount: 1,
        _id: 0
      }
    }
  ]);
};

module.exports = mongoose.model('Search', searchSchema);