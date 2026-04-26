import type {
    Summary,
    SummaryResponse,
    PagesResponse,
    TimeSeriesResponse,
    DailyView,
} from '../types/dashboard'

export interface ApiResponse<T> {
    data: T | null
    error: Error | null
    loading: boolean
}

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

async function fetchApi<T>(
    endpoint: string,
    options?: RequestInit
): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`

    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers,
            },
            ...options,
        })

        if (!response.ok) {
            throw new Error(
                `API Error: ${response.status} ${response.statusText}`
            )
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error(`Fetch failed for ${url}:`, error)
        throw error instanceof Error
            ? error
            : new Error('An unknown error occurred')
    }
}

/**
 * Fetch dashboard summary
 * GET /summary
 */
export async function getSummary(): Promise<Summary> {
    const response = await fetchApi<SummaryResponse>('/summary')
    return response.data
}

/**
 * Fetch all pages with performance summary
 * GET /pages
 */
export async function getPages(
    dateRange: { startDate: Date, endDate: Date },
    page: number = 1,
    perPage: number = 20,
    search: string = '',
    section: string = '',
    status: string = ''
): Promise<PagesResponse> {
    const params = new URLSearchParams({
        start_date: dateRange.startDate.toISOString(),
        end_date: dateRange.endDate.toISOString(),
        page: String(page),
        per_page: String(perPage),
        ...(search && { search }),
        ...(section && { section }),
        ...(status && { status }),
    })
    const response = await fetchApi<PagesResponse>(`/pages?${params}`)
    return response
}

/**
 * Fetch analytics for a specific page
 * GET /pages/:id/timeseries
 */
export async function getTimeSeries(id: string): Promise<DailyView[]> {
    const response = await fetchApi<TimeSeriesResponse>(`/pages/${id}/timeseries`)

    return response.data?.points
}