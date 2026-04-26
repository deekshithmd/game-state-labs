export interface MetricValue {
  value: number;
  trend: number;
}

export interface Summary {
  pageviews: MetricValue;
  unique_visitors: MetricValue;
  avg_time_on_page: MetricValue;
  bounce_rate: MetricValue;
}

export interface DailyView {
  date: string;
  pageviews: number;
  unique_visitors: number;
}

export interface PageDetails {
  id: string;
  title: string;
  path: string;
  section: string;
  status: 'published' | 'draft' | 'archived';
  first_published: string;
  date: string;
  pageviews: number;
  unique_visitors: number;
  avg_time_on_page: number;
  bounce_rate: number;
}

interface Pagination {
  page: number;
  total_items: number;
  total_pages: number;
  per_page: number;
}

export interface SummaryResponse {
  data: Summary;
  period: {
    start_date: string;
    end_date: string;
  };
}

export interface TimeSeriesResponse {
  data: {
    page_id: string;
    points: DailyView[];
  };
}

export interface PagesResponse {
  data: PageDetails[];
  pagination: Pagination;
}
