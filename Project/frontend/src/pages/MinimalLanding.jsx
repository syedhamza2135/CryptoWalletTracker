import React from 'react'
import Header from '../components/layout/Header'
import SearchForm from '../components/search/SearchForm'

const MinimalLanding = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Track Any Bitcoin Wallet
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover Bitcoin wallet balances, transaction history, and portfolio insights with our advanced tracking tools.
          </p>
          
          <SearchForm />
          
          {/* Quick Stats */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-2xl font-bold text-orange-600 mb-2">1M+</div>
              <div className="text-gray-600">Wallets Tracked</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-2xl font-bold text-blue-600 mb-2">Real-time</div>
              <div className="text-gray-600">Bitcoin Data</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-2xl font-bold text-green-600 mb-2">Secure</div>
              <div className="text-gray-600">& Private</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default MinimalLanding