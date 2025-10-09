"use client";

import { showErrorAddWishlist, showSuccessAddWishlist } from "@/utils/alert";
import { ObjectId } from "mongodb";
import { useState } from "react";

interface AddWishlistProps {
  productId: ObjectId;
}

const AddWishlist = ({ productId }: AddWishlistProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);

  const handleAddToWishlist = async () => {
    if (isAdding) return;

    setIsAdding(true);
    try {
      const response = await fetch("/api/wishlists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });
      console.log(response);
      const data = await response.json();
      // console.log(data);
      if (!response.ok) {
        throw new Error(data.message);
      } 
      setIsInWishlist(true);
      return showSuccessAddWishlist(data.message as string)
    } catch (error:unknown) {
      console.error("Error adding to wishlist:", error);
      showErrorAddWishlist(error as string)
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <button
      onClick={handleAddToWishlist}
      disabled={isAdding || isInWishlist}
      className={`w-full border-2 border-black text-black py-4 text-sm font-bold uppercase tracking-wider hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={isInWishlist ? "currentColor" : "none"}
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
      {isAdding ? "Adding..." : isInWishlist ? "Added to Wishlist" : "Tambah ke Wishlist"}
    </button>
  );
};

export default AddWishlist;