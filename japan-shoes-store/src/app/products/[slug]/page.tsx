"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";

interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  tags: string[];
  images: string[];
  thumbnail: string;
}

const ProductDetailPage = () => {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Sample sizes - you can adjust based on your data
  const sizes = ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.slug}`);
        const data = await response.json();
        
        if (response.ok && data.product) {
          setProduct(data.product);
        } else {
          console.error("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.slug]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Silakan pilih ukuran terlebih dahulu");
      return;
    }
    // TODO: Implement add to cart functionality
    alert(`Menambahkan ${product?.name} ukuran ${selectedSize} ke keranjang`);
  };

  const handleAddToWishlist = () => {
    // TODO: Implement add to wishlist functionality
    alert(`Menambahkan ${product?.name} ke wishlist`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Product not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Side - Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-gray-50 overflow-hidden rounded-sm">
              <Image
                src={product.images[selectedImage] || product.thumbnail}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square bg-gray-50 overflow-hidden rounded-sm border-2 transition-all ${
                    selectedImage === index
                      ? "border-black"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="100px"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Side - Product Info */}
          <div className="space-y-6">
            {/* Product Title */}
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold uppercase tracking-wide mb-2">
                {product.name}
              </h1>
              <p className="text-sm text-gray-600 uppercase tracking-wider">
                {product.slug}
              </p>
            </div>

            {/* Price */}
            <div className="border-t border-b border-gray-200 py-4">
              <p className="text-2xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </p>
            </div>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-xs font-semibold uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Size Selector */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-semibold uppercase tracking-wide">
                  Pilih Ukuran
                </label>
                <button className="text-xs underline hover:no-underline">
                  Panduan Ukuran
                </button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 text-sm font-semibold border-2 transition-all ${
                      selectedSize === size
                        ? "border-black bg-black text-white"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <button
                onClick={handleAddToCart}
                className="w-full bg-black text-white py-4 text-sm font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                disabled={!selectedSize}
              >
                Tambah ke Keranjang
              </button>
              <button
                onClick={handleAddToWishlist}
                className="w-full border-2 border-black text-black py-4 text-sm font-bold uppercase tracking-wider hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
                Tambah ke Wishlist
              </button>
            </div>

            {/* Product Description */}
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-lg font-bold uppercase tracking-wide mb-3">
                Deskripsi Produk
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Additional Info */}
            <div className="border-t border-gray-200 pt-6 space-y-4">
              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer font-semibold uppercase text-sm tracking-wide">
                  Detail Produk
                  <span className="transition-transform group-open:rotate-180">
                    ▼
                  </span>
                </summary>
                <div className="mt-4 text-sm text-gray-700 space-y-2">
                  <p>• Material: Synthetic & Mesh</p>
                  <p>• Sole: Rubber</p>
                  <p>• Weight: Approx. 280g (Size 37)</p>
                  <p>• Made in Vietnam</p>
                </div>
              </details>

              <details className="group border-t border-gray-200 pt-4">
                <summary className="flex justify-between items-center cursor-pointer font-semibold uppercase text-sm tracking-wide">
                  Pengiriman & Pengembalian
                  <span className="transition-transform group-open:rotate-180">
                    ▼
                  </span>
                </summary>
                <div className="mt-4 text-sm text-gray-700 space-y-2">
                  <p>• Gratis ongkir seluruh Indonesia</p>
                  <p>• Estimasi pengiriman 2-5 hari kerja</p>
                  <p>• Pengembalian gratis dalam 30 hari</p>
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;