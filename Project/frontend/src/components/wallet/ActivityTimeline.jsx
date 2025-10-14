import React, { memo } from 'react'

const ActivityTimeline = memo(({ 
  firstTransactionDate, 
  lastTransactionDate,
  formatDate 
}) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Timeline</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between py-3 border-b border-gray-100">
          <span className="text-gray-600">First Transaction</span>
          <span className="font-medium">{formatDate(firstTransactionDate)}</span>
        </div>
        <div className="flex items-center justify-between py-3">
          <span className="text-gray-600">Last Transaction</span>
          <span className="font-medium">{formatDate(lastTransactionDate)}</span>
        </div>
      </div>
    </div>
  )
})

ActivityTimeline.displayName = 'ActivityTimeline'

export default ActivityTimeline