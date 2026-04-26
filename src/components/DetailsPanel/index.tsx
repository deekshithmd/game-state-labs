import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

import type { PageDetails, DailyView } from "../../types/dashboard";
import { STATUS } from "@/constants/constants";
import { convertSeconds } from "@/utils/timeUtils";

interface DetailsPanelProps {
    page: PageDetails | null;
    timeSeries: DailyView[] | undefined;
    isLoading: boolean;
    onClose: () => void;
}

export const DetailsPanel = ({
    page,
    timeSeries,
    isLoading,
    onClose,
}: DetailsPanelProps) => {
    if (!page) {
        return (
            <div className="rounded-lg border-2 border-gray-700 p-6">
                <p className="text-gray-500 text-center py-8">
                    Select a page to view details
                </p>
            </div>
        );
    }

    return (
        <div className="rounded-lg border-2 border-gray-700 p-6 sticky top-6 space-y-6">
            <div className="detail-header flex items-start justify-between">
                <div>
                    <h3 className="text-xl font-bold text-gray-900">{page.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{page.path}</p>
                </div>
                <button
                    className="flex items-center gap-2 text-xs cursor-pointer mt-2"
                    onClick={onClose}
                >
                    <span>x</span>
                    Close
                </button>
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-500">section</span>
                    <span className="mt-2 text-sm text-gray-900">{page.section}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-500">status</span>
                    <span
                        className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium ${page.status === STATUS.PUBLISHED
                            ? "bg-green-100 text-green-800 border border-green-800"
                            : "bg-yellow-100 text-yellow-800 border border-yellow-800"
                            }`}
                    >
                        {page.status.charAt(0).toUpperCase() + page.status.slice(1)}
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-500">
                        first published
                    </span>
                    <span className="mt-2 text-sm text-gray-900">
                        {new Date(page.first_published).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                        })}
                    </span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-500">
                        total views
                    </span>
                    <span className="mt-2 text-sm text-gray-900">
                        {page.pageviews.toLocaleString()}
                    </span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-500">
                        unique views
                    </span>
                    <span className="mt-2 text-sm text-gray-900">
                        {page.unique_visitors.toLocaleString()}
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-500">avg. time</span>
                    <span className="mt-2 text-sm text-gray-900">
                        {convertSeconds(page.avg_time_on_page)}
                    </span>
                </div>
            </div>

            <>
                {isLoading ? (
                    <div className="rounded-lg border border-gray-200">
                        <div className="h-40 bg-gray-100 rounded" />
                    </div>
                ) : (
                    <>
                        {timeSeries && timeSeries.length > 0 && (
                            <div>
                                <h4 className="text-sm font-semibold text-gray-900 mb-4">
                                    Daily Views
                                </h4>
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={timeSeries}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                                        <YAxis tick={{ fontSize: 12 }} />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: "#fff",
                                                border: "1px solid #e5e7eb",
                                                borderRadius: "6px",
                                            }}
                                            formatter={(value) => [
                                                (value as number).toLocaleString(),
                                                "Pageviews",
                                            ]}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="pageviews"
                                            stroke="#3b82f6"
                                            dot={false}
                                            strokeWidth={2}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        )}
                    </>
                )}
            </>
        </div>
    );
};
