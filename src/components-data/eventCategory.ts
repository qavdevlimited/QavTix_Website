export const EventCategory = {
  ConcertAndMusic: {
    value: "concert_and_music",
    label: "Concerts & Music",
  },
  SportAndFitness: {
    value: "sport_and_fitness",
    label: "Sports & Fitness",
  },
  ArtAndTheater: {
    value: "art_and_theater",
    label: "Arts & Theater",
  },
  FoodAndDrinking: {
    value: "food_and_drinking",
    label: "Food & Dining",
  },
  Festivals: {
    value: "festivals",
    label: "Festivals",
  },
  BusinessAndNetworking: {
    value: "business_and_networking",
    label: "Business & Networking",
  },
  TravelsAndTours: {
    value: "travels_and_tours",
    label: "Travel & Tours",
  },
  NightlifeAndParties: {
    value: "nightlife_and_parties",
    label: "Nightlife & Parties",
  },
} as const;


export const EVENT_CATEGORIES_ARRAY = Object.values(EventCategory)

// Type for the value (e.g. for form values, API payloads)
export type EventCategoryValue = typeof EventCategory[keyof typeof EventCategory]['value']

// Type for the full object if needed
export type EventCategoryItem = typeof EventCategory[keyof typeof EventCategory]

// Helper: Get all values
export const EVENT_CATEGORY_VALUES = Object.values(EventCategory).map((cat) => cat.value)

// Helper: Get all labels
export const EVENT_CATEGORY_LABELS = Object.values(EventCategory).map((cat) => cat.label)

// Helper: Get label from value
export const getEventCategoryLabel = (value: EventCategoryValue): string => {
  const category = Object.values(EventCategory).find((cat) => cat.value === value)
  return category?.label || value.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}