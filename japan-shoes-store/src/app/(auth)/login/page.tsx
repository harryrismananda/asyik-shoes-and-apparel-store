"use client"

import Link from 'next/link'
import Image from 'next/image'
import Logo from '../../../../public/asyik-logo-removebg-preview.png'
import { useState } from 'react'
import { showError, showSuccessLogin } from '@/utils/alert'
import { Ilogin } from '@/types/type'
import { setCookie } from './actions'
import { useRouter } from 'next/navigation'




const LoginPage = () => {
  const router = useRouter()  
  const [formData, setFormData] = useState<Ilogin>({
    email: '',
    password: '',
    
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, formData: Ilogin) => {
    e.preventDefault()
    try {
      const resp = await fetch(`http://localhost:3000/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      const data = await resp.json()
      // console.log(data);
      if(!resp.ok) {
        // console.log(data.token)
        throw new Error(data.message)
      } 
      setCookie('access_token', data.token)
      showSuccessLogin()
      router.push('/')
      return
    } catch (error: unknown) {
      return showError(error as string)
    }
    
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-4">MASUK</h1>
          <div className="flex justify-center">
            <Image src={Logo} alt="Japan Shoes Logo" className="h-20 w-auto object-contain" width={120} height={80} />
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Masuk atau Buat Akun</h2>
          
          <p className="text-center text-gray-600 mb-6">
            Untuk memulai, silakan masukkan email Anda.
          </p>

          <form className="space-y-4" onSubmit={(e) => handleSubmit(e, formData)}>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={(e) => {
                  handleChange(e)
                }}
                placeholder="name@example.com"
                className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
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
                value={formData.password}
                onChange={(e) => {
                  handleChange(e)
                }}
                placeholder="••••••••"
                className="w-full px-3 text-black py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
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

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold transition-colors shadow-md hover:shadow-lg"
            >
              Masuk
            </button>
          </form>

          {/* Additional Links */}
          <div className="mt-6 text-center space-y-2">
            <Link href="/" className="block text-sm text-blue-600 hover:underline">
              Lupa Kata Sandi?
            </Link>
            <div className="flex items-center justify-center">
              <span className="text-sm text-gray-600">atau</span>
            </div>
            <Link 
              href="/register" 
              className="block text-sm text-blue-600 hover:underline font-semibold"
            >
              Buat Akun
            </Link>
          </div>
        </div>

        {/* Reward Section */}
        <div className="mt-8 bg-gray-100 rounded-lg p-6">
          <h3 className="text-lg font-bold mb-2">REWARD YOUR MIND, REWARD YOUR BODY</h3>
          <p className="text-sm text-gray-600 mb-4">
            Bergabunglah dengan OneASICS™ Sekarang Dapatkan poin, nikmati hadiah eksklusif, 
            dan akses ke berbagai keistimewaan khusus anggota!
          </p>
          <Link 
            href="/register" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-semibold transition-colors shadow-md hover:shadow-lg"
          >
            Daftar sekarang
          </Link>
        </div>

        {/* Social Connect */}
        <div className="mt-6 text-center">
          <h4 className="text-sm font-semibold mb-3 text-gray-700">TETAP TERHUBUNG</h4>
          <div className="flex justify-center space-x-4">
            <Link href="https://www.facebook.com" className="text-gray-600 hover:text-black transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </Link>
            <Link href="https://www.instagram.com" className="text-gray-600 hover:text-black transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </Link>
            <Link href="https://www.youtube.com" className="text-gray-600 hover:text-black transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage