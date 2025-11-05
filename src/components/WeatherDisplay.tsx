'use client'

import { Weather } from '@/types'

interface WeatherDisplayProps {
  weather: Weather
}

export default function WeatherDisplay({ weather }: WeatherDisplayProps) {
  return (
    <div className='bg-linear-to-br from-blue-500 to-blue-700 dark:from-blue-600 dark:to-blue-800 rounded-lg shadow-md p-6 text-white'>
      <h3 className='text-xl font-bold mb-4'>Current Weather</h3>
      <div className='flex items-center justify-between mb-4'>
        <div>
          <p className='text-5xl font-bold mb-2'>
            {Math.round(weather.temperature)}°C
          </p>
          <p className='text-lg opacity-90'>{weather.condition}</p>
        </div>
        <div className='text-6xl'>🌤️</div>
      </div>
      <div className='grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-blue-400/30'>
        <div>
          <p className='text-sm opacity-80 mb-1'>Wind Speed</p>
          <p className='text-lg font-semibold'>{weather.windSpeed} km/h</p>
        </div>
        <div>
          <p className='text-sm opacity-80 mb-1'>Humidity</p>
          <p className='text-lg font-semibold'>{weather.humidity}%</p>
        </div>
      </div>
    </div>
  )
}
