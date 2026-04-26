import { PER_PAGE_OPTIONS } from '@/constants/constants';

interface PaginationProps {
    totalPages: number;
    currentPage: number;
    perPage: number;
    handleChangePerPage: (perPage: number) => void;
    handlePageChange: (page: number) => void;
}

export const Pagination = ({
    totalPages,
    currentPage,
    perPage,
    handleChangePerPage,
    handlePageChange,
}: PaginationProps) => {

    return (
        <div className='w-full flex items-center justify-between'>
            <select
                value={perPage}
                onChange={(e) => handleChangePerPage(Number(e.target.value))}
                className='p-2 pl-1 text-sm'
            >
                {
                    PER_PAGE_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))
                }
            </select>
            <div className="flex items-center gap-2">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded border border-gray-300 text-sm font-medium text-gray-700 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    ← Prev
                </button>
                <p className='text-sm'>
                    Page {currentPage} of {totalPages}
                </p>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded border border-gray-300 text-sm font-medium text-gray-700 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    Next →
                </button>
            </div>
        </div>
    );
};
