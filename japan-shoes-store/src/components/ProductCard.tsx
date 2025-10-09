import Link from "next/link";
import Image from "next/image";
import { IProductCardProps } from "@/types/type";
import { formatPrice } from "@/utils/formatPrice";
import AddWishlist from "./AddWishlist";



const ProductCard = ({ _id, name, slug, price, thumbnail, images = [] }: IProductCardProps) => {
 
  return (
    <div className="flex flex-col h-full">
      <Link href={`/products/${slug}`} className="group block flex-1">
        <div className="bg-white rounded-sm overflow-hidden transition-all duration-300 hover:shadow-lg h-full flex flex-col">
          {/* Product Image Container */}
          <div className="relative aspect-square bg-gray-50 overflow-hidden">
            <Image
              src={thumbnail}
              alt={name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            
            {/* Pack Collection Badge (if applicable) */}
            {images && images.length > 1 && (
              <div className="absolute top-3 left-3 bg-white px-2 py-1 text-[10px] font-semibold uppercase tracking-wider">
                Pack Collection
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-4 flex-1 flex flex-col">
            {/* Color Variants Indicator */}
            {images && images.length > 1 && (
              <div className="flex items-center gap-1 mb-2">
                <span className="text-xs text-gray-600">{images.length} Warna</span>
              </div>
            )}

            {/* Product Name */}
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-900 mb-2 line-clamp-2 min-h-[2.5rem]">
              {name}
            </h3>

            {/* Price */}
            <div className="flex items-center justify-between mt-auto">
              <p className="text-base font-bold text-gray-900">
                {formatPrice(price)}
              </p>
            </div>
          </div>
        </div>
      </Link>
      <AddWishlist 
        productId={_id} 
        style="w-full border-2 border-black text-black py-3 text-sm font-bold uppercase tracking-wider hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2 rounded-sm" 
      />
    </div>
  );
};

export default ProductCard;
