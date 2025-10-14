import { useMemo } from 'react'

// Hook for calculating dashboard statistics with memoization
export const useDashboardStats = (searchHistory) => {
  const stats = useMemo(() => {
    console.log('Calculating dashboard stats for:', searchHistory);
    
    if (!searchHistory || searchHistory.length === 0) {
      return {
        totalSearches: 0,
        thisWeekSearches: 0,
        avgBalance: '0.00000000'
      }
    }

    const totalSearches = searchHistory.length

    // Calculate searches from this week
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    
    const thisWeekSearches = searchHistory.filter(search => {
      const searchDate = new Date(search.searchDate || search.createdAt)
      return searchDate > weekAgo
    }).length

    // Calculate average balance - use the balance in satoshis from backend
    const totalBalance = searchHistory.reduce((sum, search) => {
      const balance = search.balance || 0
      console.log('Adding balance:', balance)
      return sum + balance
    }, 0)
    
    console.log('Total balance in satoshis:', totalBalance)
    
    const avgBalanceInBTC = totalSearches > 0 
      ? (totalBalance / totalSearches / 100000000).toFixed(8)
      : '0.00000000'

    console.log('Calculated stats:', {
      totalSearches,
      thisWeekSearches,
      avgBalance: avgBalanceInBTC
    });

    return {
      totalSearches,
      thisWeekSearches,
      avgBalance: avgBalanceInBTC
    }
  }, [searchHistory])

  return stats
}