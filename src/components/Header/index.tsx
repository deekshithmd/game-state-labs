import { DateRangePicker } from '../DatePicker'

interface HeaderProps {
    onPageRefresh: () => void,
    onDateChange: (startDate: Date, endDate: Date) => void;
    dateRange: {
        startDate: Date;
        endDate: Date;
    }
}

export const Header = ({ onPageRefresh, onDateChange, dateRange }: HeaderProps) => {
    return (
        <div className='w-full flex items-center justify-between sticky top-0 z-10 bg-yellow-50 pt-5 pb-2 border-b border-gray-800'>
            <button className='text-3xl'>Content Performance</button>

            <div className='flex items-center gap-2'>
                <button className='bg-white rounded-full border px-3 py-0.5 cursor-pointer'>Blog <span className='text-xs'>❌</span></button>
                <div>
                    <DateRangePicker onDateChange={onDateChange} dateRange={dateRange} />
                </div>
                <button className='bg-white rounded-full border px-3 py-0.5 cursor-pointer' onClick={() => onPageRefresh()}>⭮ Refresh</button>
            </div>
        </div>
    )
}