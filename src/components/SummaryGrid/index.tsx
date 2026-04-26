import { convertSeconds } from '@/utils/timeUtils'
import type { Summary } from '../../types/dashboard'
import { SummaryCard } from '../SummaryCard'

interface SummaryGridProps {
    summary: Summary | undefined
    isLoading: boolean
}

export const SummaryGrid = ({ summary, isLoading }: SummaryGridProps) => {

    if (isLoading) {
        return (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
                {[...Array(4)].map((_, i) => (
                    <div
                        key={i}
                        className='bg-gray-200 rounded-lg h-32 animate-pulse'
                    />
                ))}
            </div>
        )
    }

    if (!summary) return null

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
            <SummaryCard
                title='pageviews'
                value={summary.pageviews.value}
                change={summary.pageviews.trend}
                trend={summary.pageviews.trend >= 0 ? 'up' : 'down'}
            />
            <SummaryCard
                title='unique visitors'
                value={summary.unique_visitors.value}
                change={summary.unique_visitors.trend}
                trend={summary.unique_visitors.trend >= 0 ? 'up' : 'down'}
            />
            <SummaryCard
                title='avg. time on page'
                value={convertSeconds(summary.avg_time_on_page.value)}
                change={summary.avg_time_on_page.trend}
                trend={summary.avg_time_on_page.trend >= 0 ? 'up' : 'down'}
            />
            <SummaryCard
                title='bounce rate'
                value={`${summary.bounce_rate.value.toFixed(1)}%`}
                change={summary.bounce_rate.trend}
                trend={summary.bounce_rate.trend >= 0 ? 'up' : 'down'}
            />
        </div>
    )
}
