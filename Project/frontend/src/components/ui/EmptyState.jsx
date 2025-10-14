import React, { memo } from 'react'

const EmptyState = memo(({ 
  icon, 
  title, 
  description, 
  actionText, 
  onAction 
}) => {
  return (
    <div className="px-6 py-12 text-center">
      <div className="w-16 h-16 text-gray-300 mx-auto mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      {onAction && actionText && (
        <button
          onClick={onAction}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          {actionText}
        </button>
      )}
    </div>
  )
})

EmptyState.displayName = 'EmptyState'

export default EmptyState