'use client'

import { Weather } from '@/types'
import { useTheme } from 'next-themes'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

interface TemperatureChartProps {
  forecast?: Weather['forecast']
}

export default function TemperatureChart({ forecast }: TemperatureChartProps) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  if (!forecast || forecast.length === 0) {
    return (
      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center text-gray-500 dark:text-gray-400'>
        <p>No forecast data available</p>
      </div>
    )
  }

  const chartData = forecast.map((item) => ({
    date: new Date(item.date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    }),
    temperature: Math.round(item.temperature),
  }))

  return (
    <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
      <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-4'>
        3-Day Forecast
      </h3>
      <ResponsiveContainer width='100%' height={250}>
        <LineChart data={chartData}>
          <CartesianGrid
            strokeDasharray='3 3'
            stroke='#e5e7eb'
            className='dark:stroke-gray-700'
          />
          <XAxis
            dataKey='date'
            stroke='#6b7280'
            className='dark:stroke-gray-400'
            style={{ fontSize: '12px' }}
          />
          <YAxis
            stroke='#6b7280'
            className='dark:stroke-gray-400'
            label={{
              value: 'Temperature (°C)',
              angle: -90,
              position: 'insideLeft',
              style: { fontSize: '12px', fill: '#6b7280' },
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? '#1f2937' : '#fff',
              border: isDark ? '1px solid #374151' : '1px solid #e5e7eb',
              borderRadius: '8px',
              color: isDark ? '#f3f4f6' : '#000',
            }}
            formatter={(value: number) => [`${value}°C`, 'Temperature']}
          />
          <Line
            type='monotone'
            dataKey='temperature'
            stroke='#3b82f6'
            strokeWidth={2}
            dot={{ fill: '#3b82f6', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
