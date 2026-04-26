export const initialDate = {
    startDate: new Date('2025-01-01'),
    endDate: new Date()
}

export const STATUS = {
    PUBLISHED: 'published',
    DRAFT: 'draft',
    ARCHIVED: 'archived'
}

export const STATUS_OPTIONS = [
    { value: '', label: 'All' },
    { value: STATUS.PUBLISHED, label: 'Published' },
    { value: STATUS.DRAFT, label: 'Draft' },
    { value: STATUS.ARCHIVED, label: 'Archived' },
]

export const PER_PAGE_OPTIONS = [
    { value: 10, label: '10 per page' },
    { value: 20, label: '20 per page' },
    { value: 30, label: '30 per page' },
]