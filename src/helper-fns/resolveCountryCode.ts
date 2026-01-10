import { Country } from "country-state-city";

export const resolveCountryCode = (country: string): string | null => {
    if (country.length === 2) return country;

    const match = Country.getAllCountries().find(
        c => c.name.toLowerCase() === country.toLowerCase()
    )

    return match?.isoCode ?? null;
}
