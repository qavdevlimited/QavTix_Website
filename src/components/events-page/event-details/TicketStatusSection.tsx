'use client'

import { useHasTicketForEvent, useTicketUser } from "@/contexts/TicketUserProvider"
import AuthUserGettingTicketCard from "./AuthUserGettingTicketCard"
import GuestGettingTicketCard from "./GuestGettingTicketCard"
import TicketPricingSection from "../TicketPricingSection"
import { useState } from "react"
import CancelledTicketCard from "./CancelledTicketCard"


export default function TicketStatusSection({ eventId }: { eventId: string }) {

    const ticketCancelled = useState(true)
    const { user, ticketSession, isAuthenticated } = useTicketUser()
    const hasTicket = useHasTicketForEvent(eventId)
    
    // Authenticated user with ticket
    if (true) {
        !ticketCancelled ? <AuthUserGettingTicketCard /> : <CancelledTicketCard />
    }
    
    // Guest user with ticket session
    if (!isAuthenticated && ticketSession && hasTicket) {
        return <GuestGettingTicketCard />
    }
    
    // No tickets - show pricing
    return <TicketPricingSection />
}