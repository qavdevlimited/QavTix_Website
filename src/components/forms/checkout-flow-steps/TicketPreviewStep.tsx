"use client"

import { mockAvailableTickets } from "@/components-data/demo-data";
import { TicketCard } from "@/components/custom-utils/cards/TicketCard";
import { useCheckout } from "@/contexts/CheckoutFlowProvider";
import { space_grotesk } from "@/lib/redux/fonts";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

export default function TicketPreviewStep({ showMobileSummary }:{ showMobileSummary: boolean }){

    const { initializeTickets, tickets } = useCheckout()

    useEffect(() => {
        if (mockAvailableTickets.length > 0 && tickets.length === 0) {
            initializeTickets(mockAvailableTickets)
        }
    }, [mockAvailableTickets, tickets.length, initializeTickets])

    return (
        <div className={cn(showMobileSummary ? "hidden" : "block", "pb-5")}>
            <h2 className={`${space_grotesk.className} mb-6 text-secondary-9 font-medium text-xl`}>Ticket</h2>
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
        </div>
    )
}