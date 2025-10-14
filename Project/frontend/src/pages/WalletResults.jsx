import React, { useEffect, useState, useCallback } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useFormatters } from '../hooks/useFormatters'
import { walletAPI } from '../services/api'
import Header from '../components/layout/Header'
import WalletStatsCard from '../components/wallet/WalletStatsCard'
import ActivityTimeline from '../components/wallet/ActivityTimeline'
import QuickActions from '../components/wallet/QuickActions'
import TransactionsTable from '../components/wallet/TransactionsTable'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import ErrorDisplay from '../components/ui/ErrorDisplay'

const WalletResults = () => {
  const { address } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const { formatBTC, formatDate } = useFormatters()
  
  const [walletData, setWalletData] = useState(location.state?.walletData || null)
  const [isLoading, setIsLoading] = useState(!walletData)
  const [error, setError] = useState('')

  const fetchWalletData = useCallback(async () => {
    try {
      setIsLoading(true)
      setError('')
      
      const result = await walletAPI.getWallet(address)
      
      if (result.success) {
        setWalletData(result.data)
      } else {
        setError(result.message || 'Failed to fetch wallet data')
      }
    } catch (error) {
      console.error('Error fetching wallet data:', error)
      setError('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [address])

  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated) {
      navigate('/login', { state: { walletAddress: address } })
      return
    }

    // If we don't have wallet data, fetch it
    if (!walletData && address) {
      fetchWalletData()
    }
  }, [isAuthenticated, address, walletData, navigate, fetchWalletData])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
        <Header />
        <div className="max-w-4xl mx-auto pt-20 px-4">
          <LoadingSpinner message="Loading Bitcoin wallet data..." />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
        <Header />
        <div className="max-w-4xl mx-auto pt-20 px-4">
          <ErrorDisplay 
            error={error} 
            onRetry={fetchWalletData} 
            retryText="Try Again" 
          />
        </div>
      </div>
    )
  }

  if (!walletData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
        <Header />
        <div className="max-w-4xl mx-auto pt-20 px-4">
          <div className="text-center py-20">
            <p className="text-gray-600">No wallet data available</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      <Header />
      
      <div className="max-w-6xl mx-auto pt-20 pb-12 px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Bitcoin Wallet Analysis</h1>
          <div className="bg-gray-100 rounded-lg p-3 max-w-2xl mx-auto">
            <p className="text-gray-600 text-sm mb-1">Address:</p>
            <p className="font-mono text-sm break-all">{address}</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <WalletStatsCard
            title="Balance"
            value={`${formatBTC(walletData.balance)} BTC`}
            subtitle={`${walletData.balance.toLocaleString()} sats`}
            icon="₿"
            bgColor="orange"
          />

          <WalletStatsCard
            title="Total Received"
            value={`${formatBTC(walletData.totalReceived)} BTC`}
            subtitle={`${walletData.totalReceived.toLocaleString()} sats`}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
            }
            bgColor="green"
          />

          <WalletStatsCard
            title="Total Sent"
            value={`${formatBTC(walletData.totalSent)} BTC`}
            subtitle={`${walletData.totalSent.toLocaleString()} sats`}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            }
            bgColor="red"
          />

          <WalletStatsCard
            title="Transactions"
            value={walletData.totalTransactions}
            subtitle="Total count"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            }
            bgColor="blue"
          />
        </div>

        {/* Activity Timeline & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <ActivityTimeline 
            firstTransactionDate={walletData.firstTransactionDate}
            lastTransactionDate={walletData.lastTransactionDate}
            formatDate={formatDate}
          />
          <QuickActions />
        </div>

        {/* Transactions Table */}
        {walletData.transactions && walletData.transactions.length > 0 && (
          <TransactionsTable 
            transactions={walletData.transactions}
            formatDate={formatDate}
            formatBTC={formatBTC}
          />
        )}
      </div>
    </div>
  )
}

export default WalletResults