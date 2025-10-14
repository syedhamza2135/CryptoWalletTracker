import React from 'react'
import Header from '../components/layout/Header'
import HeroSection from '../components/ui/HeroSection'
import SearchForm from '../components/search/SearchForm'
import FeaturesSection from '../components/ui/FeaturesSection'

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <HeroSection />
          <SearchForm />
          <FeaturesSection />
        </div>
      </main>
    </div>
  )
}

export default Landing