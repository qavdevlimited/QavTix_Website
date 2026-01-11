interface TicketTier {
  id: string
  name: string
  price: number
  originalPrice: number
  currency: string
  description?: string
  features?: string[]
  available: boolean
  soldOut?: boolean
}

interface Discount {
    type: 'coupon' | 'membership'
    code?: string
    percentage?: number
    amount?: number
    description?: string
}

interface CheckoutTicket extends TicketTier {
    quantity: number
}


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
    categories: Category["value"][]
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
    attendees: Attendee[]
}

interface FeaturedEvent {
    id: number
    image: string
    title: string
}