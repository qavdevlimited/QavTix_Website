'use server'

import { headers } from 'next/headers'
import { cookies } from 'next/headers'

interface LocationData {
  region: {
    code: string
    label: string
    flag: string
  }
  currency: {
    code: string
    label: string
    symbol: string
  }
}

const REGION_CURRENCY_MAP: Record<string, LocationData> = {
  NG: {
    region: { code: 'NG', label: 'Nigeria', flag: '🇳🇬' },
    currency: { code: 'NGN', label: 'Naira', symbol: '₦' }
  },
  US: {
    region: { code: 'US', label: 'United States', flag: '🇺🇸' },
    currency: { code: 'USD', label: 'Dollar', symbol: '$' }
  },
  GB: {
    region: { code: 'GB', label: 'United Kingdom', flag: '🇬🇧' },
    currency: { code: 'GBP', label: 'Pound', symbol: '£' }
  }
}

const DEFAULT_LOCATION: LocationData = {
  region: { code: 'NG', label: 'Nigeria', flag: '🇳🇬' },
  currency: { code: 'NGN', label: 'Naira', symbol: '₦' }
}

export async function getUserLocation(): Promise<LocationData> {
    const cookieStore = await cookies()
    
    // Check if we have stored preferences
    const storedRegion = cookieStore.get('user_region')?.value
    const storedCurrency = cookieStore.get('user_currency')?.value

    if (storedRegion && storedCurrency) {
        try {
            return {
                region: JSON.parse(storedRegion),
                currency: JSON.parse(storedCurrency)
            }
        } catch {
        // If parsing fails, continue to detection
        }
    }

    // Detect from IP/headers
    const headersList = await headers()
    const country = headersList.get('x-vercel-ip-country') || 
                    headersList.get('cf-ipcountry') || 
                    'NG'

    const locationData = REGION_CURRENCY_MAP[country] || DEFAULT_LOCATION

    // Store in cookies (1 year expiry)
    cookieStore.set('user_region', JSON.stringify(locationData.region), {
        maxAge: 365 * 24 * 60 * 60,
        path: '/',
        sameSite: 'lax'
    })
    
    cookieStore.set('user_currency', JSON.stringify(locationData.currency), {
        maxAge: 365 * 24 * 60 * 60,
        path: '/',
        sameSite: 'lax'
    })

    return locationData
}

export async function setUserLocation(region: LocationData['region'], currency: LocationData['currency']) {
    const cookieStore = await cookies()
    
    cookieStore.set('user_region', JSON.stringify(region), {
        maxAge: 365 * 24 * 60 * 60,
        path: '/',
        sameSite: 'lax'
    })
    
    cookieStore.set('user_currency', JSON.stringify(currency), {
        maxAge: 365 * 24 * 60 * 60,
        path: '/',
        sameSite: 'lax'
    })
}