import { PageRow } from "../PageRow";
import type { PageDetails } from "@/types/dashboard";
import { Pagination } from "../Pagination";

import { STATUS_OPTIONS } from "@/constants/constants";

interface Pagination {
    page: number;
    total_pages: number;
    total_items: number;
    per_page: number;
}

interface PagesTableProps {
    pages: PageDetails[] | undefined;
    pagination?: Pagination;
    isLoading: boolean;
    onSelectPage: (id: string) => void;
    onPageChange: (page: number) => void;
    onSearchChange: (search: string) => void;
    onSectionChange: (section: string) => void;
    onStatusChange: (status: string) => void;
    searchQuery: string;
    selectedSection: string;
    selectedStatus: string;
    selectedPageId?: string;
    perPage: number;
    setPerPage: (perPage: number) => void;
}

export const PagesTable = ({
    pages,
    pagination,
    isLoading,
    onSelectPage,
    onPageChange,
    onSearchChange,
    onSectionChange,
    onStatusChange,
    searchQuery,
    selectedSection,
    selectedStatus,
    selectedPageId,
    perPage,
    setPerPage,
}: PagesTableProps) => {
    const currentPage = pagination?.page || 1;
    const totalPages = pagination?.total_pages || 0;

    const handlePageChange = (newPage: number) => {
        onPageChange(newPage);
    };

    const getSections = () => {
        const sections = new Set<string>();
        pages?.forEach((page) => sections.add(page.section));
        return Array.from(sections).sort();
    };

    return (
        <div className="rounded-lg border-2 border-gray-700 overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b space-y-4">
                <div className="flex gap-3">
                    <input
                        type="text"
                        placeholder="Search pages"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="flex-1 px-3 py-2 border-2 border-gray-700 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                    />
                    <select
                        value={selectedSection}
                        onChange={(e) => onSectionChange(e.target.value)}
                        className="p-2 pl-1 border-2 border-gray-700 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                    >
                        <option value="">All Sections</option>
                        {getSections().map((section) => (
                            <option key={section} value={section}>
                                {section.charAt(0).toUpperCase() + section.slice(1)}
                            </option>
                        ))}
                    </select>
                    <select
                        value={selectedStatus}
                        onChange={(e) => onStatusChange(e.target.value)}
                        className="p-2 pl-1 border-2 border-gray-700 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                    >
                        {STATUS_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="overflow-x-auto flex-1">
                <table className="w-full">
                    <thead>
                        <tr className="border-b">
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                Page
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                Section
                            </th>
                            <th
                                className="px-6 py-3 text-right text-sm font-semibold text-gray-900"
                                title="Sorted by API"
                            >
                                Views
                            </th>
                            <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                                Uniques
                            </th>
                            <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                                Avg Time
                            </th>
                            <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                                Bounce
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-4 text-center">
                                    <div className="flex justify-center">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
                                    </div>
                                </td>
                            </tr>
                        ) : !pages || pages.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                                    No pages found
                                </td>
                            </tr>
                        ) : (
                            pages?.map((page) => (
                                <PageRow
                                    key={page.id}
                                    page={page}
                                    isSelected={selectedPageId === page.id}
                                    onClick={onSelectPage}
                                />
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {!isLoading && pages && pages.length > 0 && (
                <div className="footer w-full flex items-center justify-end p-2">
                    <Pagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        handlePageChange={handlePageChange}
                        perPage={perPage}
                        handleChangePerPage={setPerPage}
                    />
                </div>
            )}
        </div>
    );
};
