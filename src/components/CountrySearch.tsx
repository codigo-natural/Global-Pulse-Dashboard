'use client'

import { useState, useEffect, useRef } from 'react'
import { getAllCountries } from '@/lib/api/countries'
import { Country } from '@/types'

interface CountrySearchProps {
  onCountrySelect: (country: Country) => void
  isLoading?: boolean
}

export default function CountrySearch({
  onCountrySelect,
  isLoading,
}: CountrySearchProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [countries, setCountries] = useState<Country[]>([])
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [isLoadingCountries, setIsLoadingCountries] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsLoadingCountries(true)
    getAllCountries()
      .then((data) => {
        setCountries(data)
        setFilteredCountries(data.slice(0, 10))
      })
      .catch((error) => {
        console.error('Error loading countries:', error)
      })
      .finally(() => {
        setIsLoadingCountries(false)
      })
  }, [])

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredCountries(countries.slice(0, 10))
    } else {
      const filtered = countries
        .filter((country) =>
          country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 10)
      setFilteredCountries(filtered)
    }
  }, [searchTerm, countries])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleCountryClick = (country: Country) => {
    setSearchTerm(country.name.common)
    setShowDropdown(false)
    onCountrySelect(country)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setShowDropdown(true)
  }

  const handleInputFocus = () => {
    setShowDropdown(true)
  }

  return (
    <div ref={searchRef} className='relative w-full max-w-md mx-auto'>
      <div className='relative'>
        <input
          type='text'
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder='Search for a country...'
          disabled={isLoading || isLoadingCountries}
          className='w-full px-4 py-3 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed'
        />
        <svg
          className='absolute left-3 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
          />
        </svg>
        {(isLoading || isLoadingCountries) && (
          <div className='absolute right-3 top-3.5'>
            <div className='w-5 h-5 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin'></div>
          </div>
        )}
      </div>

      {showDropdown && filteredCountries.length > 0 && (
        <div className='absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto'>
          {filteredCountries.map((country) => (
            <button
              key={country.name.common}
              onClick={() => handleCountryClick(country)}
              className='w-full px-4 py-2 text-left hover:bg-blue-50 dark:hover:bg-gray-700 focus:bg-blue-50 dark:focus:bg-gray-700 focus:outline-none flex items-center gap-2 text-gray-900 dark:text-white'
            >
              <img
                src={country.flags.png}
                alt={country.flags.alt || country.name.common}
                className='w-6 h-4 object-cover rounded'
              />
              <span>{country.name.common}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
