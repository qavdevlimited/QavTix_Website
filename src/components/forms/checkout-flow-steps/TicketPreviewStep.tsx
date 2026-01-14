"use client"

import { mockAvailableTickets } from "@/components-data/demo-data";
import { TicketCard } from "@/components/custom-utils/cards/TicketCard";
import { useCheckout } from "@/contexts/CheckoutFlowProvider";
import { useEffect } from "react";

export default function TicketPreviewStep(){

    const { initializeTickets, tickets } = useCheckout()

    useEffect(() => {
        if (mockAvailableTickets.length > 0 && tickets.length === 0) {
            initializeTickets(mockAvailableTickets)
        }
    }, [mockAvailableTickets, tickets.length, initializeTickets])

    return (
        <>
            <div className="space-y-6">
                {
                    tickets.map((v,i) => {
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
        </>
    )
}