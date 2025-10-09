
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/utils/formatPrice";
import { IFeaturedProduct } from "@/types/type";

const FeaturedProducts = () => {
  const [products, setProducts] = useState<IFeaturedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      // Try to fetch 10 products first
      let response = await fetch("/api/products?page=1&limit=10&query=noveblast%205");
      let data = await response.json();

      // If we don't get 10 products, try with the query parameter
      if (data.products.length < 10) {
        response = await fetch("/api/products?query=women%20novablast%205");
        data = await response.json();
      }

      if (response.ok && data.products) {
        // Take only first 10 products
        setProducts(data.products.slice(0, 10));
      }
    } catch (error) {
      console.error("Error fetching featured products:", error);
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + products.length) % products.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-play carousel
  useEffect(() => {
    if (products.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % products.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [products.length]);

  if (loading) {
    return (
      <div className="w-full bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="text-xl text-gray-600">Loading featured products...</div>
          </div>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold uppercase tracking-wide mb-2 text-gray-900">
            Featured Products
          </h2>
          <p className="text-gray-600">Discover our handpicked selection</p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 p-2 sm:p-3 rounded-full shadow-xl border-2 border-gray-300 transition-all duration-200"
            aria-label="Previous product"
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

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 p-2 sm:p-3 rounded-full shadow-xl border-2 border-gray-300 transition-all duration-200"
            aria-label="Next product"
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

          {/* Products Carousel */}
          <div className="relative w-full overflow-hidden">
            <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {products.map((product) => (
                <div
                  key={product._id}
                  className="w-full flex-shrink-0 px-4 sm:px-12"
                >
                  <div className="max-w-sm mx-auto">
                    <Link href={`/products/${product.slug}`} className="group block">
                      <div className="bg-gray-800 rounded-sm overflow-hidden transition-all duration-300 hover:shadow-2xl border-2 border-gray-800 shadow-lg">
                        {/* Product Image */}
                        <div className="relative aspect-square bg-gray-700 overflow-hidden">
                          <Image
                            src={product.thumbnail}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, 384px"
                          />
                          
                          {/* Pack Collection Badge */}
                          {product.images && product.images.length > 1 && (
                            <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 text-[10px] font-semibold uppercase tracking-wider">
                              Pack Collection
                            </div>
                          )}
                        </div>

                        {/* Product Info */}
                        <div className="p-4">
                          {/* Tags */}
                          {product.tags && product.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-2">
                              {product.tags.slice(0, 2).map((tag, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-gray-700 text-[9px] font-semibold uppercase tracking-wider text-gray-300"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Product Name */}
                          <h3 className="text-sm font-bold uppercase tracking-wide text-white mb-3 line-clamp-2 min-h-[2.5rem]">
                            {product.name}
                          </h3>

                          {/* Price */}
                          <p className="text-lg font-bold text-white mb-3">
                            {formatPrice(product.price)}
                          </p>

                          {/* View Details Button */}
                          <div className="w-full bg-blue-600 text-white py-2 text-xs font-bold uppercase tracking-wider text-center group-hover:bg-blue-700 transition-colors">
                            View Details
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center space-x-2 mt-6">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-blue-600 w-6 sm:w-8"
                    : "bg-gray-400 hover:bg-gray-500"
                }`}
                aria-label={`Go to product ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* View All Products Link */}
        <div className="text-center mt-8">
          <Link
            href="/products"
            className="inline-block bg-blue-600 text-white py-3 px-8 text-sm font-bold uppercase tracking-wider hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            View All Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;