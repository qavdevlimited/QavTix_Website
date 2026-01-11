'use client'

import { useCheckout } from '@/contexts/CheckoutFlowProvider'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import ReservationTimeExpiredPrompt from '../modals/ReservationTimeExpiredPrompt'

export default function TicketReservationTimer() {
    const { getRemainingTime, resetCheckout } = useCheckout()
    const router = useRouter()
    const [timeLeft, setTimeLeft] = useState(getRemainingTime())
    const [hasExpired, setHasExpired] = useState(false)

    useEffect(() => {
        const remaining = getRemainingTime()
        setTimeLeft(remaining)
        if (remaining !== null && remaining <= 0) {
            setHasExpired(true)
        }

        const interval = setInterval(() => {
            const remaining = getRemainingTime()
            setTimeLeft(remaining)
            
            // Check if just expired
            if (remaining !== null && remaining <= 0 && !hasExpired) {
                setHasExpired(true)
            }
        }, 1000)

        return () => clearInterval(interval)
    }, [getRemainingTime, hasExpired])

    const handleBackToTickets = () => {
        resetCheckout()
        router.back()
    }

    // Don't show if no reservation started
    if (timeLeft === null || (timeLeft === 0 && !hasExpired)) {
        return null
    }

    // Expired state
    if (hasExpired || timeLeft <= 0) {
        return (
            <ReservationTimeExpiredPrompt open={true}  />
        )
    }

    const minutes = Math.floor(timeLeft / 60)
    const seconds = timeLeft % 60
    const isUrgent = timeLeft <= 60 // Last minute

    return (
        <div 
            className={cn(
                'my-10 rounded px-4 py-2 transition-colors',
                isUrgent 
                    ? 'bg-orange-50 border-orange-200 animate-pulse' 
                    : 'bg-blue-50 border-blue-200'
            )}
        >
            <div className="flex flex-col items-start gap-1">
                {
                    isUrgent &&
                    <h3 
                        className={cn(
                            'font-medium text-accent-8'
                        )}
                        >
                        Hurry! Time Running Out
                    </h3>
                }
                <p className='text-sm text-neutral-7'>
                    Your ticket is temporarily reserved. Please complete checkout in 
                    {' '}
                    <span className="font-mono font-medium text-accent-6">
                        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                    </span>
                    {' '}to secure your tickets.
                </p>
            </div>
        </div>
    )
}