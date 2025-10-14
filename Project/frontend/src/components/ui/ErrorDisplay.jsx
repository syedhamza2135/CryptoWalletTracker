import React, { memo } from 'react'

const ErrorDisplay = memo(({ error, onRetry, retryText = 'Try Again' }) => {
  return (
    <div className="text-center py-20">
      <div className="text-red-500 text-xl mb-4">⚠️ Error</div>
      <p className="text-gray-600 mb-6">{error}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          {retryText}
        </button>
      )}
    </div>
  )
})

ErrorDisplay.displayName = 'ErrorDisplay'

export default ErrorDisplay