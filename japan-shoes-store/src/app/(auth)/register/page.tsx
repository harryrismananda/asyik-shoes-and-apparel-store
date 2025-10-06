

import Link from 'next/link'
import Image from 'next/image'
import Logo from '../../../../public/asyik-logo-removebg-preview.png'

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-4">REGISTER</h1>
          <div className="flex justify-center">
            <Image src={Logo} alt="Japan Shoes Logo" className="h-20 w-auto object-contain" width={120} height={80} />
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Buat Akun</h2>
          
          <form className="space-y-4">
            {/* Country Selector */}
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <select
                id="country"
                name="country"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              >
                <option>Indonesia</option>
              </select>
            </div>

            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>

            {/* Gender */}
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            {/* Date of Birth */}
            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>

            {/* Phone Whatsapp */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Whatsapp
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  +62
                </span>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                required
                className="mt-1 mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-600"
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                Dengan ini, saya setuju untuk terikat dengan{' '}
                <Link href="/" className="text-blue-600 hover:underline">Syarat dan Ketentuan</Link>
                {' '}(karena mungkin diperbarui karena waktu ke waktu) dan{' '}
                <Link href="/" className="text-blue-600 hover:underline">Catatan Privasi</Link>
              </label>
            </div>

            {/* Newsletter */}
            <div className="flex items-start">
              <input
                type="checkbox"
                id="newsletter"
                name="newsletter"
                className="mt-1 mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-600"
              />
              <label htmlFor="newsletter" className="text-sm text-gray-600">
                Sign Up For Newsletter
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold transition-colors shadow-md hover:shadow-lg"
            >
              Buat Akun
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Sudah punya akun?{' '}
              <Link href="/login" className="text-blue-600 hover:underline font-semibold">
                Masuk
              </Link>
            </p>
          </div>
        </div>

        {/* Reward Section */}
        <div className="mt-8 bg-gray-100 rounded-lg p-6">
          <h3 className="text-lg font-bold mb-2">REWARD YOUR MIND, REWARD YOUR BODY</h3>
          <p className="text-sm text-gray-600">
            Bergabunglah dengan OneASICS™ Sekarang Dapatkan poin, nikmati hadiah eksklusif, 
            dan akses ke berbagai keistimewaan khusus anggota!
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage