import React from 'react';
import HeroBanner from '../features/home/HeroBanner';
import BrandCarousel from '../features/home/BrandCarousel';

/**
 * Home page component
 */
const HomePage = () => {
  return (
    <div className="min-h-screen">
      <HeroBanner />
      <BrandCarousel />
      
      {/* Additional content section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Latest Technology</h3>
              <p className="text-gray-600">
                Stay ahead with cutting-edge mobile devices and innovative solutions.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast & Reliable</h3>
              <p className="text-gray-600">
                Experience lightning-fast performance and dependable quality in every product.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure & Trusted</h3>
              <p className="text-gray-600">
                Your data and privacy are protected with industry-leading security measures.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;