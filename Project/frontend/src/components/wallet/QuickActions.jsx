import React, { memo } from 'react'

const QuickActions = memo(() => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="space-y-3">
        <button className="w-full px-4 py-3 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors text-left">
          📊 View Analytics Dashboard
        </button>
        <button className="w-full px-4 py-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-left">
          📄 Export Transaction History
        </button>
        <button className="w-full px-4 py-3 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors text-left">
          🔔 Set Balance Alerts
        </button>
      </div>
    </div>
  )
})

QuickActions.displayName = 'QuickActions'

export default QuickActions