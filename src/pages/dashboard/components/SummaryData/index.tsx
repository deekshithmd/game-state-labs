import { SummaryGrid } from '@/components/SummaryGrid'
import type { Summary } from '@/types/dashboard'

interface SummaryDataProps {
    summaryError: Error | null
    summaryLoading: boolean
    summary: Summary | undefined,
}

export const SummaryData = ({ summaryError, summaryLoading, summary }: SummaryDataProps) => {
    return (
        <div className='summary-container pt-3'>
            {summaryError && (
                <div className='mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800'>
                    Error loading summary: {summaryError.message}
                </div>
            )}
            <SummaryGrid summary={summary} isLoading={summaryLoading} />
        </div>
    )
}