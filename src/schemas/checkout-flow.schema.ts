import { z } from 'zod'

export const ticketSelectionSchema = z.object({
    tickets: z.array(z.object({
        ticketTypeId: z.string(),
        ticketTypeName: z.string(),
        quantity: z.number().min(0),
        price: z.number(),
    })).refine((tickets) => tickets.some(t => t.quantity > 0), {
        message: 'Please select at least one ticket'
    })
})

export const attendeeInformationSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.email('Invalid email address'),
    phone: z.string().min(10, 'Invalid phone number'),
    
    // Optional preferences
    sendUpdates: z.boolean().optional(),
    keepInLoop: z.boolean().optional(),
    shareWithGroup: z.boolean().optional(),
    splitPayment: z.boolean().optional(),
    
    agreeToTerms: z.boolean().refine(val => val === true, {
        message: 'You must agree to the terms and conditions'
    })
})

export const paymentMethodSchema = z.object({
    method: z.enum([
        'card',
        'bank_transfer',
        'google_pay',
        'apple_pay',
        'paypal',
        'opay',
        'kuda'
    ], {
        error: 'Please select a payment method'
    })
})

// Types
export type TicketSelectionData = z.infer<typeof ticketSelectionSchema>
export type AttendeeInformationData = z.infer<typeof attendeeInformationSchema>
export type PaymentMethodData = z.infer<typeof paymentMethodSchema>

export type CheckoutFormData = 
    | TicketSelectionData
    | AttendeeInformationData
    | PaymentMethodData
    | Record<string, never>