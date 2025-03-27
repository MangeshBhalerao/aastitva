import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Content() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  const slides = [
    {
      id: 1,
      image: 'https://t3.ftcdn.net/jpg/08/16/49/34/360_F_816493435_iXavwo9ibvVkQ9bThoQBU7lT71XoyzNF.jpg',
      title: 'Premium Hoodies',
      subtitle: 'Express your अस्तित्व',
      cta: 'SHOP COLLECTION',
      link: '/hoodie/all'
    },
    {
      id: 2,
      image: 'https://images.pexels.com/photos/333850/pexels-photo-333850.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      title: 'NEW ARRIVALS',
      subtitle: 'Fresh styles for every mood',
      cta: 'EXPLORE NOW',
      link: '/tshirt/all'
    },
    {
      id: 3,
      image: 'https://wallpapers.com/images/hd/aesthetic-clothes-12sc5o86h0e9xw1t.jpg',
      title: 'EXCLUSIVE DESIGNS',
      subtitle: 'Stand out from the crowd',
      cta: 'VIEW COLLECTION',
      link: '/sweatshirt/all'
    }
  ];

  useEffect(() => {
    // Preload images
    const preloadImages = () => {
      let loadedCount = 0;
      slides.forEach(slide => {
        const img = new Image();
        img.src = slide.image;
        img.onload = () => {
          loadedCount++;
          if (loadedCount === slides.length) {
            setIsLoading(false);
          }
        };
        img.onerror = () => {
          loadedCount++;
          if (loadedCount === slides.length) {
            setIsLoading(false);
          }
        };
      });
    };

    preloadImages();

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-[#0D0D0D]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div 
      className='w-full h-screen relative overflow-hidden'
      style={{
        fontFamily: 'Bebas Neue, sans-serif',
        zIndex: 1
      }}
    >
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          aria-hidden={index !== currentSlide}
        >
          <div className='absolute inset-0 bg-black bg-opacity-40'></div>
          <div className='absolute inset-0 flex flex-col justify-center items-center text-white text-center p-4'>
            <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-8xl mb-4'>{slide.title}</h1>
            <p className='text-base sm:text-lg md:text-2xl mb-8'>{slide.subtitle}</p>
            <Link 
              to={slide.link} 
              className='px-8 py-3 bg-[#AD2A2A] hover:bg-[#8B0000] transition-colors text-white text-xl rounded-sm'
            >
              {slide.cta}
            </Link>
          </div>
        </div>
      ))}
      
      {/* Slider controls */}
      <div className='absolute bottom-6 left-0 right-0 flex justify-center z-20 space-x-2'>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? 'bg-white' : 'bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-pressed={currentSlide === index}
          ></button>
        ))}
      </div>
      
      {/* Arrow navigation */}
      <button
        className='absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-50 p-2 rounded-full text-white'
        onClick={goToPrevSlide}
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        className='absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-50 p-2 rounded-full text-white'
        onClick={goToNextSlide}
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}

export default Content