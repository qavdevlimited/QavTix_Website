'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { Currency, Region } from '@/lib/redux/slices/settingsSlice'


interface ActionResponse<T = null> {
  success: boolean
  message: string
  data?: T
  error?: string
}



export async function updateUserRegion({ region }: { region: Region }): Promise<ActionResponse> {
  try {
    if (!region?.code || !region?.label || !region?.flag) {
      return {
        success: false,
        message: 'Invalid region data',
        error: 'INVALID_REGION',
      }
    }

    const cookieStore = await cookies()

    cookieStore.set('user_region', JSON.stringify(region), {
      maxAge: 365 * 24 * 60 * 60,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })

    revalidatePath('/', 'layout')

    return {
      success: true,
      message: 'Region updated successfully',
      data: null,
    }
  } catch (error) {
    console.error('Region update error:', error)

    return {
      success: false,
      message: 'Failed to update region. Please try again.',
      error: error instanceof Error ? error.message : 'UNKNOWN_ERROR',
    }
  }
}



export async function updateUserCurrency({ currency }: { currency: Currency }): Promise<ActionResponse> {
  try {
    if (!currency?.code || !currency?.label || !currency?.symbol) {
      return {
        success: false,
        message: 'Invalid currency data',
        error: 'INVALID_CURRENCY',
      }
    }

    const cookieStore = await cookies()

    cookieStore.set('user_currency', JSON.stringify(currency), {
      maxAge: 365 * 24 * 60 * 60,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })

    revalidatePath('/', 'layout')

    return {
      success: true,
      message: 'Currency updated successfully',
      data: null,
    }
  } catch (error) {
    console.error('Currency update error:', error)

    return {
      success: false,
      message: 'Failed to update currency. Please try again.',
      error: error instanceof Error ? error.message : 'UNKNOWN_ERROR',
    }
  }
}



export async function getCurrentSettings(): Promise<ActionResponse<{
  region: Region | null
  currency: Currency | null
}>> {
    try {
        const cookieStore = await cookies()
        
        const regionCookie = cookieStore.get('user_region')?.value
        const currencyCookie = cookieStore.get('user_currency')?.value

        let region: Region | null = null
        let currency: Currency | null = null

        if (regionCookie) {
            try {
                region = JSON.parse(regionCookie)
            } catch {
                console.error('Failed to parse region cookie')
            }
        }

        if (currencyCookie) {
            try {
                currency = JSON.parse(currencyCookie)
            } catch {
                console.error('Failed to parse currency cookie')
            }
        }

        return {
            success: true,
            message: 'Settings retrieved successfully',
            data: { region, currency }
        }
    } catch (error) {
        console.error('Get settings error:', error)
        
        return {
        success: false,
        message: 'Failed to retrieve settings',
        error: error instanceof Error ? error.message : 'UNKNOWN_ERROR'
        }
    }
}


export async function clearUserSettings(): Promise<ActionResponse> {
    try {
        const cookieStore = await cookies()
        
        cookieStore.delete('user_region')
        cookieStore.delete('user_currency')

        revalidatePath('/', 'layout')

        return {
        success: true,
        message: 'Settings cleared successfully'
        }
    } catch (error) {
        console.error('Clear settings error:', error)
        
        return {
        success: false,
        message: 'Failed to clear settings',
        error: error instanceof Error ? error.message : 'UNKNOWN_ERROR'
        }
    }
}