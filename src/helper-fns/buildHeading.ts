import { EVENT_CATEGORY_VALUES, getEventCategoryLabel } from "@/components-data/event-category";
import { formatPrice } from "./formatPrice";
import { format } from "date-fns";
import { countries, getStates } from "@/components-data/location";

export const buildSearchResultsHeading = (filters: FilterValues) => {
  const { categories, location, priceRange, dateRange } = filters;

  // Categories
  const categoryText =
    categories && categories.length > 0
      ? categories?.join(", ")
      : "all";

  // Location
  const locationText =
    location?.state
      ? `in ${location.state}`
      : location?.country
        ? `in ${location.country}`
        : "";

  // Price range
  const priceText =
    priceRange
      ? `priced between ${formatPrice(priceRange.min, "NG")} and ${formatPrice(priceRange.max, "NG")}`
      : "";

  // Date range
  const dateText =
    dateRange
      ? "during the selected dates"
      : "";

  return [
    "Showing results for",
    `${categoryText} events`,
    locationText,
    priceText,
    dateText,
  ].filter(Boolean).join(" ").trim()
}




interface FilterValues {
    categories?: string[]
    location?: {
        country?: string
        state?: string
    } | null
    priceRange?: {
        min: number
        max: number
    } | null
    dateRange?: {
        from?: Date
        to?: Date
    } | null
}

export const buildTrendingEventsHeading = (filters: FilterValues): string => {
  const parts: string[] = ["Trending events for"]

  // Categories
  if (filters.categories && filters.categories.length > 0) {
      const categoryLabels = filters.categories
        .map((value) => getEventCategoryLabel(value as typeof EVENT_CATEGORY_VALUES[0]))
        .join(" & ")
      parts.push(categoryLabels)
  }

  // Location
  if (filters.location?.state) {
    const fullStateName = getStates(filters.location?.country || "").find(v => v.value === filters.location?.state)?.label;
    parts.push(`in ${fullStateName || filters.location.state}`)
  } else if (filters.location?.country) {
    const fullCountryName = countries.find(v => v.value === filters.location?.country)?.label;
    parts.push(`in ${fullCountryName || filters.location.country}`)
  }

  // Price Range
  if (filters.priceRange && (filters.priceRange.min > 0 || filters.priceRange.max > 0)) {
    const min = formatPrice(filters.priceRange.min, "NG")
    const max = formatPrice(filters.priceRange.max, "NG")

    if (filters.priceRange.min > 0 && filters.priceRange.max > 0) {
      parts.push(`priced between ${min} and ${max}`)
    } else if (filters.priceRange.min > 0) {
      parts.push(`from ${min}`)
    } else if (filters.priceRange.max > 0) {
      parts.push(`up to ${max}`)
    }
  }

  // Date Range
  if (filters.dateRange?.from || filters.dateRange?.to) {
    const from = filters.dateRange.from
      ? format(filters.dateRange.from, "MMM d")
      : null
    const to = filters.dateRange.to
      ? format(filters.dateRange.to, "MMM d, yyyy")
      : null

    if (from && to) {
        parts.push(`from ${from} to ${to}`)
    } else if (from) {
        parts.push(`starting ${from}`)
    } else if (to) {
        parts.push(`until ${to}`)
    }
  }

  // Fallback if no filters
  if (parts.length === 1) {
    return "Trending events"
  }

  return parts.join(" ")
}