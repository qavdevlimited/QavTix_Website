export function initializeCheckoutTicket(ticket: TicketTier): CheckoutTicket {
    return {
        ...ticket,
        quantity: 0
    }
}