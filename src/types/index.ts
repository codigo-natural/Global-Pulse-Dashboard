export interface Country {
  name: {
    common: string
    official: string
  }
  capital: string[]
  population: number
  region: string
  subregion?: string
  flags: {
    png: string
    svg: string
    alt?: string
  }
  latlng: [number, number]
  currencies?: Record<string, { name: string; symbol: string }>
  languages?: Record<string, string>
  area?: number
  timezones?: string[]
}

export interface Weather {
  temperature: number
  condition: string
  windSpeed: number
  humidity: number
  forecast?: {
    date: string
    temperature: number
  }[]
}

export interface NewsArticle {
  title: string
  url: string
  source: string
  description?: string
  publishedAt?: string
}

export interface CountryDataResponse {
  country: Country
  weather: Weather
  news: NewsArticle[]
}

export interface ApiError {
  message: string
  code?: string
  details?: unknown
}

