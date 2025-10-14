import React from 'react'

const FeatureCard = ({ icon, title, description, bgColor = "bg-blue-100", iconColor = "text-blue-600" }) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow feature-card">
      <div className={`w-12 h-12 ${bgColor} rounded-xl flex items-center justify-center mb-6 mx-auto`}>
        <svg className={`w-6 h-6 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {icon}
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

export default FeatureCard