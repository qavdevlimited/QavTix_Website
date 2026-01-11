"use client"

import { TicketCard } from "@/components/custom-utils/cards/TicketCard";
import { useCheckout } from "@/contexts/CheckoutFlowProvider";
import { space_grotesk } from "@/lib/redux/fonts";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

export default function TicketPreviewStep({ showMobileSummary }:{ showMobileSummary: boolean }){

    const availableTickets: TicketTier[] = [
        {
            id: '1',
            name: 'Regular',
            price: 0,
            originalPrice: 0,
            currency: '₦',
            description: 'Regular access ticket admits one',
            available: true,
        },
        {
            id: '2',
            name: 'VIP',
            price: 25000,
            originalPrice: 42000,
            currency: '₦',
            description: 'VIP access ticket admits one',
            features: ['Priority seating', 'Backstage access'],
            available: true,
        },
        {
            id: '3',
            name: 'VVIP',
            price: 35000,
            originalPrice: 42000,
            currency: '₦',
            description: 'Front Row access ticket admits one',
            available: true,
            soldOut: true,
        }
    ]

    const { initializeTickets, tickets } = useCheckout()

    useEffect(() => {
        if (availableTickets.length > 0 && tickets.length === 0) {
            initializeTickets(availableTickets)
        }
    }, [availableTickets, tickets.length, initializeTickets])

    return (
        <div className={cn(showMobileSummary ? "hidden" : "block", "pb-5")}>
            <h2 className={`${space_grotesk.className} mb-6 text-secondary-9 font-medium text-xl`}>Ticket</h2>
            <div className="space-y-6">
                {
                    availableTickets.map((v,i) => {
                        return (
                            <TicketCard 
                                key={`${v.id}-${i}`} 
                                onQuantityChange={() => {}}
                                id={v.id}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}