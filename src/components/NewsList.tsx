'use client'

import { NewsArticle } from '@/types'

interface NewsListProps {
  news: NewsArticle[]
}

export default function NewsList({ news }: NewsListProps) {
  if (news.length === 0) {
    return (
      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center text-gray-500 dark:text-gray-400'>
        <p>No news available at the moment</p>
        <p className='text-sm mt-2'>
          News feature requires a NewsData.io API key
        </p>
      </div>
    )
  }

  return (
    <section className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
      <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-4'>
        Latest News
      </h3>
      <div className='space-y-4'>
        {news.map((article, index) => (
          <a
            key={index}
            href={article.url}
            target='_blank'
            rel='noopener noreferrer'
            className='block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md transition-all'
          >
            <h4 className='font-semibold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400'>
              {article.title}
            </h4>
            {article.description && (
              <p className='text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-2'>
                {article.description}
              </p>
            )}
            <div className='flex items-center justify-between mt-2'>
              <span className='text-xs text-gray-500 dark:text-gray-400'>
                {article.source}
              </span>
              {article.publishedAt && (
                <span className='text-xs text-gray-500 dark:text-gray-400'>
                  {new Date(article.publishedAt).toLocaleDateString()}
                </span>
              )}
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
