"use client";

import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductCard from "@/components/ProductCard";

interface IProduct {
  _id: string;
  name: string;
  slug: string;
  price: number;
  tags: string[];
  thumbnail: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ProductPage = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);

  const fetchProducts = async (currentPage: number) => {
    try {
      const response = await fetch(`/api/products?page=${currentPage}`);
      const data = await response.json();
      
      setProducts(prev => currentPage === 1 ? data.products : [...prev, ...data.products]);
      setHasMore(data.hasMore);
      setTotal(data.total);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts(1);
  }, []);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchProducts(nextPage);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold uppercase tracking-wide mb-2">
            Running Shoes
          </h1>
          <p className="text-gray-600">
            {total > 0 ? `${total} Produk` : `${products.length} Produk`}
          </p>
        </div>

        {/* Filter Bar (Optional - placeholder for future implementation) */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 hover:border-gray-400 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
              />
            </svg>
            <span className="text-sm font-semibold">Filter</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Urutan:</span>
            <select className="px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-gray-400">
              <option>Terbaru</option>
              <option>Harga: Rendah ke Tinggi</option>
              <option>Harga: Tinggi ke Rendah</option>
              <option>Nama: A-Z</option>
            </select>
          </div>
        </div>

        {/* Products Grid with Infinite Scroll */}
        <InfiniteScroll
          dataLength={products.length}
          next={loadMore}
          hasMore={hasMore}
          loader={
            <div className="text-center py-8">
              <p className="text-gray-600">Loading more products...</p>
            </div>
          }
          endMessage={
            <div className="text-center py-8">
              <p className="text-gray-600 font-semibold">
                You&apos;ve viewed all products
              </p>
            </div>
          }
          pullDownToRefresh
          pullDownToRefreshThreshold={50}
          refreshFunction={() => fetchProducts(1)}
          className="overflow-visible"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <ProductCard
                key={index}
                name={product.name}
                slug={product.slug}
                price={product.price}
                thumbnail={product.thumbnail}
                images={product.images}
              />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default ProductPage;