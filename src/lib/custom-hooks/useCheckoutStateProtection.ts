'use client'

import { useEffect } from 'react'
import { useCheckout } from '@/contexts/CheckoutFlowProvider'

export function useCheckoutProtection(onAttemptLeave: () => void) {
    const { canProceedToCheckout } = useCheckout()

    useEffect(() => {
        if (!canProceedToCheckout()) return

        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault()
            e.returnValue = ''
            return ''
        }

        const handleRouteChange = () => {
            onAttemptLeave()
        }

        window.addEventListener('beforeunload', handleBeforeUnload)

        const originalPush = window.history.pushState
        const originalBack = window.history.back

        // Override history methods
        window.history.pushState = function(...args) {
            handleRouteChange()
            return originalPush.apply(window.history, args)
        }

        window.history.back = function() {
            handleRouteChange()
            return originalBack.apply(window.history)
        }

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload)
            window.history.pushState = originalPush
            window.history.back = originalBack
        }
    }, [canProceedToCheckout, onAttemptLeave])
}