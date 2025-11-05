'use client'

export default function LoadingSpinner() {
  return (
    <div className='flex items-center justify-center p-8' data-testid='loading-spinner'>
      <div className='relative'>
        <div className='w-16 h-16 border-4 border-blue-200 dark:border-blue-800 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin'></div>
      </div>
    </div>
  )
}
