'use client'

import { useCheckout } from '@/contexts/CheckoutFlowProvider'
import { useEffect, useState } from 'react'

export default function TicketReservationTimer() {

    const { getRemainingTime } = useCheckout()
    const [timeLeft, setTimeLeft] = useState(getRemainingTime())

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(getRemainingTime())
        }, 1000)

        return () => clearInterval(interval)
    }, [getRemainingTime])

    if (timeLeft <= 0) return null

    const minutes = Math.floor(timeLeft / 60)
    const seconds = timeLeft % 60

    return (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-neutral-7">
                Your ticket is temporarily reserved. Please complete checkout in{' '}
                <span className="font-bold text-accent-6">
                    {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </span>
                {' '}to secure it.
            </p>
        </div>
    )
}