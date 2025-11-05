import { NewsArticle } from '@/types'

const NEWSDATA_API = process.env.NEWSDATA_API
const NEWSDATA_API_KEY = process.env.NEWSDATA_API_KEY

export async function getNewsByCountry(
  countryName: string,
  apiKey?: string
): Promise<NewsArticle[]> {
  try {
    const key = apiKey || NEWSDATA_API_KEY

    if (!key) {
      console.warn('NewsData.io API key not provided. News feature will be disabled.')
      return []
    }

    const response = await fetch(
      `${NEWSDATA_API}/news?apikey=${key}&q=${encodeURIComponent(countryName)}&language=en&category=top&size=5`
    )

    if (!response.ok) {
      if (response.status === 429) {
        console.warn('NewsData.io rate limit exceeded')
        return []
      }
      throw new Error(`NewsData.io API error: ${response.statusText}`)
    }

    const data = await response.json()

    if (data.status !== 'success' || !data.results) {
      return []
    }

    return data.results.slice(0, 5).map((article: any) => ({
      title: article.title || 'No title',
      url: article.link || '#',
      source: article.source_id || 'Unknown',
      description: article.description,
      publishedAt: article.pubDate,
    }))
  } catch (error) {
    console.error('Error fetching news data:', error)
    return []
  }
}

