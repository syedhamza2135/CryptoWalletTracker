import React from 'react'
import { useNavigate } from 'react-router-dom'

const AuthNotification = ({ isVisible, onClose, walletAddress }) => {
  const navigate = useNavigate()

  if (!isVisible) return null

  const handleSignUp = () => {
    onClose()
    navigate('/signup', { state: { walletAddress } })
  }

  const handleLogin = () => {
    onClose()
    navigate('/login', { state: { walletAddress } })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="text-center">
          {/* Icon */}
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Sign In Required
          </h3>

          {/* Message */}
          <p className="text-gray-600 mb-6">
            To view Bitcoin wallet analysis and transaction history for{' '}
            <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
              {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}
            </span>
            , please sign in to your account or create a new one.
          </p>

          {/* Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleSignUp}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold"
            >
              Create Account
            </button>

            <button
              onClick={handleLogin}
              className="w-full border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-all duration-200 font-semibold"
            >
              Sign In to Existing Account
            </button>
          </div>

          {/* Benefits */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-500 mb-3">With an account you get:</p>
            <div className="text-xs text-gray-400 space-y-1">
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Detailed Bitcoin wallet analytics</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Save favorite Bitcoin addresses</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Bitcoin transaction history tracking</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthNotification