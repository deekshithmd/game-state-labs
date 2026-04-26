interface SummaryCardProps {
    title: string
    value: string | number
    change: number
    trend: 'up' | 'down'
}

export const SummaryCard = ({
    title,
    value,
    change,
    trend,
}: SummaryCardProps) => {
    const isPositive = trend === 'up'
    const textColor = isPositive ? 'text-green-600' : 'text-red-600'
    const trendIcon = trend === 'up' ? '↑' : '↓'

    return (
        <div className='rounded-lg border-2 border-gray-600 p-5 transition-shadow'>
            <div className='space-y-2'>
                <p className='text-sm font-medium text-gray-600'>{title}</p>
                <p className='text-3xl font-bold text-gray-900'>
                    {typeof value === 'number' ? value.toLocaleString() : value}
                </p>
                <div className='rounded w-fit'>
                    <span className={`text-xs font-semibold ${textColor}`}>
                        {trendIcon} {Math.abs(change)}%
                    </span>{' '}
                    vs prev period
                </div>
            </div>
        </div>
    )
}
