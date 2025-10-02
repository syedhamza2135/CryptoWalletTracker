const User = require('../models/User');
const Search = require('../models/Search');

/**
 * @desc    Get admin dashboard statistics
 * @route   GET /api/admin/stats
 * @access  Private/Admin
 */
const getDashboardStats = async (req, res) => {
  try {
    // Total users count
    const totalUsers = await User.countDocuments();

    // Total searches count
    const totalSearches = await Search.countDocuments();

    // Active users (logged in last 7 days)
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const activeUsers = await User.countDocuments({
      lastLogin: { $gte: sevenDaysAgo }
    });

    // Recent registrations (last 5 users)
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email createdAt role');

    // Recent searches (last 10)
    const recentSearches = await Search.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('userId', 'name email')
      .select('walletAddress walletData.balance createdAt userId');

    // Most searched addresses
    const mostSearched = await Search.getMostSearchedAddresses(10);

    // Get search statistics
    const searchStats = await Search.getSearchStats();

    res.status(200).json({
      success: true,
      data: {
        overview: {
          totalUsers,
          totalSearches,
          activeUsers,
          uniqueWallets: searchStats[0]?.uniqueWalletCount || 0
        },
        recentUsers: recentUsers.map(user => ({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          registeredAt: user.createdAt
        })),
        recentSearches: recentSearches.map(search => ({
          id: search._id,
          walletAddress: search.walletAddress,
          balance: search.walletData.balance,
          balanceBTC: (search.walletData.balance / 100000000).toFixed(8),
          searchedAt: search.createdAt,
          user: {
            id: search.userId?._id,
            name: search.userId?.name,
            email: search.userId?.email
          }
        })),
        mostSearchedAddresses: mostSearched.map(item => ({
          address: item.walletAddress,
          searchCount: item.searchCount,
          uniqueUsers: item.uniqueUserCount,
          lastSearched: item.lastSearched
        }))
      }
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard statistics',
      error: error.message
    });
  }
};

/**
 * @desc    Get all users
 * @route   GET /api/admin/users
 * @access  Private/Admin
 */
const getAllUsers = async (req, res) => {
  try {
    const { search, role, page = 1, limit = 20 } = req.query;

    // Build query
    const query = {};
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    if (role && role !== 'all') {
      query.role = role;
    }

    // Get total count
    const total = await User.countDocuments(query);

    // Get users with pagination
    const users = await User.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .select('-password');

    // Get search count for each user
    const usersWithStats = await Promise.all(
      users.map(async (user) => {
        const searchCount = await Search.countDocuments({ userId: user._id });
        return {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          isActive: user.isActive,
          lastLogin: user.lastLogin,
          createdAt: user.createdAt,
          searchCount
        };
      })
    );

    res.status(200).json({
      success: true,
      data: {
        users: usersWithStats,
        pagination: {
          total,
          page: parseInt(page),
          pages: Math.ceil(total / parseInt(limit)),
          limit: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message
    });
  }
};

/**
 * @desc    Get specific user details
 * @route   GET /api/admin/users/:id
 * @access  Private/Admin
 */
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Get user's search history
    const searches = await Search.find({ userId: id })
      .sort({ createdAt: -1 })
      .limit(20)
      .select('walletAddress walletData createdAt apiStatus');

    // Get user statistics
    const searchCount = await Search.countDocuments({ userId: id });

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          isActive: user.isActive,
          lastLogin: user.lastLogin,
          createdAt: user.createdAt
        },
        statistics: {
          totalSearches: searchCount
        },
        recentSearches: searches.map(search => ({
          id: search._id,
          walletAddress: search.walletAddress,
          balance: search.walletData.balance,
          balanceBTC: (search.walletData.balance / 100000000).toFixed(8),
          searchedAt: search.createdAt,
          status: search.apiStatus
        }))
      }
    });
  } catch (error) {
    console.error('Get user by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user details',
      error: error.message
    });
  }
};

/**
 * @desc    Delete user
 * @route   DELETE /api/admin/users/:id
 * @access  Private/Admin
 */
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Prevent admin from deleting themselves
    if (id === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: 'You cannot delete your own account'
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Delete user's searches (cascade delete)
    await Search.deleteMany({ userId: id });

    // Delete user
    await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'User and associated data deleted successfully'
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting user',
      error: error.message
    });
  }
};

/**
 * @desc    Get all searches (global)
 * @route   GET /api/admin/searches
 * @access  Private/Admin
 */
const getAllSearches = async (req, res) => {
  try {
    const { page = 1, limit = 20, address } = req.query;

    // Build query
    const query = {};
    if (address) {
      query.walletAddress = { $regex: address, $options: 'i' };
    }

    // Get total count
    const total = await Search.countDocuments(query);

    // Get searches with pagination
    const searches = await Search.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .populate('userId', 'name email');

    res.status(200).json({
      success: true,
      data: {
        searches: searches.map(search => ({
          id: search._id,
          walletAddress: search.walletAddress,
          balance: search.walletData.balance,
          balanceBTC: (search.walletData.balance / 100000000).toFixed(8),
          totalTransactions: search.walletData.totalTransactions,
          searchedAt: search.createdAt,
          status: search.apiStatus,
          user: {
            id: search.userId?._id,
            name: search.userId?.name,
            email: search.userId?.email
          }
        })),
        pagination: {
          total,
          page: parseInt(page),
          pages: Math.ceil(total / parseInt(limit)),
          limit: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get all searches error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching searches',
      error: error.message
    });
  }
};

/**
 * @desc    Get search analytics
 * @route   GET /api/admin/analytics
 * @access  Private/Admin
 */
const getSearchAnalytics = async (req, res) => {
  try {
    // Get overall statistics
    const stats = await Search.getSearchStats();

    // Get most searched addresses
    const mostSearched = await Search.getMostSearchedAddresses(20);

    // Get searches by day (last 7 days)
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    
    const searchesByDay = await Search.aggregate([
      {
        $match: {
          createdAt: { $gte: sevenDaysAgo }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        overview: {
          totalSearches: stats[0]?.totalSearches || 0,
          uniqueWallets: stats[0]?.uniqueWalletCount || 0,
          uniqueUsers: stats[0]?.uniqueUserCount || 0
        },
        mostSearchedAddresses: mostSearched.map(item => ({
          address: item.walletAddress,
          searchCount: item.searchCount,
          uniqueUsers: item.uniqueUserCount,
          lastSearched: item.lastSearched
        })),
        searchesByDay: searchesByDay.map(item => ({
          date: item._id,
          count: item.count
        }))
      }
    });
  } catch (error) {
    console.error('Get search analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching search analytics',
      error: error.message
    });
  }
};

module.exports = {
  getDashboardStats,
  getAllUsers,
  getUserById,
  deleteUser,
  getAllSearches,
  getSearchAnalytics
};