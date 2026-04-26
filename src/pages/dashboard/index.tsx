import { useEffect, useState } from "react";

import { SummaryData } from "./components/SummaryData";
import { PagesData } from "./components/PagesData";
import { Header } from "@/components/Header";

import { useSummary, usePages } from "@/hooks/useQueries";

import { initialDate } from '@/constants/constants';

export const Dashboard = () => {
    const [selectedPageId, setSelectedPageId] = useState<string>("");
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(20);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSection, setSelectedSection] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [dateRange, setDateRange] = useState<{
        startDate: Date;
        endDate: Date;
    }>(initialDate);


    const handleDateChange = (startDate: Date, endDate: Date) => {
        setDateRange({ startDate, endDate });
    };

    const {
        data: summary,
        refetch: refetchSummary,
        isLoading: summaryLoading,
        error: summaryError,
    } = useSummary(dateRange);
    const {
        data: pages,
        refetch: refetchPages,
        isLoading: pagesLoading,
        error: pagesError,
    } = usePages(
        dateRange,
        currentPage,
        perPage,
        searchQuery,
        selectedSection,
        selectedStatus,
    );

    const handlePageRefresh = () => {
        refetchSummary();
        refetchPages();
    };

    useEffect(() => {
        handlePageRefresh();
    }, [dateRange?.startDate, dateRange?.endDate])

    return (
        <div className="min-h-screen">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
                <Header
                    onPageRefresh={handlePageRefresh}
                    onDateChange={handleDateChange}
                    dateRange={dateRange}
                />
                <SummaryData
                    summaryError={summaryError}
                    summaryLoading={summaryLoading}
                    summary={summary}
                />
                <PagesData
                    pages={pages}
                    pagesLoading={pagesLoading}
                    pagesError={pagesError}
                    setSelectedPageId={setSelectedPageId}
                    selectedPageId={selectedPageId}
                    setCurrentPage={setCurrentPage}
                    perPage={perPage}
                    setPerPage={setPerPage}
                    setSearchQuery={setSearchQuery}
                    setSelectedSection={setSelectedSection}
                    setSelectedStatus={setSelectedStatus}
                    searchQuery={searchQuery}
                    selectedSection={selectedSection}
                    selectedStatus={selectedStatus}
                />
            </main>
        </div>
    );
};
