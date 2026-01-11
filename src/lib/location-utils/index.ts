"use server"

import { cookies, headers } from 'next/headers'
import { DEFAULT_LOCATION, REGION_CURRENCY_MAP } from '@/components-data/settings.data'

export type Region = {
    code: string
    label: string
    flag: string
}

export type Currency = {
    code: string
    label: string
    symbol: string
}

export type LocationData = {
    region: Region
    currency: Currency
}

export async function getOrDetectLocation(): Promise<LocationData> {
    const cookieStore = await cookies()

    // Try to get stored values individually
    let storedRegion: Region | null = null
    let storedCurrency: Currency | null = null

    const regionCookie = cookieStore.get('user_region')?.value
    if (regionCookie) {
        try {
            storedRegion = JSON.parse(regionCookie) as Region
        } catch {
            // Invalid JSON → ignore
        }
    }

    const currencyCookie = cookieStore.get('user_currency')?.value
    if (currencyCookie) {
        try {
            storedCurrency = JSON.parse(currencyCookie) as Currency
        } catch {
            // Invalid JSON → ignore
        }
    }

    // If we have both stored values → return them
    if (storedRegion && storedCurrency) {
        return {
            region: storedRegion,
            currency: storedCurrency
        }
    }

    // If we have only one → return partial data
    if (storedRegion || storedCurrency) {
        return {
            region: storedRegion || DEFAULT_LOCATION.region,
            currency: storedCurrency || DEFAULT_LOCATION.currency
        }
    }

    // No stored values → detect from headers
    const headersList = await headers()
    const country = headersList.get('x-vercel-ip-country') ||
                    headersList.get('cf-ipcountry') ||
                    'NG'

    const detected = REGION_CURRENCY_MAP[country] || DEFAULT_LOCATION

    // Store detected values in cookies (1 year expiry)
    cookieStore.set('user_region', JSON.stringify(detected.region), {
        maxAge: 365 * 24 * 60 * 60,
        path: '/',
        sameSite: 'lax',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
    })

    cookieStore.set('user_currency', JSON.stringify(detected.currency), {
        maxAge: 365 * 24 * 60 * 60,
        path: '/',
        sameSite: 'lax',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
    })

    return detected
}

export async function setLocation(data: Partial<LocationData>): Promise<boolean> {
    const { region, currency } = data

    if (!region && !currency) {
        return false
    }

    console.log(region)

    const cookieStore = await cookies()

    // Update only what's provided
    if (region) {
        cookieStore.set('user_region', JSON.stringify(region), {
            maxAge: 365 * 24 * 60 * 60,
            path: '/',
            sameSite: 'lax',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
        })
    }

    if (currency) {
        cookieStore.set('user_currency', JSON.stringify(currency), {
            maxAge: 365 * 24 * 60 * 60,
            path: '/',
            sameSite: 'lax',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
        })
    }

    return true
}