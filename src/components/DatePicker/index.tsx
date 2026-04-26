import { useState, useRef, useEffect } from "react";

import { DateRange } from "react-date-range";
import type { Range } from "react-date-range";

import { format } from "date-fns";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import { initialDate } from '@/constants/constants';

interface DateRangePickerProps {
    onDateChange: (
        startDate: Date,
        endDate: Date,
    ) => void;
    dateRange: {
        startDate: Date;
        endDate: Date;
    }
}

export const DateRangePicker = ({ onDateChange, dateRange }: DateRangePickerProps) => {
    const [open, setOpen] = useState<boolean>(false);

    const [range, setRange] = useState<Range>(dateRange);

    const ref = useRef<HTMLDivElement | null>(null);

    // close on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const start = range.startDate;
    const end = range.endDate;

    const handleResetDateRange = () => {
        setRange(initialDate);
        onDateChange(initialDate.startDate, initialDate.endDate);
        setOpen(false);
    }

    return (
        <div className="relative inline-block" ref={ref}>
            {/* Trigger */}
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="flex items-center gap-2 px-3 py-1.5 border rounded-full text-sm bg-white shadow-sm hover:bg-gray-50"
            >
                📅
                {start && end
                    ? `${format(start, "MMM d")} - ${format(end, "MMM d, yyyy")}`
                    : "Select Date"}
            </button>

            {/* Calendar */}
            {open && (
                <div className="absolute right-0 mt-2 z-50 bg-white shadow-lg rounded-lg p-2">
                    <DateRange
                        editableDateInputs
                        moveRangeOnFirstSelection={false}
                        ranges={[{ ...range, key: 'selection' }]}
                        onChange={(item) => {
                            if (item.selection) {
                                setRange(item.selection);
                            }
                        }}
                    />
                    <div className="flex items-center justify-end gap-4">
                        <button className="cursor-pointer text-gray-600" onClick={handleResetDateRange}>Reset</button>
                        <button
                            className="rounded-sm bg-blue-600 text-white px-2 py-0.5"
                            onClick={() => {
                                setOpen(false);
                                onDateChange(range.startDate as Date, range.endDate as Date);
                            }}
                        >
                            Apply
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
