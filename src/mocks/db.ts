// src/mocks/db.ts
import pagesData from '../data/pages.json'
import summaryData from '../data/summary.json'
import pagesMeta from '../data/pages-meta.json'
import pg01 from '../data/timeseries/pg_01.json'
import pg02 from '../data/timeseries/pg_02.json'
import pg03 from '../data/timeseries/pg_03.json'
import pg04 from '../data/timeseries/pg_04.json'
import pg05 from '../data/timeseries/pg_05.json'
import pg06 from '../data/timeseries/pg_06.json'
import pg07 from '../data/timeseries/pg_07.json'
import pg08 from '../data/timeseries/pg_08.json'
import pg09 from '../data/timeseries/pg_09.json'
import pg10 from '../data/timeseries/pg_10.json'

// Map timeseries data by page ID
const timeseriesMap: Record<string, typeof pg01> = {
    pg_01: pg01,
    pg_02: pg02,
    pg_03: pg03,
    pg_04: pg04,
    pg_05: pg05,
    pg_06: pg06,
    pg_07: pg07,
    pg_08: pg08,
    pg_09: pg09,
    pg_10: pg10,
}

export const db = {
    pages: pagesData,
    summary: summaryData,
    timeseries: timeseriesMap,
    pagesMeta: pagesMeta,
}