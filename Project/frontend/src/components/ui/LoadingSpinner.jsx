import React, { memo } from 'react'

const LoadingSpinner = memo(({ message = 'Loading...' }) => {
  return (
    <div className="text-center py-20">
      <div className="animate-spin h-12 w-12 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"></div>
      <p className="text-gray-600">{message}</p>
    </div>
  )
})

LoadingSpinner.displayName = 'LoadingSpinner'

export default LoadingSpinner