import React, { useState, useEffect } from 'react';
import Icon from '../../components/common/Icon';

/**
 * Brand carousel component
 */
const BrandCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const brands = [
    { name: 'Apple', logo: '🍎' },
    { name: 'Samsung', logo: '📱' },
    { name: 'Google', logo: '🔍' },
    { name: 'Microsoft', logo: '🪟' },
    { name: 'Sony', logo: '📺' },
    { name: 'LG', logo: '📺' },
    { name: 'Huawei', logo: '📱' },
    { name: 'Xiaomi', logo: '📱' },
  ];

  const itemsPerSlide = 4;
  const totalSlides = Math.ceil(brands.length / itemsPerSlide);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(timer);
  }, [totalSlides]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getCurrentBrands = () => {
    const startIndex = currentSlide * itemsPerSlide;
    return brands.slice(startIndex, startIndex + itemsPerSlide);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Trusted by Leading Brands
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We partner with the world's most innovative companies to bring you the best products and services.
          </p>
        </div>

        <div className="relative">
          {/* Carousel Container */}
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-500 ease-in-out">
              <div className="w-full flex-shrink-0">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {getCurrentBrands().map((brand, index) => (
                    <div
                      key={`${brand.name}-${currentSlide}-${index}`}
                      className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="text-4xl mb-3">{brand.logo}</div>
                      <h3 className="text-lg font-semibold text-gray-900">{brand.name}</h3>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
            aria-label="Previous slide"
          >
            <Icon name="chevron-left" size={20} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
            aria-label="Next slide"
          >
            <Icon name="chevron-right" size={20} />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandCarousel;