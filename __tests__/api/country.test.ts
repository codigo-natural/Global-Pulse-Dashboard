import { GET } from '@/app/api/country/[name]/route'

function createMockRequest(url: string) {
  return {
    url,
    method: 'GET',
    headers: new Headers(),
    nextUrl: new URL(url),
  } as any
}

jest.mock('@/lib/api/countries', () => ({
  getCountryByName: jest.fn(),
}))

jest.mock('@/lib/api/weather', () => ({
  getWeatherByCoordinates: jest.fn(),
}))

jest.mock('@/lib/api/news', () => ({
  getNewsByCountry: jest.fn(),
}))

jest.mock('@/lib/cache/cache', () => ({
  getCache: jest.fn(),
  setCache: jest.fn(),
  CACHE_KEYS: {
    country: (name: string) => `country:${name.toLowerCase()}`,
    weather: (lat: number, lng: number) => `weather:${lat},${lng}`,
    news: (country: string) => `news:${country.toLowerCase()}`,
  },
  CACHE_TTL: {
    country: 3600,
    weather: 300,
    news: 900,
  },
}))

import { getCountryByName } from '@/lib/api/countries'
import { getWeatherByCoordinates } from '@/lib/api/weather'
import { getNewsByCountry } from '@/lib/api/news'
import { getCache } from '@/lib/cache/cache'

describe('/api/country/[name]', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return 400 if country name is missing', async () => {
    const request = createMockRequest('http://localhost:3000/api/country/')
    const params = Promise.resolve({ name: '' })

    const response = await GET(request, { params })
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.message).toBe('Country name is required')
  })

  it('should return 404 if country is not found', async () => {
    const request = createMockRequest('http://localhost:3000/api/country/InvalidCountry')
    const params = Promise.resolve({ name: 'InvalidCountry' })

      ; (getCache as jest.Mock).mockReturnValue(undefined)
      ; (getCountryByName as jest.Mock).mockResolvedValue(null)

    const response = await GET(request, { params })
    const data = await response.json()

    expect(response.status).toBe(404)
    expect(data.message).toContain('not found')
  })

  it('should return country data with weather and news', async () => {
    const mockCountry = {
      name: { common: 'Japan', official: 'Japan' },
      capital: ['Tokyo'],
      population: 125836021,
      region: 'Asia',
      flags: { png: 'https://flagcdn.com/w320/jp.png', svg: 'https://flagcdn.com/jp.svg' },
      latlng: [36.0, 138.0],
    }

    const mockWeather = {
      temperature: 22.3,
      condition: 'Clear sky',
      windSpeed: 10.5,
      humidity: 65,
      forecast: [
        { date: '2024-01-01', temperature: 23 },
        { date: '2024-01-02', temperature: 24 },
        { date: '2024-01-03', temperature: 25 },
      ],
    }

    const mockNews = [
      {
        title: 'Japan opens new tech center',
        url: 'https://example.com/news1',
        source: 'TechNews',
      },
    ]

    const request = createMockRequest('http://localhost:3000/api/country/Japan')
    const params = Promise.resolve({ name: 'Japan' })

      ; (getCache as jest.Mock).mockReturnValue(undefined)
      ; (getCountryByName as jest.Mock).mockResolvedValue(mockCountry)
      ; (getWeatherByCoordinates as jest.Mock).mockResolvedValue(mockWeather)
      ; (getNewsByCountry as jest.Mock).mockResolvedValue(mockNews)

    const response = await GET(request, { params })
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.country).toEqual(mockCountry)
    expect(data.weather).toEqual(mockWeather)
    expect(data.news).toEqual(mockNews)
  })

  it('should return 400 if country has no capital', async () => {
    const mockCountry = {
      name: { common: 'Antarctica', official: 'Antarctica' },
      capital: [],
      population: 0,
      region: 'Antarctic',
      flags: { png: 'https://flagcdn.com/w320/aq.png', svg: 'https://flagcdn.com/aq.svg' },
      latlng: [-75.0, 0.0],
    }

    const request = createMockRequest('http://localhost:3000/api/country/Antarctica')
    const params = Promise.resolve({ name: 'Antarctica' })

      ; (getCache as jest.Mock).mockReturnValue(undefined)
      ; (getCountryByName as jest.Mock).mockResolvedValue(mockCountry)

    const response = await GET(request, { params })
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.code).toBe('NO_CAPITAL')
  })
})

