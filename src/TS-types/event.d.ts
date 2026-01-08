interface PriceRange {
    min: number
    max: number
}

interface Category {
    value: string
    label: string
    count: number
}

interface Location {
    country: string
    state: string
}


interface FilterValues {
    dateRange?: DateRange
    location?: {
        country: string,
        state: string
    } | null
    categories: string[]
    priceRange: PriceRange | null
}


type FilterFor = "homepage" | "eventPage"

type IEventStatus = "filling-fast" | "sold-out" | "new" | "near-capacity"

interface IEvent {
    image: string
    status?: IEventStatus
    category: string
    host: string
    title: string
    date: string //DateString
    location: string
    price: string
    originalPrice?: string
    href: string
    attendees: EventCardUser[]
}

interface FeaturedEvent {
    id: number
    image: string
    title: string
}