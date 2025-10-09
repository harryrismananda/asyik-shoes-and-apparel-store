"use client"

import Link from 'next/link'
import Image from 'next/image'
import Logo from '../../../../public/asyik-logo-removebg-preview.png'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { IUser } from '@/types/type'
import { showError, showSuccessRegister } from '@/utils/alert'


const RegisterPage = () => {
  const router = useRouter()
  const [formData, setFormData] = useState<IUser>({
    name: "",
    username: "",
    email: "",
    password: ""
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, formData: IUser) => {
    e.preventDefault()
    
    try {
      const resp: Response = await fetch(`http://localhost:3000/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      } )
      const data = await resp.json()
      // console.log(data)
      if(!resp.ok) {
        throw new Error(data.message)
      }
      showSuccessRegister()
      router.push('/login')
      return
    // redirect('/login', RedirectType.replace)
    } catch (error:unknown) {
      console.log(error);
      return showError(error as string)
    }
    
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Image src={Logo} alt="Japan Shoes Logo" className="h-32 w-auto object-contain" width={160} height={128} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">REGISTER</h1>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-xl p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">Buat Akun</h2>
          
          <form className="space-y-4" onSubmit={(e) => handleSubmit(e, formData)}>
          
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) => {
                  handleChange(e)
                }}
                className="w-full  px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
              />
            </div>

            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={(e) => {
                  handleChange(e)
                }}
                className="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={(e) => {
                  handleChange(e)
                }}
                className="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password <span className="text-red-600">*</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={(e) => {
                  handleChange(e)
                }}
                className="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold transition-colors shadow-lg hover:shadow-xl"
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
        <div className="mt-8 bg-white border border-gray-200 rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-bold mb-2 text-gray-900">REWARD YOUR MIND, REWARD YOUR BODY</h3>
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