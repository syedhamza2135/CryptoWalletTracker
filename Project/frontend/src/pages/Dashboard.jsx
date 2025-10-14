import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useFormatters } from '../hooks/useFormatters'
import { searchAPI } from '../services/api'
import { useDashboardStats } from '../hooks/useDashboardStats'
import Header from '../components/layout/Header'
import DashboardStatsCard from '../components/dashboard/DashboardStatsCard'
import SearchHistoryTable from '../components/dashboard/SearchHistoryTable'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import ErrorDisplay from '../components/ui/ErrorDisplay'
import EmptyState from '../components/ui/EmptyState'

const Dashboard = () => {
  console.log('Dashboard component rendering...')
  
  const navigate = useNavigate()
  const { isAuthenticated, user, isLoading: authLoading } = useAuth()
  const { formatDate, formatBTC } = useFormatters()
  const [searchHistory, setSearchHistory] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  console.log('Dashboard state:', { isAuthenticated, user, authLoading })
  const { totalSearches, thisWeekSearches, avgBalance } = useDashboardStats(searchHistory)

  const fetchSearchHistory = async () => {
    try {
      setIsLoading(true)
      setError('') // Clear any previous errors
      console.log('Fetching search history...');
      
      const result = await searchAPI.getHistory()
      console.log('Search history result:', result);
      
      if (result && result.success) {
        // Handle the nested data structure from backend
        const searches = result.data?.searches || result.data || []
        setSearchHistory(searches)
        console.log('Search history loaded successfully:', searches.length, 'items');
      } else {
        console.error('Search history fetch failed:', result?.message || 'Unknown error')
        // Don't set error for failed history fetch, just use empty array
        setSearchHistory([])
      }
    } catch (error) {
      console.error('Error fetching search history:', error)
      // More specific error handling
      if (error.message.includes('fetch') || error.message.includes('connect')) {
        console.log('Backend connection issue, using empty search history');
        setSearchHistory([]) // Use empty array instead of showing error
      } else {
        console.log('Using empty search history due to error:', error.message);
        setSearchHistory([]) // Use empty array for any other errors too
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    console.log('Dashboard useEffect:', { authLoading, isAuthenticated, user });
    
    // Wait for auth to load before checking authentication
    if (authLoading) return
    
    if (!isAuthenticated) {
      console.log('Not authenticated, redirecting to login');
      navigate('/login')
      return
    }

    console.log('Authenticated, fetching search history');
    fetchSearchHistory()
  }, [isAuthenticated, authLoading, navigate, user])

  const handleSearchClick = (address) => {
    navigate(`/wallet/${address}`)
  }

  // Show loading spinner while auth is loading
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
        <Header />
        <div className="max-w-4xl mx-auto pt-20 px-4">
          <LoadingSpinner message="Loading dashboard..." />
        </div>
      </div>
    )
  }

  // Redirect to login if not authenticated (after auth loading is complete)
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      <Header />
      
      <div className="max-w-6xl mx-auto pt-24 pb-12 px-4">
        {/* Welcome Section */}
        <div className="text-center mb-12 slide-in-up">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full shadow-lg mb-4 bitcoin-pulse">
              <span className="text-3xl">👋</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-responsive">
            Welcome back, 
            <span className="block bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 bg-clip-text text-transparent animate-gradient">
              {user?.name}!
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Track and analyze Bitcoin wallets with powerful insights and real-time data
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 stagger-animation">
          <DashboardStatsCard
            title="Total Searches"
            value={totalSearches}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            }
            bgColor="orange"
          />

          <DashboardStatsCard
            title="This Week"
            value={thisWeekSearches}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            }
            bgColor="blue"
          />

          <DashboardStatsCard
            title="Avg. Balance"
            value={`${avgBalance} BTC`}
            icon="₿"
            bgColor="green"
          />
        </div>

        {/* Search History */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Recent Searches</h3>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              New Search
            </button>
          </div>

          {isLoading ? (
            <div className="px-6 py-12">
              <LoadingSpinner message="Loading search history..." />
            </div>
          ) : error ? (
            <div className="px-6 py-12">
              <ErrorDisplay 
                error={error} 
                onRetry={fetchSearchHistory} 
                retryText="Try Again" 
              />
            </div>
          ) : searchHistory.length === 0 ? (
            <div className="px-6 py-12">
              <EmptyState
                icon={
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                }
                title="No searches yet"
                description="Start by searching for a Bitcoin wallet address"
                actionText="Search Bitcoin Wallet"
                onAction={() => navigate('/')}
              />
            </div>
          ) : (
            <SearchHistoryTable 
              searchHistory={searchHistory}
              onSearchClick={handleSearchClick}
              formatDate={formatDate}
              formatBTC={formatBTC}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard