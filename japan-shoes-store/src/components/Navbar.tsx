import Link from "next/link";
import Logo from "../../public/asyik-logo-removebg-preview.png";
import Image from "next/image";
import { cookies } from "next/headers";
import Button from "./Button";
import { redirect } from "next/navigation";
import SearchForm from "./SearchForm";

  const handleLogout = async () => {
    "use server"
    const cookieStore = await cookies();
    cookieStore.delete("access_token")
    redirect("/login")
  }

const Navbar = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");

  
  return (
    <>
      <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50 shadow-lg">
        {/* Top Banner */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-white text-center py-2.5 text-sm font-medium">
          <p>
            Gratis Ongkir hingga Rp 50.000 dengan Min. Pembelian Rp 1.000.000
          </p>
        </div>

        {/* Main Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <div className="h-25 w-auto">
                <Image src={Logo} alt="asyik-logo" className="h-full w-full object-contain brightness-0 invert" width={120} height={48} />
              </div>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex space-x-8">
              <Link
                href="/products"
                className="text-gray-300 hover:text-white font-medium transition-colors border-b-2 border-transparent hover:border-blue-500"
              >
                PRODUCTS
              </Link>
              {token && <Link
                href="/wishlist"
                className="text-gray-300 hover:text-white font-medium transition-colors border-b-2 border-transparent hover:border-blue-500"
              >
                WISHLISTS
              </Link>}
              <Link
                href="/"
                className="text-gray-300 hover:text-white font-medium transition-colors border-b-2 border-transparent hover:border-blue-500"
              >
                MEN
              </Link>
              <Link
                href="/"
                className="text-gray-300 hover:text-white font-medium transition-colors border-b-2 border-transparent hover:border-blue-500"
              >
                WOMEN
              </Link>
              <Link
                href="/"
                className="text-gray-300 hover:text-white font-medium transition-colors border-b-2 border-transparent hover:border-blue-500"
              >
                KIDS
              </Link>
              <Link
                href="/"
                className="text-gray-300 hover:text-white font-medium transition-colors border-b-2 border-transparent hover:border-blue-500"
              >
                SALE
              </Link>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-6 gap-5">
              <SearchForm />
              {/* <button className="text-gray-300 hover:text-white transition-colors">
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
              </button> */}
              {token ? <Button type="Logout" style="text-gray-300 hover:text-white transition-colors" onClick={handleLogout} /> : 
              <Link href="/login" className="text-gray-300 hover:text-white transition-colors flex flex-row mr-5">
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
                <p className="flex items-center mx-5">
                  LOGIN
                  </p>
              </Link>}
              <button className="text-gray-300 hover:text-white transition-colors relative">
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
