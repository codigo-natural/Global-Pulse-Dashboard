import NodeCache from 'node-cache'

const cache = new NodeCache({
  stdTTL: 300,
  checkperiod: 120,
  useClones: false,
})

export const CACHE_KEYS = {
  country: (name: string) => `country:${name.toLowerCase()}`,
  weather: (lat: number, lng: number) => `weather:${lat},${lng}`,
  news: (country: string) => `news:${country.toLowerCase()}`,
} as const

export const CACHE_TTL = {
  country: 3600,
  weather: 300,
  news: 900,
} as const

export function getCache<T>(key: string): T | undefined {
  return cache.get<T>(key)
}

export function setCache<T>(key: string, value: T, ttl?: number): boolean {
  return cache.set(key, value, ttl || 300)
}

export default cache

