"use client"

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDebouncedCallback } from "use-debounce";



const SearchForm = () => {
  const [query, setQuery] = useState<string>("")
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target;
    setQuery(value)
    handleSearch(value)
  }

  const handleSearch = useDebouncedCallback((value) => {
    router.push(`/products?query=${value}`);
  }, 300)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push(`/products?query=${query}`);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="relative">
          <input
            type="text"
            name="query"
            onChange={handleChange}
            value={query}
            placeholder="Search products..."
            className="w-full text-gray-300 hover:text-white font-medium transition-colors border-b-2 border-transparent hover:border-blue-500 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="absolute left-0 top-0 mt-2 ml-3 text-gray-500 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </form>
    
    </>
  )
}

export default SearchForm