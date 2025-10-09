import { formatPrice } from "@/utils/formatPrice";
import { IDetail, IDetailParams } from "@/types/type";
import AddWishlist from "@/components/AddWishlist";
import ImageGallery from "@/components/ImageGallery";
import { Metadata } from "next";
import { notFound } from "next/navigation";

const fetchProduct = async (slug: string): Promise<IDetail> => {
  const resp = await fetch(`http://localhost:3000/api/products/${slug}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data: IDetail = await resp.json();
  if (!resp.ok) {
    notFound();
  }
  return data;
};

export const generateMetadata = async ({
  params,
}: IDetailParams): Promise<Metadata> => {
  const { slug } = await params;
  const product: IDetail = await fetchProduct(slug);

  return {
    title: product.product.name,
    description: product.product.excerpt,
    keywords: product.product.tags,
    openGraph: {
      title: product.product.name,
      images: product.product.thumbnail,
    },
  };
};

const ProductDetailPage = async ({ params }: IDetailParams) => {
  const { slug } = await params;
  const product: IDetail = await fetchProduct(slug);
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Side - Images */}
          <div className="space-y-4">
            <ImageGallery
              images={product.product.images}
              productName={product.product.name}
              productThumbnail={product.product.thumbnail}
            />
          </div>

          {/* Right Side - Product Info */}
          <div className="space-y-6">
            {/* Product Title */}
            <div>
              <h1 className="text-2xl text-black lg:text-3xl font-bold uppercase tracking-wide mb-2">
                {product.product.name}
              </h1>
              <p className="text-sm text-gray-600 uppercase tracking-wider">
                {product.product.slug}
              </p>
            </div>

            {/* Price */}
            <div className="border-t border-b border-gray-200 py-4">
              <p className="text-2xl font-bold text-gray-900">
                {formatPrice(product.product.price)}
              </p>
            </div>

            {/* Tags */}
            {product.product.tags && product.product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 text-black py-1 bg-gray-100 text-xs font-semibold uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Size Selector */}
            <div>
              {/* <div className="flex items-center justify-between mb-3">
                  <label className="text-sm text-black font-semibold uppercase tracking-wide">
                    Pilih Ukuran
                  </label>
                  <button className="text-xs text-black underline hover:no-underline">
                    Panduan Ukuran
                  </button>
                </div> */}
              {/* <div className="grid grid-cols-5 gap-2">
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
                </div> */}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <AddWishlist
                productId={product.product._id}
                style="w-full border-2 border-black text-black py-4 text-sm font-bold uppercase tracking-wider hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            {/* <div className="space-y-3 pt-4">
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
              </div> */}

            {/* Product Description */}
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-lg text-black font-bold uppercase tracking-wide mb-3">
                Deskripsi Produk
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                {product.product.description}
              </p>
            </div>

            {/* Additional Info */}
            <div className="border-t border-gray-200 pt-6 space-y-4">
              <details className="group">
                <summary className="flex text-black justify-between items-center cursor-pointer font-semibold uppercase text-sm tracking-wide">
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
                <summary className="flex text-black justify-between items-center cursor-pointer font-semibold uppercase text-sm tracking-wide">
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

  // console.log(product.product);
  // Sample sizes - you can adjust based on your data
  // const sizes = ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"];

  // const handleAddToWishlist = () => {
  //   // TODO: Implement add to wishlist functionality
  //   alert(`Menambahkan ${product?.name} ke wishlist`);
  // };
};

export default ProductDetailPage;
