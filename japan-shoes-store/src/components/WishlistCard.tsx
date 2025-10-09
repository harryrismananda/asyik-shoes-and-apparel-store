"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/utils/formatPrice";
import { useState } from "react";
import { showError, showSuccessDeleteWishlist } from "@/utils/alert";

interface ProductDetail {
  _id: string;
  name: string;
  slug: string;
  price: number;
  excerpt?: string;
  description?: string;
  tags: string[];
  images: string[];
  thumbnail: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface WishlistCardProps {
  product: ProductDetail;
  onRemove: (productId: string) => void;
}

const WishlistCard = ({ product, onRemove }: WishlistCardProps) => {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = async () => {
    if (isRemoving) return;
    
    setIsRemoving(true);
    try {
      const response = await fetch(`/api/wishlists/${product._id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message)
      } 
      onRemove(product._id);
      showSuccessDeleteWishlist(data.message as string)
      return
    } catch (error:unknown) {
      console.error("Error removing from wishlist:", error);
      showError(error as string);
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <div className="bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex flex-col sm:flex-row gap-4 p-4">
        {/* Product Image */}
        <Link href={`/products/${product.slug}`} className="flex-shrink-0">
          <div className="relative w-full sm:w-32 aspect-square bg-gray-50 overflow-hidden rounded-sm">
            <Image
              src={product.thumbnail}
              alt={product.name}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
              sizes="128px"
            />
          </div>
        </Link>

        {/* Product Info */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <Link href={`/products/${product.slug}`}>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-900 mb-2 hover:text-gray-600 transition-colors line-clamp-2">
                {product.name}
              </h3>
            </Link>
            
            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {product.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-[10px] font-semibold uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Price */}
            <p className="text-lg font-bold text-gray-900 mb-3">
              {formatPrice(product.price)}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Link
              href={`/products/${product.slug}`}
              className="flex-1 bg-black text-white py-2 px-4 text-xs font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors text-center"
            >
              View Product
            </Link>
            <button
              onClick={handleRemove}
              disabled={isRemoving}
              className="bg-white border-2 border-black text-black py-2 px-4 text-xs font-bold uppercase tracking-wider hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
              {isRemoving ? "Removing..." : "Remove"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;
