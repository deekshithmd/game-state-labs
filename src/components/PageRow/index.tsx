import type { PageDetails } from '@/types/dashboard'

interface PageRowProps {
    page: PageDetails
    isSelected: boolean
    onClick: (id: string) => void
}

export const PageRow = ({ page, isSelected, onClick }: PageRowProps) => {
    return (
        <tr
            onClick={() => onClick(page.id)}
            className={`border-b cursor-pointer transition-colors ${isSelected ? 'bg-blue-50' : 'hover:bg-blue-50'
                }`}
        >
            <td className='px-6 py-4'>
                <div className='text-sm font-medium text-gray-900'>{page.title}</div>
                <div className='text-xs text-gray-500 mt-1'>{page.path}</div>
            </td>

            <td className='px-6 py-4'>
                <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800'>
                    {page.section}
                </span>
            </td>

            {/* Views */}
            <td className='px-6 py-4 text-right text-sm text-gray-900'>
                {page.pageviews.toLocaleString()}
            </td>

            {/* Uniques */}
            <td className='px-6 py-4 text-right text-sm text-gray-900'>
                {page.unique_visitors.toLocaleString()}
            </td>

            {/* Avg Time */}
            <td className='px-6 py-4 text-right text-sm text-gray-900'>
                {Math.round(page.avg_time_on_page)}s
            </td>

            {/* Bounce Rate */}
            <td className='px-6 py-4 text-right text-sm text-gray-900'>
                {page.bounce_rate.toFixed(1)}%
            </td>
        </tr>
    )
}
