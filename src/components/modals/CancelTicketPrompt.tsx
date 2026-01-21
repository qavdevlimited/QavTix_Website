'use client'

import { DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { space_grotesk } from '@/lib/fonts'
import { Dispatch, SetStateAction, useState } from 'react'
import { Icon } from '@iconify/react'
import FormCheckbox1 from '../custom-utils/inputs/FormCheckbox1'
import { AnimatedDialogForPrompt } from '../custom-utils/AnimatedDialogForPrompts'

interface TicketTier {
    id: string
    name: string
    price: number
    originalPrice: number
    currency: string
    description?: string
    features?: string[]
    available: boolean
    soldOut?: boolean
}

interface CancelTicketPromptProps {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    tickets: TicketTier[]
    onCancel: (selectedTicketIds: string[]) => void
}

export default function CancelTicketPrompt({ 
    open, 
    setOpen, 
    tickets,
    onCancel 
}: CancelTicketPromptProps) {
    const [selectedTickets, setSelectedTickets] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string>('')

    const handleTicketToggle = (ticketId: string, checked: boolean) => {
        setSelectedTickets(prev => {
            if (checked) {
                return [...prev, ticketId]
            }
            return prev.filter(id => id !== ticketId)
        })
        setError('')
    }

    const handleConfirm = async () => {
        if (selectedTickets.length === 0) {
            setError('Please select at least one ticket to cancel')
            return
        }

        setIsLoading(true)
        setError('')

        try {
            await onCancel(selectedTickets)
            // Reset state on success
            setSelectedTickets([])
            setOpen(false)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to cancel tickets')
        } finally {
            setIsLoading(false)
        }
    }

    const handleCancel = () => {
        setSelectedTickets([])
        setError('')
        setOpen(false)
    }

    return (
        <AnimatedDialogForPrompt open={open} onOpenChange={(v) => setOpen(v)}>
            <div>
                {/* Close Button */}
                <button
                    onClick={handleCancel}
                    className="absolute right-6 top-6 rounded-full p-2 hover:bg-neutral-2 transition-colors"
                    disabled={isLoading}
                >
                    <Icon icon="mdi:close" width="20" height="20" className="text-neutral-7" />
                </button>

                {/* Icon */}
                <div className="w-14 h-14 bg-danger-tertiary rounded-full flex items-center justify-center mb-6">
                    <Icon icon="mynaui:ticket-off" width="24" height="24" className='text-danger-default' />
                </div>

                <div className='text-left mb-6'>
                    <DialogHeader className="mb-3">
                        <DialogTitle className={`${space_grotesk.className} text-left text-2xl font-medium text-secondary-9`}>
                            Cancel ticket
                        </DialogTitle>
                    </DialogHeader>
                    
                    <p className="text-neutral-7 text-sm">
                        This action will cancel your ticket and remove event access. Ticket cancellation is subject to the event's refund policy.
                    </p>
                </div>

                <div className="space-y-4 mb-6 md:mb-8">
                    {tickets.map((ticket,index) => (
                        <FormCheckbox1
                            key={ticket.id}
                            id={`ticket-${ticket.id}`}
                            label={
                                <span className="font-normal text-secondary-9">
                                    Ticket {index + 1} {ticket.name}
                                </span>
                            }
                            checked={selectedTickets.includes(ticket.id)}
                            onCheckedChange={(checked) => handleTicketToggle(ticket.id, checked)}
                            disabled={isLoading}
                            flexDirection='flex-row-reverse justify-between'
                        />
                    ))}
                </div>

                {error && (
                    <p className="text-sm text-danger-default mb-4 bg-danger-tertiary px-4 py-2 rounded-lg">
                        {error}
                    </p>
                )}
                
                <div className="flex gap-3">
                    <Button
                        onClick={handleCancel}
                        disabled={isLoading}
                        className="h-14 flex-1 text-secondary-8 bg-white hover:shadow flex items-center gap-2 justify-center px-6 py-3 rounded-[30px] border-2 border-secondary-3 font-medium text-sm hover:bg-neutral-2 hover:border-secondary-5 active:bg-neutral-3 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-neutral-4 focus:ring-offset-2 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleConfirm}
                        disabled={isLoading || selectedTickets.length === 0}
                        className="h-14 flex-1 px-6 py-3 rounded-[30px] bg-danger-default hover:bg-danger-hover active:bg-danger-pressed hover:shadow-md active:scale-[0.98] disabled:bg-neutral-5 disabled:cursor-not-allowed disabled:opacity-60 text-white font-medium text-sm focus:outline-none focus:ring-2 focus:ring-danger-default focus:ring-offset-2 transition-all duration-150 flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <Icon icon="eos-icons:loading" width="20" height="20" />
                                Cancelling...
                            </>
                        ) : (
                            'Confirm'
                        )}
                    </Button>
                </div>
            </div>
        </AnimatedDialogForPrompt>
    )
}