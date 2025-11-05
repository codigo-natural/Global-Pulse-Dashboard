'use client'

export default function LoadingSkeleton() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'>
      <div className='container mx-auto px-4 py-8 max-w-7xl'>
        <header className='text-center mb-8'>
          <div className='h-10 w-64 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto mb-2 animate-pulse' />
          <div className='h-5 w-96 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto animate-pulse' />
        </header>

        <div className='mb-8 max-w-md mx-auto'>
          <div className='h-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse' />
        </div>

        <div className='space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden'>
              <div className='p-6'>
                <div className='flex items-start gap-4 mb-4'>
                  <div className='w-24 h-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse' />
                  <div className='flex-1'>
                    <div className='h-7 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse' />
                    <div className='h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse' />
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-4 mt-4'>
                  {[...Array(6)].map((_, i) => (
                    <div key={i}>
                      <div className='h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse' />
                      <div className='h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse' />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className='bg-gradient-to-br from-blue-500 to-blue-700 dark:from-blue-600 dark:to-blue-800 rounded-lg shadow-md p-6'>
              <div className='h-6 w-32 bg-blue-400 dark:bg-blue-500 rounded mb-4 animate-pulse' />
              <div className='flex items-center justify-between mb-4'>
                <div>
                  <div className='h-16 w-24 bg-blue-400 dark:bg-blue-500 rounded mb-2 animate-pulse' />
                  <div className='h-5 w-40 bg-blue-400 dark:bg-blue-500 rounded animate-pulse' />
                </div>
                <div className='w-16 h-16 bg-blue-400 dark:bg-blue-500 rounded-full animate-pulse' />
              </div>
              <div className='grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-blue-400/30'>
                <div>
                  <div className='h-3 w-20 bg-blue-400 dark:bg-blue-500 rounded mb-2 animate-pulse' />
                  <div className='h-5 w-16 bg-blue-400 dark:bg-blue-500 rounded animate-pulse' />
                </div>
                <div>
                  <div className='h-3 w-20 bg-blue-400 dark:bg-blue-500 rounded mb-2 animate-pulse' />
                  <div className='h-5 w-16 bg-blue-400 dark:bg-blue-500 rounded animate-pulse' />
                </div>
              </div>
            </div>
          </div>

          <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
            <div className='h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-4 animate-pulse' />
            <div className='h-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse' />
          </div>

          <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
            <div className='h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-4 animate-pulse' />
            <div className='space-y-4'>
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className='p-4 border border-gray-200 dark:border-gray-700 rounded-lg'
                >
                  <div className='h-5 w-full bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse' />
                  <div className='h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse' />
                  <div className='flex items-center justify-between mt-2'>
                    <div className='h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse' />
                    <div className='h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse' />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
