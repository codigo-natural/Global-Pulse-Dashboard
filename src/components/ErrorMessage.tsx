'use client'

interface ErrorMessageProps {
  message: string
  onRetry?: () => void
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className='bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-center'>
      <p className='text-red-800 dark:text-red-300 mb-3'>{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className='px-4 py-2 bg-red-600 dark:bg-red-700 text-white rounded hover:bg-red-700 dark:hover:bg-red-600 transition-colors'
        >
          Retry
        </button>
      )}
    </div>
  )
}
