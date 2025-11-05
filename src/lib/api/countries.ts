import { Country } from '@/types'

const REST_COUNTRIES_API = process.env.REST_COUNTRIES_API || 'https://restcountries.com/v3.1'

export async function getCountryByName(name: string): Promise<Country | null> {
  try {
    const response = await fetch(
      `${REST_COUNTRIES_API}/name/${encodeURIComponent(name)}?fields=name,capital,population,region,subregion,flags,latlng,currencies,languages,area,timezones`
    )

    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error(`REST Countries API error: ${response.statusText}`)
    }

    const data = await response.json()

    if (Array.isArray(data) && data.length > 0) {
      return data[0] as Country
    }

    return null
  } catch (error) {
    console.error('Error fetching country data:', error)
    throw new Error(`Failed to fetch country data: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

export async function searchCountries(query: string): Promise<Country[]> {
  try {
    const response = await fetch(
      `${REST_COUNTRIES_API}/name/${encodeURIComponent(query)}?fields=name,capital,population,region,flags`
    )

    if (!response.ok) {
      if (response.status === 404) {
        return []
      }
      throw new Error(`REST Countries API error: ${response.statusText}`)
    }

    const data = await response.json()
    return Array.isArray(data) ? (data as Country[]) : []
  } catch (error) {
    console.error('Error searching countries:', error)
    return []
  }
}

export async function getAllCountries(): Promise<Country[]> {
  try {
    const response = await fetch(
      `${REST_COUNTRIES_API}/all?fields=name,capital,population,region,flags`
    )

    if (!response.ok) {
      throw new Error(`REST Countries API error: ${response.statusText}`)
    }

    const data = await response.json()
    return Array.isArray(data) ? (data as Country[]) : []
  } catch (error) {
    console.error('Error fetching all countries:', error)
    return []
  }
}

