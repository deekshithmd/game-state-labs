// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw'
import { db } from './db'

export const handlers = [
    // GET /api/summary with date range filtering
    http.get('/api/summary', ({ request }) => {
        const url = new URL(request.url)
        const startDate = url.searchParams.get('start_date')
        const endDate = url.searchParams.get('end_date')

        // For now, return the static data with the provided dates
        // In a real scenario, you'd calculate summary based on timeseries data
        return HttpResponse.json({
            data: db.summary.data,
            period: {
                start_date: startDate || db.summary.period.start_date,
                end_date: endDate || db.summary.period.end_date,
            },
        })
    }),

    // GET /api/pages with full filtering
    http.get('/api/pages', ({ request }) => {
        const url = new URL(request.url)

        // Query parameters
        const startDate = url.searchParams.get('start_date')
        const endDate = url.searchParams.get('end_date')
        const search = url.searchParams.get('search')
        const section = url.searchParams.get('section')
        const status = url.searchParams.get('status')
        const sortBy = url.searchParams.get('sort_by') || 'pageviews'
        const sortOrder = url.searchParams.get('sort_order') || 'desc'
        const page = parseInt(url.searchParams.get('page') || '1')
        const perPage = parseInt(url.searchParams.get('per_page') || String(db.pagesMeta.default_per_page))

        let filtered = [...db.pages.data]

        // Filter by date range (based on first_published)
        if (startDate) {
            filtered = filtered.filter(p => p.first_published >= startDate)
        }
        if (endDate) {
            filtered = filtered.filter(p => p.first_published <= endDate)
        }

        // Filter by search (path or title)
        if (search) {
            const searchLower = search.toLowerCase()
            filtered = filtered.filter(
                p =>
                    p.path.toLowerCase().includes(searchLower) ||
                    p.title.toLowerCase().includes(searchLower)
            )
        }

        // Filter by section
        if (section) {
            filtered = filtered.filter(p => p.section === section)
        }

        // Filter by status
        if (status) {
            filtered = filtered.filter(p => p.status === status)
        }

        // Apply sorting
        filtered.sort((a, b) => {
            const aVal = a[sortBy as keyof typeof a]
            const bVal = b[sortBy as keyof typeof b]

            if (typeof aVal === 'number' && typeof bVal === 'number') {
                return sortOrder === 'asc' ? aVal - bVal : bVal - aVal
            }
            return 0
        })

        // Apply pagination
        const total = filtered.length
        const totalPages = Math.ceil(total / perPage)
        const start = (page - 1) * perPage
        const paginatedData = filtered.slice(start, start + perPage)

        return HttpResponse.json({
            data: paginatedData,
            pagination: {
                page,
                per_page: perPage,
                total_pages: totalPages,
                total_items: total,
            },
        })
    }),

    // GET /api/pages/:id/timeseries with date filtering
    http.get('/api/pages/:id/timeseries', ({ params, request }) => {
        const { id } = params as { id: string }
        const url = new URL(request.url)

        const timeseriesData = db.timeseries[id]

        if (!timeseriesData) {
            return HttpResponse.json(
                { error: 'Page not found' },
                { status: 404 }
            )
        }

        let points = [...timeseriesData.data.points]

        // Date range filtering
        const startDate = url.searchParams.get('start_date')
        const endDate = url.searchParams.get('end_date')

        if (startDate) {
            points = points.filter(p => p.date >= startDate)
        }

        if (endDate) {
            points = points.filter(p => p.date <= endDate)
        }

        return HttpResponse.json({
            data: {
                page_id: id,
                points,
            },
        })
    }),
]