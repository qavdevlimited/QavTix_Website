// hooks/useUserSettings.ts
'use client'

import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import { setRegion, setCurrency, type Region, type Currency } from '@/lib/redux/slices/settingsSlice'
import { updateUserCurrency, updateUserRegion } from '@/actions/update-user-settings'
import { useState, useTransition } from 'react'
import { showAlert } from '../redux/slices/alertSlice'



export function useUserSettings() {
  
  const dispatch = useAppDispatch()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  
  const region = useAppSelector(state => state.settings.region)
  const currency = useAppSelector(state => state.settings.currency)

  const updateRegion = async (newRegion: Region) => {
    setError(null)
    
    dispatch(setRegion(newRegion))
    
    startTransition(async () => {

      const result = await updateUserRegion({ region })
      
      if (result.success) {
        dispatch(showAlert({
          title: "Region Updated",
          description: result.message,
          variant: "default"
        }))
        
      } else {
        dispatch(showAlert({
          title: "Action Failed",
          description: result.message,
          variant: "default"
        }))
        setError(result.error || 'Failed to update region')
      }
    })
  }

  const updateCurrency = async (newCurrency: Currency) => {
    setError(null)
    
    // Optimistic update
    dispatch(setCurrency(newCurrency))
    
    startTransition(async () => {
      const result = await updateUserCurrency({ currency: newCurrency })
      
      if (result.success) {
        dispatch(showAlert({
          title: "Currency Updated",
          description: result.message,
          variant: "default"
        }))
      } 
      else {
        dispatch(showAlert({
          title: "Action Failed",
          description: result.message,
          variant: "default"
        }))
        setError(result.error || 'Failed to update currency')
      }
    })
  }

  return {
    region,
    currency,
    updateRegion,
    updateCurrency,
    isPending,
    error
  }
}