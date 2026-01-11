'use client'

import { AttendeeInformationData } from '@/schemas/checkout-flow.schema'
import { createContext, useState, ReactNode, useEffect, useContext, useMemo } from 'react'



interface CheckoutState {
    currentStep: number
    tickets: CheckoutTicket[]
    attendeeInfo: Partial<AttendeeInformationData>
    paymentMethod: string | null
    reservationTime: number | null
    isProcessing: boolean
    checkoutComplete: boolean
    discount: Discount | null
}

interface CheckoutContextType extends CheckoutState {
    // Step navigation
    setCurrentStep: (step: number) => void
    nextStep: () => void
    prevStep: () => void
    
    // Ticket management
    initializeTickets: (tickets: TicketTier[]) => void
    updateTicketQuantity: (ticketId: string, quantity: number) => void
    incrementTicket: (ticketId: string) => void
    decrementTicket: (ticketId: string) => void
    clearTickets: () => void
    
    // Data updates
    updateAttendeeInfo: (data: Partial<AttendeeInformationData>) => void
    updatePaymentMethod: (method: string) => void
    
    // Discount management
    applyDiscount: (discount: Discount) => void
    removeDiscount: () => void
    validateCoupon: (code: string) => Promise<Discount | null> // Simulate API
    
    // Reservation
    startReservation: () => void
    getRemainingTime: () => number
    
    // Checkout actions
    processPayment: () => Promise<void>
    resetCheckout: () => void
    
    // Calculated values (memoized)
    getSubtotal: () => number
    getDiscountAmount: () => number
    getTotal: () => number
    getTotalTickets: () => number
    getSelectedTickets: () => CheckoutTicket[]
    hasSelectedTickets: () => boolean
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined)

const RESERVATION_DURATION = 10 * 60 // 10 minutes in seconds

