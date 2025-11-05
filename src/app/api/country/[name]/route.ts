import { NextRequest, NextResponse } from 'next/server'
import { getCountryByName } from '@/lib/api/countries'
import { getWeatherByCoordinates } from '@/lib/api/weather'
import { getNewsByCountry } from '@/lib/api/news'
import { getCache, setCache, CACHE_KEYS, CACHE_TTL } from '@/lib/cache/cache'
import { CountryDataResponse, ApiError } from '@/types'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params

    if (!name || typeof name !== 'string') {
      return NextResponse.json(
        { message: 'Country name is required' },
        { status: 400 }
      )
    }

    const cacheKey = CACHE_KEYS.country(name)
    const cachedData = getCache<CountryDataResponse>(cacheKey)
    if (cachedData) {
      return NextResponse.json(cachedData)
    }

    // Fetch country data
    const country = await getCountryByName(name)

    if (!country) {
      return NextResponse.json(
        { message: `Country "${name}" not found` },
        { status: 404 }
      )
    }

    // Check if country has capital and coordinates
    if (!country.capital || country.capital.length === 0) {
      return NextResponse.json(
        {
          message: `Country "${name}" does not have a capital city`,
          code: 'NO_CAPITAL'
        },
        { status: 400 }
      )
    }

    if (!country.latlng || country.latlng.length !== 2) {
      return NextResponse.json(
        {
          message: `Country "${name}" does not have valid coordinates`,
          code: 'NO_COORDINATES'
        },
        { status: 400 }
      )
    }

    const [latitude, longitude] = country.latlng

    // Fetch weather and news in parallel (with caching)
    const weatherKey = CACHE_KEYS.weather(latitude, longitude)
    const newsKey = CACHE_KEYS.news(country.name.common)

    let weather = getCache(weatherKey)
    let news = getCache(newsKey)

    // Fetch weather if not cached
    if (!weather) {
      try {
        weather = await getWeatherByCoordinates(latitude, longitude)
        setCache(weatherKey, weather, CACHE_TTL.weather)
      } catch (error) {
        console.error('Error fetching weather:', error)
        // Continue without weather if it fails
        weather = {
          temperature: 0,
          condition: 'Unknown',
          windSpeed: 0,
          humidity: 0,
        }
      }
    }

    // Fetch news if not cached
    if (!news) {
      try {
        news = await getNewsByCountry(country.name.common)
        setCache(newsKey, news, CACHE_TTL.news)
      } catch (error) {
        console.error('Error fetching news:', error)
        // Continue without news if it fails
        news = []
      }
    }

    // Build unified response
    const response: CountryDataResponse = {
      country,
      weather: weather as any,
      news: news as any,
    }

    // Cache the full response
    setCache(cacheKey, response, CACHE_TTL.country)

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error in /api/country/[name]:', error)
    return NextResponse.json(
      {
        message: 'Internal server error',
        code: 'INTERNAL_ERROR',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

