import { formatPrice } from "./formatPrice";

export const buildSearchResultsHeading = (filters: FilterValues) => {
  const { categories, location, priceRange, dateRange } = filters;

  // Categories
  const categoryText =
    categories.length > 0
      ? categories.join(", ")
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
