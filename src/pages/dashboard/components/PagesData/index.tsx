import { useMemo } from 'react'

import { DetailsPanel } from '@/components/DetailsPanel'
import { PagesTable } from '@/components/PagesTable'

import { useTimeSeries } from '@/hooks/useQueries'

import type { PagesResponse } from '@/types/dashboard'


interface PagesDataProps {
    pages: PagesResponse | undefined;
    pagesLoading: boolean;
    pagesError: Error | null;
    setSelectedPageId: (id: string) => void;
    selectedPageId: string;
    setCurrentPage: (page: number) => void;
    setPerPage: (perPage: number) => void;
    perPage: number;
    setSearchQuery: (query: string) => void;
    setSelectedSection: (section: string) => void;
    setSelectedStatus: (status: string) => void;
    searchQuery: string;
    selectedSection: string;
    selectedStatus: string;
}

export const PagesData = (props: PagesDataProps) => {
    const { pages, pagesLoading, pagesError, setSelectedPageId, selectedPageId, setCurrentPage, setSearchQuery, setSelectedSection, setSelectedStatus, searchQuery, selectedSection, selectedStatus } = props

    const { data: timeSeries, isLoading: detailsLoading } = useTimeSeries(selectedPageId)

    const selectedPageData = useMemo(() => {
        if (!selectedPageId) return null;

        return pages?.data?.find(page => page.id === selectedPageId) || null;
    }, [selectedPageId, pages]);

    const onClose = () => {
        setSelectedPageId('')
    }

    return (
        <div className='w-full grid grid-cols-1 lg:grid-cols-12 gap-6'>
            <div className='table-container lg:col-span-7'>
                {pagesError && (
                    <div className='mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800'>
                        Error loading pages: {pagesError.message}
                    </div>
                )}
                <PagesTable
                    pages={pages?.data}
                    pagination={pages?.pagination}
                    isLoading={pagesLoading}
                    onSelectPage={setSelectedPageId}
                    onPageChange={setCurrentPage}
                    onSearchChange={setSearchQuery}
                    onSectionChange={setSelectedSection}
                    onStatusChange={setSelectedStatus}
                    searchQuery={searchQuery}
                    selectedSection={selectedSection}
                    selectedStatus={selectedStatus}
                    selectedPageId={selectedPageId}
                    perPage={props.perPage}
                    setPerPage={props.setPerPage}
                />
            </div>
            <div className='lg:col-span-5'>
                <DetailsPanel page={selectedPageData} timeSeries={timeSeries} isLoading={detailsLoading} onClose={onClose} />
            </div>
        </div>

    )
}