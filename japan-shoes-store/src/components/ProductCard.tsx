import Link from "next/link";
import Image from "next/image";
import { IProductCardProps } from "@/types/type";
import { formatPrice } from "@/utils/formatPrice";



const ProductCard = ({ name, slug, price, thumbnail, images = [] }: IProductCardProps) => {

  return (
    <Link href={`/products/${slug}`} className="group block">
      <div className="bg-white rounded-sm overflow-hidden transition-all duration-300 hover:shadow-lg">
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
        <div className="p-4">
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
          <div className="flex items-center justify-between">
            <p className="text-base font-bold text-gray-900">
              {formatPrice(price)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
