const Search = require('../models/Search');

/**
 * @desc    Get user's search history
 * @route   GET /api/search/history
 * @access  Private
 */
const getSearchHistory = async (req, res) => {
  try {
    const userId = req.user._id;

    // Fetch user's searches, sorted by most recent
    const searches = await Search.find({ userId })
      .sort({ createdAt: -1 })
      .limit(50)
      .select('walletAddress walletData createdAt apiStatus');

    res.status(200).json({
      success: true,
      count: searches.length,
      data: {
        searches: searches.map(search => ({
          id: search._id,
          walletAddress: search.walletAddress,
          balance: search.walletData.balance,
          balanceBTC: (search.walletData.balance / 100000000).toFixed(8),
          totalTransactions: search.walletData.totalTransactions,
          searchDate: search.createdAt,
          status: search.apiStatus
        }))
      }
    });
  } catch (error) {
    console.error('Get search history error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching search history',
      error: error.message
    });
  }
};

/**
 * @desc    Get single search details
 * @route   GET /api/search/:id
 * @access  Private
 */
const getSearchById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    // Find search and verify ownership
    const search = await Search.findOne({ _id: id, userId });

    if (!search) {
      return res.status(404).json({
        success: false,
        message: 'Search not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        search: {
          id: search._id,
          walletAddress: search.walletAddress,
          walletData: search.walletData,
          searchDate: search.createdAt,
          status: search.apiStatus,
          errorMessage: search.errorMessage
        }
      }
    });
  } catch (error) {
    console.error('Get search by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching search',
      error: error.message
    });
  }
};

/**
 * @desc    Delete search from history
 * @route   DELETE /api/search/:id
 * @access  Private
 */
const deleteSearch = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    // Find and delete search (only if user owns it)
    const search = await Search.findOneAndDelete({ _id: id, userId });

    if (!search) {
      return res.status(404).json({
        success: false,
        message: 'Search not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Search deleted successfully'
    });
  } catch (error) {
    console.error('Delete search error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting search',
      error: error.message
    });
  }
};

/**
 * @desc    Clear all search history for user
 * @route   DELETE /api/search/history/clear
 * @access  Private
 */
const clearSearchHistory = async (req, res) => {
  try {
    const userId = req.user._id;

    const result = await Search.deleteMany({ userId });

    res.status(200).json({
      success: true,
      message: `Deleted ${result.deletedCount} searches from history`
    });
  } catch (error) {
    console.error('Clear search history error:', error);
    res.status(500).json({
      success: false,
      message: 'Error clearing search history',
      error: error.message
    });
  }
};

module.exports = {
  getSearchHistory,
  getSearchById,
  deleteSearch,
  clearSearchHistory
};