export function CheckoutFlowProvider({ children }: { children: ReactNode }) {
    const [currentStep, setCurrentStep] = useState(1)
    const [tickets, setTickets] = useState<CheckoutTicket[]>([])
    const [attendeeInfo, setAttendeeInfo] = useState<Partial<AttendeeInformationData>>({})
    const [paymentMethod, setPaymentMethod] = useState<string | null>(null)
    const [reservationTime, setReservationTime] = useState<number | null>(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [checkoutComplete, setCheckoutComplete] = useState(false)
    const [discount, setDiscount] = useState<Discount | null>(null)

    // Reservation timer
    useEffect(() => {
        if (!reservationTime) return

        const interval = setInterval(() => {
            setReservationTime(prev => {
                if (prev === null || prev <= 0) {
                    clearInterval(interval)
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(interval)
    }, [reservationTime])

    // Initialize tickets
    const initializeTickets = (ticketTiers: TicketTier[]) => {
        const checkoutTickets = ticketTiers.map(ticket => ({
            ...ticket,
            quantity: 0
        }))
        setTickets(checkoutTickets)
        setDiscount(null) // Reset discount on new tickets
    }

    // Ticket quantity updates
    const updateTicketQuantity = (ticketId: string, quantity: number) => {
        setTickets(prev => prev.map(ticket => 
            ticket.id === ticketId 
                ? { ...ticket, quantity: Math.max(0, quantity) }
                : ticket
        ))
    }

    const incrementTicket = (ticketId: string) => {
        setTickets(prev => prev.map(ticket => 
            ticket.id === ticketId && ticket.available && !ticket.soldOut
                ? { ...ticket, quantity: ticket.quantity + 1 }
                : ticket
        ))
    }

    const decrementTicket = (ticketId: string) => {
        setTickets(prev => prev.map(ticket => 
            ticket.id === ticketId && ticket.quantity > 0
                ? { ...ticket, quantity: ticket.quantity - 1 }
                : ticket
        ))
    }

    const clearTickets = () => {
        setTickets(prev => prev.map(ticket => ({ ...ticket, quantity: 0 })))
        setDiscount(null)
    }

    // Discount handling
    const applyDiscount = (newDiscount: Discount) => {
        setDiscount(newDiscount)
    }

    const removeDiscount = () => {
        setDiscount(null)
    }

    const validateCoupon = async (code: string): Promise<Discount | null> => {
        // Example API simulation
        await new Promise(resolve => setTimeout(resolve, 800))
        
        if (code.toUpperCase() === 'WELCOME10') {
            return {
                type: 'coupon',
                code: 'WELCOME10',
                percentage: 10,
                description: '10% off welcome discount'
            }
        }
        return null
    }

    // Reservation
    const startReservation = () => {
        if (!reservationTime) {
            setReservationTime(RESERVATION_DURATION)
        }
    }

    const getRemainingTime = () => reservationTime || 0

    // Data updates
    const updateAttendeeInfo = (data: Partial<AttendeeInformationData>) => {
        setAttendeeInfo(prev => ({ ...prev, ...data }))
    }

    const updatePaymentMethod = (method: string) => {
        setPaymentMethod(method)
    }

    // Navigation
    const nextStep = () => {
        setCurrentStep(prev => Math.min(prev + 1, 4))
    }

    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1))
    }

    // Calculated values (memoized)
    const getSubtotal = useMemo(() => {
        return () => tickets.reduce((sum, ticket) => 
            sum + (ticket.price * ticket.quantity), 0
        )
    }, [tickets])

    const getDiscountAmount = useMemo(() => {
        return () => {
            if (!discount) return 0
            const subtotal = getSubtotal()
            
            if (discount.percentage) {
                return subtotal * (discount.percentage / 100)
            }
            if (discount.amount) {
                return Math.min(subtotal, discount.amount)
            }
            return 0
        }
    }, [discount, getSubtotal])

    const getTotal = useMemo(() => {
        return () => {
            const subtotal = getSubtotal()
            const discountAmount = getDiscountAmount()
            return Math.max(0, subtotal - discountAmount)
        }
    }, [getSubtotal, getDiscountAmount])

    const getTotalTickets = useMemo(() => {
        return () => tickets.reduce((sum, ticket) => sum + ticket.quantity, 0)
    }, [tickets])

    const getSelectedTickets = useMemo(() => {
        return () => tickets.filter(ticket => ticket.quantity > 0)
    }, [tickets])

    const hasSelectedTickets = useMemo(() => {
        return () => tickets.some(ticket => ticket.quantity > 0)
    }, [tickets])

    // Payment simulation
    const processPayment = async () => {
        setIsProcessing(true)
        
        try {
            const selectedTickets = getSelectedTickets()
            const subtotal = getSubtotal()
            const discountAmount = getDiscountAmount()
            const total = getTotal()

            await new Promise(resolve => setTimeout(resolve, 1500))

            console.log('Processing payment:', {
                tickets: selectedTickets,
                attendeeInfo,
                paymentMethod,
                subtotal,
                discount,
                discountAmount,
                total
            })

            setCheckoutComplete(true)
        } catch (error) {
            console.error('Payment error:', error)
            throw error
        } finally {
            setIsProcessing(false)
        }
    }

    const resetCheckout = () => {
        setCurrentStep(1)
        setTickets([])
        setAttendeeInfo({})
        setPaymentMethod(null)
        setReservationTime(null)
        setCheckoutComplete(false)
        setDiscount(null)
    }

    return (
        <CheckoutContext.Provider
            value={{
                currentStep,
                tickets,
                attendeeInfo,
                paymentMethod,
                reservationTime,
                isProcessing,
                checkoutComplete,
                discount,
                setCurrentStep,
                nextStep,
                prevStep,
                initializeTickets,
                updateTicketQuantity,
                incrementTicket,
                decrementTicket,
                clearTickets,
                updateAttendeeInfo,
                updatePaymentMethod,
                applyDiscount,
                removeDiscount,
                validateCoupon,
                startReservation,
                getRemainingTime,
                processPayment,
                resetCheckout,
                getSubtotal,
                getDiscountAmount,
                getTotal,
                getTotalTickets,
                getSelectedTickets,
                hasSelectedTickets
            }}
        >
            {children}
        </CheckoutContext.Provider>
    )
}

export function useCheckout() {
    const context = useContext(CheckoutContext)
    if (!context) {
        throw new Error('useCheckout must be used within CheckoutFlowProvider')
    }
    return context
}