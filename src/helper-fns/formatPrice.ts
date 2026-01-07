export function formatPrice(
  amount: number,
  country: "NG" | "US" | "GB" | "EU" | string
): string {
  const currencyMap: Record<string, string> = {
    NG: "NGN",
    US: "USD",
    GB: "GBP",
    EU: "EUR",
  }

  const currency = currencyMap[country] || country

  const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })

  return formatter.format(amount)
}
