import React, { memo, useMemo } from 'react'

const DashboardStatsCard = memo(({ 
  title, 
  value, 
  icon, 
  bgColor = 'orange' 
}) => {
  const colorClasses = useMemo(() => ({
    orange: {
      bg: 'bg-gradient-to-br from-orange-50 to-yellow-50',
      iconBg: 'bg-gradient-to-br from-orange-500 to-yellow-500',
      text: 'text-orange-600',
      border: 'border-orange-200'
    },
    blue: {
      bg: 'bg-gradient-to-br from-blue-50 to-indigo-50',
      iconBg: 'bg-gradient-to-br from-blue-500 to-indigo-500',
      text: 'text-blue-600',
      border: 'border-blue-200'
    },
    green: {
      bg: 'bg-gradient-to-br from-green-50 to-emerald-50',
      iconBg: 'bg-gradient-to-br from-green-500 to-emerald-500',
      text: 'text-green-600',
      border: 'border-green-200'
    }
  }), [])

  const colors = colorClasses[bgColor] || colorClasses.orange

  return (
    <div className={`${colors.bg} rounded-2xl p-6 shadow-lg border ${colors.border} hover:shadow-xl transition-all duration-300 transform hover:scale-105 card-hover group`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-2 font-medium uppercase tracking-wider">{title}</p>
          <p className={`text-3xl font-bold ${colors.text} transition-all duration-300 group-hover:scale-110`}>
            {value}
          </p>
        </div>
        <div className={`w-16 h-16 ${colors.iconBg} rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-all duration-300`}>
          {typeof icon === 'string' ? (
            <span className="text-white text-2xl font-bold">{icon}</span>
          ) : (
            <div className="w-8 h-8 text-white">
              {icon}
            </div>
          )}
        </div>
      </div>
      
      {/* Decorative element */}
      <div className="mt-4 h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent rounded-full opacity-50"></div>
    </div>
  )
})

DashboardStatsCard.displayName = 'DashboardStatsCard'

export default DashboardStatsCard