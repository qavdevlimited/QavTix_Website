'use client'

import { useAppDispatch } from '@/lib/redux/hooks'
import { showAlert } from '@/lib/redux/slices/alertSlice'
import { AttendeeInformationData } from '@/schemas/checkout-flow.schema'
import { createContext, useState, ReactNode, useEffect, useContext, useMemo, useCallback } from 'react'

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
    
    // Ticket validation
    hasSelectedTickets: () => boolean
    canProceedToCheckout: () => boolean
    getTicketSelectionError: () => string | null
    
    // Data updates
    updateAttendeeInfo: (data: Partial<AttendeeInformationData>) => void
    updatePaymentMethod: (method: string) => void
    
    // Discount management
    applyDiscount: (discount: Discount) => void
    removeDiscount: () => void
    validateCoupon: (code: string) => Promise<Discount | null>
    
    // Reservation
    startReservation: () => void
    getRemainingTime: () => number | null
    
    // Checkout actions
    processPayment: () => Promise<void>
    resetCheckout: () => void
    
    // Calculated values (memoized)
    getSubtotal: () => number
    getDiscountAmount: () => number
    getTotal: () => number
    getTotalTickets: () => number
    getSelectedTickets: () => CheckoutTicket[]
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

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [currentStep])

    // Initialize tickets
    const initializeTickets = useCallback((ticketTiers: TicketTier[]) => {
        const checkoutTickets = ticketTiers.map(ticket => ({
            ...ticket,
            quantity: 0 // Start with 0, let user select
        }))
        setTickets(checkoutTickets)
        setDiscount(null)
    }, [])

    // Ticket quantity updates
    const updateTicketQuantity = useCallback((ticketId: string, quantity: number) => {
        setTickets(prev => prev.map(ticket => 
            ticket.id === ticketId 
                ? { ...ticket, quantity: Math.max(0, quantity) }
                : ticket
        ))
    }, [])

    const incrementTicket = useCallback((ticketId: string) => {
        setTickets(prev => prev.map(ticket => 
            ticket.id === ticketId && ticket.available && !ticket.soldOut
                ? { ...ticket, quantity: ticket.quantity + 1 }
                : ticket
        ))
    }, [])

    const decrementTicket = useCallback((ticketId: string) => {
        setTickets(prev => prev.map(ticket => 
            ticket.id === ticketId && ticket.quantity > 0
                ? { ...ticket, quantity: ticket.quantity - 1 }
                : ticket
        ))
    }, [])

    const clearTickets = useCallback(() => {
        setTickets(prev => prev.map(ticket => ({ ...ticket, quantity: 0 })))
        setDiscount(null)
    }, [])

    // Ticket validation
    const hasSelectedTickets = useCallback(() => {
        return tickets.some(ticket => ticket.quantity > 0)
    }, [tickets])

    const canProceedToCheckout = useCallback(() => {
        // Check if at least one ticket is selected
        const hasTickets = tickets.some(ticket => ticket.quantity > 0)
        
        // Check if reservation hasn't expired
        const hasValidReservation = reservationTime === null || reservationTime > 0
        
        return hasTickets && hasValidReservation
    }, [tickets, reservationTime])

    const getTicketSelectionError = useCallback(() => {
        if (tickets.length === 0) {
            return 'No tickets available'
        }
        
        if (!tickets.some(ticket => ticket.quantity > 0)) {
            return 'Please select at least one ticket to continue'
        }
        
        if (reservationTime !== null && reservationTime <= 0) {
            return 'Your ticket reservation has expired. Please select tickets again.'
        }
        
        return null
    }, [tickets, reservationTime])

    // Discount handling
    const applyDiscount = useCallback((newDiscount: Discount) => {
        setDiscount(newDiscount)
    }, [])

    const removeDiscount = useCallback(() => {
        setDiscount(null)
    }, [])

    const validateCoupon = useCallback(async (code: string): Promise<Discount | null> => {
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
    }, [])

    // Reservation
    const startReservation = useCallback(() => {
        if (reservationTime === null || reservationTime === 0) {
            setReservationTime(RESERVATION_DURATION)
        }
    }, [reservationTime])

    const getRemainingTime = useCallback(() => reservationTime, [reservationTime])

    // Data updates
    const updateAttendeeInfo = useCallback((data: Partial<AttendeeInformationData>) => {
        setAttendeeInfo(prev => ({ ...prev, ...data }))
    }, [])

    const updatePaymentMethod = useCallback((method: string) => {
        setPaymentMethod(method)
    }, [])

    // Navigation

    const dispatch = useAppDispatch()

    const nextStep = useCallback(() => {
        // Validate tickets before proceeding from step 1
        if (currentStep === 1 && !canProceedToCheckout()) {
            const error = getTicketSelectionError()
            if (error) {
                dispatch(showAlert({
                    title: "",
                    description: error,
                    variant: "destructive"
                }))
                return
            }
        }
        
        setCurrentStep(prev => Math.min(prev + 1, 4))
    }, [currentStep, canProceedToCheckout, getTicketSelectionError])

    const prevStep = useCallback(() => {
        setCurrentStep(prev => Math.max(prev - 1, 1))
    }, [])

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

    // Payment simulation
    const processPayment = useCallback(async () => {
        // Final validation before payment
        if (!canProceedToCheckout()) {
            throw new Error(getTicketSelectionError() || 'Cannot proceed with payment')
        }

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
    }, [
        canProceedToCheckout, 
        getTicketSelectionError, 
        getSelectedTickets, 
        getSubtotal, 
        getDiscountAmount, 
        getTotal,
        attendeeInfo,
        paymentMethod,
        discount
    ])

    const resetCheckout = useCallback(() => {
        setCurrentStep(1)
        setTickets([])
        setAttendeeInfo({})
        setPaymentMethod(null)
        setReservationTime(null)
        setCheckoutComplete(false)
        setDiscount(null)
    }, [])

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
                hasSelectedTickets,
                canProceedToCheckout,
                getTicketSelectionError,
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