'use server'

import { cookies, headers } from 'next/headers'
import { DEFAULT_LOCATION, REGION_CURRENCY_MAP } from '@/components-data/settings.data'
import { setCookie } from '@/lib/cookies/setCookies'
import { COOKIE_KEYS } from '@/components-data/cookie-keys'

export type Region = { code: string; label: string; flag: string }
export type Currency = { code: string; label: string; symbol: string }
export type LocationData = { region: Region; currency: Currency }

export async function getOrDetectLocation(): Promise<LocationData> {
    const cookieStore = await cookies()

    // Try to get stored values individually
    let region: Region | null = null
    let currency: Currency | null = null

    const regionStr = cookieStore.get(COOKIE_KEYS.USER_REGION)?.value
    if (regionStr) {
        try { region = JSON.parse(regionStr) } catch {}
    }

    const currencyStr = cookieStore.get(COOKIE_KEYS.USER_CURRENCY)?.value
    if (currencyStr) {
        try { currency = JSON.parse(currencyStr) } catch {}
    }

    if (region || currency) {
        return {
        region: region || DEFAULT_LOCATION.region,
        currency: currency || DEFAULT_LOCATION.currency
        }
    }

    const headersList = await headers()
    const country = headersList.get('x-vercel-ip-country') ||
                    headersList.get('cf-ipcountry') ||
                    'NG'

    const detected = REGION_CURRENCY_MAP[country] || DEFAULT_LOCATION

    await Promise.all([
        setCookie(COOKIE_KEYS.USER_REGION, JSON.stringify(detected.region), {
            maxAge: 365 * 24 * 60 * 60,
            path: '/',
            sameSite: 'lax',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
        }),
        setCookie(COOKIE_KEYS.USER_CURRENCY, JSON.stringify(detected.currency), {
            maxAge: 365 * 24 * 60 * 60,
            path: '/',
            sameSite: 'lax',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
        })
    ])

        return detected
    }

export async function setLocation(data: Partial<LocationData>): Promise<boolean> {
    const { region, currency } = data
    if (!region && !currency) return false

    const promises = []

    if (region) {
        promises.push(
            setCookie(COOKIE_KEYS.USER_REGION, JSON.stringify(region), {
                maxAge: 365 * 24 * 60 * 60,
                path: '/',
                sameSite: 'lax',
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production'
            })
        )
    }

    if (currency) {
        promises.push(
            setCookie(COOKIE_KEYS.USER_CURRENCY, JSON.stringify(currency), {
                maxAge: 365 * 24 * 60 * 60,
                path: '/',
                sameSite: 'lax',
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production'
            })
        )
    }

    await Promise.all(promises)
    return true
}