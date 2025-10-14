import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { walletAPI } from '../../services/api'
import { useAuth } from '../../hooks/useAuth'
import AuthNotification from '../notifications/AuthNotification'

const SearchForm = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const [walletAddress, setWalletAddress] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [showAuthNotification, setShowAuthNotification] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!walletAddress.trim()) {
      setError('Please enter a Bitcoin address')
      return
    }

    // Check if user is authenticated
    if (!isAuthenticated) {
      setShowAuthNotification(true)
      return
    }

    setIsSearching(true)
    setError('')

    try {
      const result = await walletAPI.searchWallet(walletAddress.trim())
      
      if (result.success) {
        // Navigate to wallet results page with the data
        navigate(`/wallet/${walletAddress}`, { 
          state: { walletData: result.data } 
        })
      } else {
        setError(result.message || 'Failed to fetch wallet data')
      }
    } catch (error) {
      console.error('Wallet search error:', error)
      setError('Network error. Please check your connection and try again.')
    } finally {
      setIsSearching(false)
    }
  }

  const exampleAddresses = [
    "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
    "3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy"
  ]

  return (
    <>
      <div className="max-w-4xl mx-auto mb-20">
        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-xl text-center shadow-sm animate-pulse">
            <div className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          </div>
        )}

        {/* Main Search Form */}
        <form onSubmit={handleSubmit} className="relative mb-8">
          <div className="search-form-container flex flex-col lg:flex-row gap-4 p-3 bg-white rounded-2xl shadow-2xl border border-gray-100 hover:shadow-3xl transition-all duration-300">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">₿</span>
                </div>
              </div>
              <input
                type="text"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                placeholder="Enter Bitcoin address (e.g., bc1qxy2kgd...)"
                className="w-full pl-16 pr-4 py-5 text-gray-900 placeholder-gray-500 bg-transparent border-0 focus:outline-none focus:ring-0 text-lg font-mono focus-enhanced"
                disabled={isSearching}
              />
            </div>
            <button
              type="submit"
              disabled={isSearching || !walletAddress.trim()}
              className="btn-enhanced px-8 py-5 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
            >
              {isSearching ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Searching...
                </div>
              ) : (
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search Wallet
                </div>
              )}
            </button>
          </div>
        </form>

        {/* Example Addresses */}
        <div className="text-center mb-12">
          <p className="text-gray-500 mb-4 text-sm">Try these example addresses:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {exampleAddresses.map((address, index) => (
              <button
                key={index}
                onClick={() => setWalletAddress(address)}
                className="px-4 py-2 text-sm bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 font-mono hover:shadow-md transform hover:scale-105"
              >
                {address.slice(0, 8)}...{address.slice(-8)}
              </button>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-animation">
          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 card-hover">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 float">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Instant Results</h3>
            <p className="text-gray-600 text-sm">Get real-time wallet data and transaction history in seconds</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 card-hover">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 float">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Accurate Data</h3>
            <p className="text-gray-600 text-sm">Sourced from reliable blockchain APIs for precise information</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 card-hover">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 float">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Private & Secure</h3>
            <p className="text-gray-600 text-sm">Your searches are encrypted and your privacy is protected</p>
          </div>
        </div>
      </div>

      {/* Auth Notification Modal */}
      {showAuthNotification && (
        <AuthNotification
          isVisible={showAuthNotification}
          onClose={() => setShowAuthNotification(false)}
          walletAddress={walletAddress}
        />
      )}
    </>
  )
}

export default SearchForm