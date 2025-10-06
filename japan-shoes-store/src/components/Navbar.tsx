import Link from "next/link";
import Logo from "../../public/asyik-logo-removebg-preview.png";
import Image from "next/image";
const Navbar = () => {
  return (
    <>
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        {/* Top Banner */}
        <div className="bg-black text-white text-center py-2 text-sm">
          <p>
            Gratis Ongkir hingga Rp 50.000 dengan Min. Pembelian Rp 1.000.000
          </p>
        </div>

        {/* Main Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <div className="text-2xl font-bold text-black">
                <Image src={Logo} alt="asyik-logo" className="w-50" />
              </div>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex space-x-8">
              <Link
                href="/products"
                className="text-gray-700 hover:text-black font-medium transition-colors"
              >
                PRODUCTS
              </Link>
              <Link
                href="/"
                className="text-gray-700 hover:text-black font-medium transition-colors"
              >
                MEN
              </Link>
              <Link
                href="/"
                className="text-gray-700 hover:text-black font-medium transition-colors"
              >
                WOMEN
              </Link>
              <Link
                href="/"
                className="text-gray-700 hover:text-black font-medium transition-colors"
              >
                KIDS
              </Link>
              <Link
                href="/"
                className="text-gray-700 hover:text-black font-medium transition-colors"
              >
                SALE
              </Link>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-6">
              <button className="text-gray-700 hover:text-black">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
              <Link href="/login" className="text-gray-700 hover:text-black">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </Link>
              <button className="text-gray-700 hover:text-black relative">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
