import React from 'react';
import Button from '../../components/common/Button';

/**
 * Hero banner component for the home page
 */
const HeroBanner = () => {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Welcome to 
            <span className="block text-yellow-400">ProjectDiDong</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Discover the latest in mobile technology and innovative solutions. 
            Your journey to digital excellence starts here.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="large"
              className="bg-yellow-500 text-gray-900 hover:bg-yellow-400 focus:ring-yellow-500 font-semibold"
            >
              Explore Products
            </Button>
            
            <Button 
              variant="outline"
              size="large"
              className="border-white text-white hover:bg-white hover:text-gray-900"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 -mt-4 mr-16 transform rotate-12 opacity-20">
        <div className="w-32 h-32 bg-white rounded-lg"></div>
      </div>
      <div className="absolute bottom-0 left-0 -mb-4 ml-16 transform -rotate-12 opacity-20">
        <div className="w-24 h-24 bg-yellow-400 rounded-full"></div>
      </div>
    </section>
  );
};

export default HeroBanner;