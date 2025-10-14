import React from 'react'
import FeatureCard from './FeatureCard'

const FeaturesSection = () => {
  const features = [
    {
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />,
      title: "Real-time Bitcoin Balance",
      description: "Get up-to-date Bitcoin balance and UTXO information for any Bitcoin address.",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600"
    },
    {
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
      title: "Transaction History",
      description: "Explore complete Bitcoin transaction history with detailed inputs, outputs, and timestamps.",
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600"
    },
    {
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />,
      title: "Bitcoin Network Analysis",
      description: "Advanced analysis including address clustering, transaction patterns, and network insights.",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-500"
    }
  ]

  return (
    <div className="grid md:grid-cols-3 gap-8 mt-20">
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
          bgColor={feature.bgColor}
          iconColor={feature.iconColor}
        />
      ))}
    </div>
  )
}

export default FeaturesSection