'use client'

import { useState, useCallback } from 'react'
import CountrySearch from '@/components/CountrySearch'
import CountryCard from '@/components/CountryCard'
import WeatherDisplay from '@/components/WeatherDisplay'
import NewsList from '@/components/NewsList'
import TemperatureChart from '@/components/TemperatureChart'
import LoadingSpinner from '@/components/LoadingSpinner'
import ErrorMessage from '@/components/ErrorMessage'
import ThemeToggle from '@/components/ThemeToggle'
import { CountryDataResponse, Country } from '@/types'

export default function Home() {
  const [countryData, setCountryData] = useState<CountryDataResponse | null>(
    null
  )
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCountrySelect = useCallback(async (country: Country) => {
    setIsLoading(true)
    setError(null)
    setCountryData(null)

    try {
      const response = await fetch(
        `/api/country/${encodeURIComponent(country.name.common)}`
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to fetch country data')
      }

      const data: CountryDataResponse = await response.json()
      setCountryData(data)
    } catch (err) {
      console.error('Error fetching country data:', err)
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleRetry = useCallback(() => {
    if (countryData) {
      handleCountrySelect(countryData.country)
    }
  }, [countryData, handleCountrySelect])

  return (
    <section className='min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'>
      <main className='container mx-auto px-4 py-8 max-w-7xl'>
        <div className='flex justify-end mb-4'>
          <ThemeToggle />
        </div>

        <header className='text-center mb-8'>
          <h1 className='text-4xl font-bold text-gray-900 dark:text-white mb-2'>
            Global Pulse Dashboard
          </h1>
          <p className='text-gray-600 dark:text-gray-300'>
            Explore countries, weather, and news from around the world
          </p>
        </header>

        <div className='mb-8'>
          <CountrySearch
            onCountrySelect={handleCountrySelect}
            isLoading={isLoading}
          />
        </div>

        {isLoading && (
          <div className='mb-8'>
            <LoadingSpinner />
          </div>
        )}

        {error && !isLoading && (
          <div className='mb-8'>
            <ErrorMessage message={error} onRetry={handleRetry} />
          </div>
        )}

        {countryData && !isLoading && (
          <div className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <CountryCard country={countryData.country} />
              <WeatherDisplay weather={countryData.weather} />
            </div>

            <div>
              <TemperatureChart forecast={countryData.weather.forecast} />
            </div>

            <div>
              <NewsList news={countryData.news} />
            </div>
          </div>
        )}

        {!countryData && !isLoading && !error && (
          <div className='text-center py-16'>
            <div className='text-6xl mb-4'>🌍</div>
            <h2 className='text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2'>
              Search for a country to get started
            </h2>
            <p className='text-gray-500 dark:text-gray-400'>
              Enter a country name above to see its details, weather, and latest
              news
            </p>
          </div>
        )}
      </main>
    </section>
  )
}
