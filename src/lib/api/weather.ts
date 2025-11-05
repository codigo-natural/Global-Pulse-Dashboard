import { Weather } from '@/types'

const OPEN_METEO_API = process.env.OPEN_METEO_API

export async function getWeatherByCoordinates(
  latitude: number,
  longitude: number
): Promise<Weather> {
  try {
    const response = await fetch(
      `${OPEN_METEO_API}/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m&daily=temperature_2m_max&timezone=auto&forecast_days=3`
    )

    if (!response.ok) {
      throw new Error(`Open-Meteo API error: ${response.statusText}`)
    }

    const data = await response.json()

    const current = data.current
    const daily = data.daily

    const condition = getWeatherCondition(current.weather_code)

    const forecast = daily.time.map((date: string, index: number) => ({
      date,
      temperature: daily.temperature_2m_max[index],
    }))

    return {
      temperature: current.temperature_2m,
      condition,
      windSpeed: current.wind_speed_10m,
      humidity: current.relative_humidity_2m,
      forecast: forecast.slice(0, 3),
    }
  } catch (error) {
    console.error('Error fetching weather data:', error)
    throw new Error(`Failed to fetch weather data: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

function getWeatherCondition(code: number): string {
  const conditions: Record<number, string> = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    56: 'Light freezing drizzle',
    57: 'Dense freezing drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    66: 'Light freezing rain',
    67: 'Heavy freezing rain',
    71: 'Slight snow fall',
    73: 'Moderate snow fall',
    75: 'Heavy snow fall',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail',
  }

  return conditions[code] || 'Unknown'
}

