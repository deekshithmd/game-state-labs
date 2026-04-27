import { useQuery } from '@tanstack/react-query'
import type {
    Summary,
    DailyView,
    PagesResponse,
} from '../types/dashboard'
import {
    getSummary,
    getPages,
    getTimeSeries,
} from '../services/api'

export const queryKeys = {
    all: ['dashboard'] as const,
    summary: () => [...queryKeys.all, 'summary'] as const,
    pages: (page?: number, perPage?: number, search?: string, section?: string, status?: string) =>
        (page && perPage) ? [...queryKeys.all, 'pages', page, perPage, search, section, status] as const
            : [...queryKeys.all, 'pages'] as const,
    timeSeries: (id: string) => [...queryKeys.all, 'pages', id] as const,
}

export function useSummary(options = {}) {
    return useQuery<Summary, Error>({
        queryKey: queryKeys.summary(),
        queryFn: getSummary,
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
        retry: 2,
        ...options,
    })
}

export function usePages(
    dateRange: { startDate: Date, endDate: Date },
    page: number = 1,
    perPage: number = 20,
    search: string = '',
    section: string = '',
    status: string = '',
    options = {}
) {
    return useQuery<PagesResponse, Error>({
        queryKey: queryKeys.pages(page, perPage, search, section, status),
        queryFn: () => getPages(dateRange, page, perPage, search, section, status),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        retry: 2,
        ...options,
    })
}

export function useTimeSeries(id: string, options = {}) {
    return useQuery<DailyView[], Error>({
        queryKey: queryKeys.timeSeries(id),
        queryFn: () => getTimeSeries(id),
        enabled: !!id,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        retry: 0,
        ...options,
    })
}
