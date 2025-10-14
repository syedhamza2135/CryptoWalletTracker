import React, { memo } from 'react'

const WalletStatsCard = memo(({ 
  title, 
  value, 
  subtitle, 
  icon, 
  bgColor = 'orange'
}) => {
  const colorClasses = {
    orange: {
      bg: 'bg-orange-100',
      text: 'text-orange-600',
      border: 'border-orange-100'
    },
    green: {
      bg: 'bg-green-100',
      text: 'text-green-600',
      border: 'border-green-100'
    },
    red: {
      bg: 'bg-red-100',
      text: 'text-red-600',
      border: 'border-red-100'
    },
    blue: {
      bg: 'bg-blue-100',
      text: 'text-blue-600',
      border: 'border-blue-100'
    }
  }

  const colors = colorClasses[bgColor] || colorClasses.orange

  return (
    <div className={`bg-white rounded-xl p-6 shadow-lg border ${colors.border}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className={`text-2xl font-bold ${colors.text}`}>{value}</p>
          {subtitle && (
            <p className="text-xs text-gray-500">{subtitle}</p>
          )}
        </div>
        <div className={`w-12 h-12 ${colors.bg} rounded-full flex items-center justify-center`}>
          {typeof icon === 'string' ? (
            <span className={`${colors.text} text-xl`}>{icon}</span>
          ) : (
            <div className={`w-6 h-6 ${colors.text}`}>
              {icon}
            </div>
          )}
        </div>
      </div>
    </div>
  )
})

WalletStatsCard.displayName = 'WalletStatsCard'

export default WalletStatsCard