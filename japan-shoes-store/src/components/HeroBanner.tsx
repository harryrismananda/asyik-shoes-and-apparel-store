'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 1,
      image: 'https://thumbor.sirclocdn.com/unsafe/1600x640/filters:format(webp):quality(80)/https://bo.asics.co.id/media/weltpixel/owlcarouselslider/images/a/w/aw25_lite-show-product-1600x616px.jpg',
      alt: 'ASICS Lite Show Product'
    },
    {
      id: 2,
      image: 'https://thumbor.sirclocdn.com/unsafe/1600x640/filters:format(webp):quality(80)/https://bo.asics.co.id/media/weltpixel/owlcarouselslider/images/g/e/gel-cumulus-16_homepage-banner_1600x616px.jpg',
      alt: 'GEL-CUMULUS 16'
    },
    {
      id: 3,
      image: 'https://thumbor.sirclocdn.com/unsafe/1600x640/filters:format(webp):quality(80)/https://bo.asics.co.id/media/weltpixel/owlcarouselslider/images/f/u/fujispeed-trail-banner-1600x616px.jpg',
      alt: 'Fujispeed Trail'
    },
    {
      id: 4,
      image: 'https://thumbor.sirclocdn.com/unsafe/1600x640/filters:format(webp):quality(80)/https://bo.asics.co.id/media/weltpixel/owlcarouselslider/images/n/o/novablast-5-banner-1600x616px.jpg',
      alt: 'Novablast 5'
    },
    {
      id: 5,
      image: 'https://thumbor.sirclocdn.com/unsafe/1600x640/filters:format(webp):quality(80)/https://bo.asics.co.id/media/weltpixel/owlcarouselslider/images/g/e/gel-nimbus-27-banner-1600x616px.jpg',
      alt: 'GEL-NIMBUS 27'
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  // Auto-play carousel
  useEffect(() => {
    const slidesLength = slides.length
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slidesLength)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="relative w-full bg-gray-100">
      {/* Slides */}
      <div className="relative w-full aspect-[1600/640]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              className="object-contain"
              priority={index === 0}
              unoptimized
            />
          </div>
        ))}
      </div>

      {/* Previous Button */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 sm:p-3 rounded-full shadow-lg transition-all duration-200 z-10 group"
        aria-label="Previous slide"
      >
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 sm:p-3 rounded-full shadow-lg transition-all duration-200 z-10 group"
        aria-label="Next slide"
      >
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-blue-600 w-6 sm:w-8'
                : 'bg-white/60 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default HeroBanner