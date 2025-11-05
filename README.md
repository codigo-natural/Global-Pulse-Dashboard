# Global Pulse Dashboard

A full-stack web application that displays information about countries, their current weather, and recent news headlines. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Country Search**: Search and browse countries with autocomplete functionality
- **Country Details**: View comprehensive information including flag, population, region, capital, and more
- **Weather Information**: Current weather conditions and 3-day forecast for the country's capital
- **News Headlines**: Latest news articles related to the selected country
- **Interactive Charts**: Temperature variation visualization for the next 3 days
- **Caching**: Intelligent caching system to optimize API calls and improve performance
- **Error Handling**: Robust error handling with retry functionality
- **Responsive Design**: Beautiful, modern UI that works on all devices

## Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework
- **Recharts** - Lightweight charting library for React

### Backend
- **Next.js API Routes** - Server-side API endpoints
- **Node.js** - Runtime environment

### Caching & Performance
- **node-cache** - In-memory caching with TTL
- **Next.js Cache API** - Built-in caching for SSR/SSG

### APIs Used
- **REST Countries API** - Country metadata (https://restcountries.com)
- **Open-Meteo API** - Weather data (https://api.open-meteo.com)
- **NewsData.io API** - News headlines (https://newsdata.io) - Requires API key

### Testing
- **Jest** - Testing framework
- **ts-jest** - TypeScript support for Jest

### Deployment
- **Vercel** - Hosting platform (optimized for Next.js)

## Prerequisites

- Node.js 20+ 
- npm
- NewsData.io API key

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd global-pulse-dashboard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```bash
# Copy the example file
cp .env.example .env.local
```

Edit `.env.local` and add your NewsData.io API key:

```env
NEWSDATA_API_KEY=your_api_key_here
```

**Note**: You can get a free API key from [NewsData.io](https://newsdata.io/). The news feature will be disabled if no API key is provided, but the rest of the application will work normally.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### 5. Build for production

```bash
npm run build
npm start
```

## Testing

Run tests:

```bash
npm run test
```

Run tests in watch mode:

```bash
npm run test:watch
```

## Architecture

### API Endpoint

The main API endpoint is `/api/country/[name]` which:

1. Fetches country data from REST Countries API
2. Extracts the capital's coordinates
3. Fetches weather data from Open-Meteo API
4. Fetches news articles from NewsData.io API
5. Returns a unified JSON response

### Caching Strategy

- **Country Data**: Cached for 1 hour (rarely changes)
- **Weather Data**: Cached for 5 minutes (updates frequently)
- **News Data**: Cached for 15 minutes (updates moderately)

Caching is implemented using `node-cache` with configurable TTL values.

### Error Handling

- Graceful degradation: If one API fails, partial data is still returned
- Retry functionality in the frontend
- User-friendly error messages
- Proper HTTP status codes

## Design Decisions

### Component Architecture

- **Client Components**: Used for interactive features (search, state management)
- **Server Components**: Used where possible for better performance
- **Separation of Concerns**: API clients, caching, and UI are separated

### State Management

- React hooks (`useState`, `useCallback`) for local state
- No global state management needed for this scope

### Performance Optimizations

- Caching at multiple levels (API route, client-side)
- Parallel API calls where possible
- Image optimization with Next.js Image component
- Lazy loading for components

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard:
   - `NEWSDATA_API_KEY`: Your NewsData.io API key
4. Deploy!

The application is optimized for Vercel deployment and will work out of the box.

### Environment Variables in Production

Make sure to set the following environment variables in your Vercel project settings:

- `NEWSDATA_API_KEY`: Your NewsData.io API key

## API Documentation

### GET /api/country/[name]

Fetches unified data for a country.

**Parameters:**
- `name` (path): Country name (e.g., "Japan", "United States")

**Response:**
```json
{
  "country": {
    "name": {
      "common": "Japan",
      "official": "Japan"
    },
    "capital": ["Tokyo"],
    "population": 125836021,
    "region": "Asia",
    "flags": {
      "png": "https://flagcdn.com/w320/jp.png",
      "svg": "https://flagcdn.com/jp.svg"
    },
    "latlng": [36.0, 138.0],
    ...
  },
  "weather": {
    "temperature": 22.3,
    "condition": "Clear sky",
    "windSpeed": 10.5,
    "humidity": 65,
    "forecast": [
      {
        "date": "2024-01-01",
        "temperature": 23
      },
      ...
    ]
  },
  "news": [
    {
      "title": "Japan opens new tech center",
      "url": "https://example.com/news1",
      "source": "TechNews",
      "description": "...",
      "publishedAt": "2024-01-01T00:00:00Z"
    },
    ...
  ]
}
```

**Error Responses:**

- `400`: Bad request (missing name, no capital/coordinates)
- `404`: Country not found
- `500`: Internal server error

## Future Improvements

- [ ] Implement Redis for distributed caching in production
- [ ] Add more visualizations (maps, additional charts)
- [ ] Implement search history and favorites
- [ ] Add internationalization (i18n)
- [ ] PWA capabilities
- [ ] WebSocket for real-time updates
- [ ] Pagination or infinite scroll for news

## Author

Built as part of a full-stack developer technical assessment by Ivan Camilo.
