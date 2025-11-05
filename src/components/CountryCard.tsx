'use client'

import { Country } from '@/types'
import Image from 'next/image'

interface CountryCardProps {
  country: Country
}

export default function CountryCard({ country }: CountryCardProps) {
  return (
    <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700'>
      <div className='p-6'>
        <div className='flex items-start gap-4 mb-4'>
          <div className='relative w-24 h-16 shrink-0 border border-gray-200 dark:border-gray-700 rounded overflow-hidden'>
            <Image
              src={country.flags.png}
              alt={country.flags.alt || `${country.name.common} flag`}
              fill
              className='object-cover'
              sizes='96px'
            />
          </div>
          <div className='flex-1'>
            <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-1'>
              {country.name.common}
            </h2>
            <p className='text-sm text-gray-600 dark:text-gray-300'>
              {country.name.official}
            </p>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-4 mt-4'>
          <div>
            <p className='text-sm text-gray-500 dark:text-gray-400 mb-1'>
              Population
            </p>
            <p className='text-lg font-semibold text-gray-900 dark:text-white'>
              {country.population.toLocaleString()}
            </p>
          </div>
          <div>
            <p className='text-sm text-gray-500 dark:text-gray-400 mb-1'>
              Region
            </p>
            <p className='text-lg font-semibold text-gray-900 dark:text-white'>
              {country.region}
            </p>
          </div>
          {country.capital && country.capital.length > 0 && (
            <div>
              <p className='text-sm text-gray-500 dark:text-gray-400 mb-1'>
                Capital
              </p>
              <p className='text-lg font-semibold text-gray-900 dark:text-white'>
                {country.capital[0]}
              </p>
            </div>
          )}
          {country.subregion && (
            <div>
              <p className='text-sm text-gray-500 dark:text-gray-400 mb-1'>
                Subregion
              </p>
              <p className='text-lg font-semibold text-gray-900 dark:text-white'>
                {country.subregion}
              </p>
            </div>
          )}
          {country.area && (
            <div>
              <p className='text-sm text-gray-500 dark:text-gray-400 mb-1'>
                Area
              </p>
              <p className='text-lg font-semibold text-gray-900 dark:text-white'>
                {country.area.toLocaleString()} km²
              </p>
            </div>
          )}
          {country.languages && (
            <div>
              <p className='text-sm text-gray-500 dark:text-gray-400 mb-1'>
                Languages
              </p>
              <p className='text-lg font-semibold text-gray-900 dark:text-white'>
                {Object.values(country.languages).slice(0, 2).join(', ')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
