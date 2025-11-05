import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4'>
      <div className='text-center max-w-md'>
        <div className='text-9xl font-bold text-blue-600 dark:text-blue-400 mb-4'>
          404
        </div>
        <h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-2'>
          Page Not Found
        </h1>
        <p className='text-gray-600 dark:text-gray-400 mb-8'>
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href='/'
          className='inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors'
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}
