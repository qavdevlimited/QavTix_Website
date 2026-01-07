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