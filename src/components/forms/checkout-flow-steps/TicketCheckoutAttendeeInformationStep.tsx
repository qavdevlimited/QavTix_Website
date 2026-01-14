'use client'

import { useEffect } from 'react'
import { Controller } from 'react-hook-form'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import { mockAvailableTickets } from '@/components-data/demo-data'
import { AUTH_ROUTES } from '@/components-data/navigation/navLinks'
import FormCheckbox1 from '@/components/custom-utils/inputs/FormCheckbox1'
import FormInput2 from '@/components/custom-utils/inputs/FormInput2'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useCheckoutAttendeeInfoForm } from '@/contexts/CheckoutAttendeeInfoFormContext'
import { useCheckout } from '@/contexts/CheckoutFlowProvider'
import { useTicketUser } from '@/contexts/TicketUserProvider'
import { space_grotesk } from '@/lib/fonts'
import { useSplitPayment } from '@/contexts/SplitPaymentContextProvider'
import SplitPaymentAddAttendee from './SplitPaymentAddAttendee'
import { SplitMode } from '@/schemas/checkout-flow.schema'

export default function TicketCheckoutAttendeeInformationStep() {

    const { initializeTickets, tickets, selectedTickets } = useCheckout()
    const isAuthenticated = true;
    const { form } = useCheckoutAttendeeInfoForm()
    const { register, control, setValue, formState: { errors }, watch } = form
    
    const {
        splitMode,
        setSplitMode,
        attendees,
        addAttendee,
        canAddMoreAttendees,
        getTotalAssignedAmount,
        setSplitPaymentEnabled,
        getRemainingAmount
    } = useSplitPayment()

    const splitPaymentEnabled = watch('splitPayment')
    const shareWithGroupEnabled = watch('shareWithGroup')

    useEffect(() => {
        if (mockAvailableTickets.length > 0 && tickets.length === 0) {
            initializeTickets(mockAvailableTickets)
        }
    }, [mockAvailableTickets, tickets.length, initializeTickets])

    useEffect(() => {
        setSplitPaymentEnabled(splitPaymentEnabled!!)
    },[splitPaymentEnabled])

    useEffect(() => {
        if (!shareWithGroupEnabled){
            setValue("splitPayment", false)
        }
    },[shareWithGroupEnabled])


    const handleAddAttendee = () => {
        if (canAddMoreAttendees && selectedTickets.reduce((v,c) => v+c.quantity,0) > attendees.length) {
            addAttendee()
        }
    }
    

    return (
        <>
            {!isAuthenticated && (
                <p className="text-sm text-neutral-7 mb-8">
                    <Link href={AUTH_ROUTES.SIGN_IN} className="font-medium text-accent-6">
                        Sign in
                    </Link> for a quicker, smoother experience
                </p>
            )}

            <form className="space-y-5">
                <FormInput2
                    label="Name"
                    placeholder="e.g. Jon"
                    required
                    {...register('name')}
                    error={errors.name?.message}
                    className="bg-neutral-3"
                />
                
                <div className="md:grid grid-cols-2 gap-4">
                    <FormInput2
                        label="Email Address"
                        placeholder="e.g. Jon.Doe@gmail.com"
                        required
                        {...register('email')}
                        error={errors.email?.message}
                        className="bg-neutral-3"
                    />
                    <FormInput2
                        label="Phone Number"
                        placeholder="e.g. +234 806 123 4567"
                        required
                        {...register('phone')}
                        error={errors.phone?.message}
                        className="bg-neutral-3"
                    />
                </div>

                <Controller
                    name="sendUpdates"
                    control={control}
                    render={({ field }) => (
                        <FormCheckbox1
                            id="send-updates"
                            {...field}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            error={errors.sendUpdates?.message}
                            className="mt-10"
                            label={
                                <span className="font-normal">
                                    Send me updates on future events and news from this organizer
                                </span>
                            }
                        />
                    )}
                />

                <Controller
                    name="keepInLoop"
                    control={control}
                    render={({ field }) => (
                        <FormCheckbox1
                            id="keep-in-Loop"
                            {...field}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            error={errors.keepInLoop?.message}
                            label={
                                <span className="font-normal">
                                    Keep me in the loop with the best events near me or online
                                </span>
                            }
                        />
                    )}
                />

                {/* Share with Group - AUTH ONLY */}
                <Controller
                    name="shareWithGroup"
                    control={control}
                    render={({ field: { value, onChange, ...field } }) => (
                        <div>
                            <div className="flex items-center gap-2 mt-10">
                                <Switch
                                    id="share-with-group"
                                    checked={value}
                                    onCheckedChange={onChange}
                                    disabled={!isAuthenticated}
                                    {...field}
                                />
                                <Label htmlFor="share-with-group" className="flex items-center gap-1 font-normal text-secondary-8">
                                    <span>Share tickets with a group</span>
                                    {!isAuthenticated && (
                                        <Icon icon="mdi:lock" className="w-4 h-4 text-neutral-7" />
                                    )}
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <button
                                                type="button"
                                                aria-label="Share with group info"
                                                className="text-neutral-6 hover:text-neutral-8 transition-colors"
                                            >
                                                <Icon icon="carbon:information" className="size-4 text-accent-6" />
                                            </button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Tickets go to the emails provided here</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </Label>
                            </div>
                            {errors.shareWithGroup?.message && (
                                <p className="text-xs text-red-500 mt-1.5 ml-1">
                                    {errors.shareWithGroup.message}
                                </p>
                            )}
                        </div>
                    )}
                />

                {/* Split Payment - AUTH ONLY */}
                <Controller
                    name="splitPayment"
                    control={control}
                    render={({ field: { value, onChange, ...field } }) => (
                        <div>
                            <div className='flex justify-between items-center'>
                                <div className="flex items-center gap-3">
                                    <Switch
                                        id="split-payment"
                                        checked={value}
                                        onCheckedChange={onChange}
                                        disabled={!isAuthenticated || !shareWithGroupEnabled}
                                        {...field}
                                    />
                                    <Label htmlFor="split-payment" className="flex items-center gap-1 font-normal text-secondary-8">
                                        <span>Split payment with the group</span>
                                        {!isAuthenticated && (
                                            <Icon icon="mdi:lock" className="w-4 h-4 text-neutral-7" />
                                        )}
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <button
                                                    type="button"
                                                    aria-label="Split payment info"
                                                    className="text-neutral-6 hover:text-neutral-8 transition-colors"
                                                >
                                                    <Icon icon="carbon:information" className="size-4 text-accent-6" />
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Tickets are delivered after all members complete payment.</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </Label>

                                </div>
                                {/* Split Mode Selector - Shows when split payment is ON */}
                                {value && (
                                    <Select value={splitMode} onValueChange={(v) => setSplitMode(v as SplitMode)}>
                                        <SelectTrigger className="w-fit h-9 font-normal text-secondary-9">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className='font-normal space-y-2 text-secondary-7'>
                                            <SelectItem value="equal">Equal Split</SelectItem>
                                            <SelectItem value="manual">Manual Input</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            </div>
                            {errors.splitPayment?.message && (
                                <p className="text-xs text-red-500 mt-1.5 ml-1">
                                    {errors.splitPayment.message}
                                </p>
                            )}
                        </div>
                    )}
                />




                {/* Attendees Section - Shows when split payment is ON */}
                {shareWithGroupEnabled && isAuthenticated && (
                    <div className="my-12 space-y-4">
                        <div className="flex items-center gap-3 justify-between">
                            <h3 className={`${space_grotesk.className} text-lg font-medium text-secondary-9`}>
                                Sharing With Attendees
                            </h3>
                            <Button
                                type="button"
                                onClick={handleAddAttendee}
                                disabled={!canAddMoreAttendees}
                                className="flex items-center gap-2 text-xs px-2! w-fit"
                            >
                                <Icon icon="mdi:plus" className="w-5 h-5" />
                                Add Attendee
                            </Button>
                        </div>

                        {/* Payment Summary */}
                        {splitPaymentEnabled && attendees.length > 0 && (
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm text-secondary-8">
                                    <span className="text-neutral-7">Total Assigned:</span>
                                    <span className="font-medium">₦{getTotalAssignedAmount().toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-neutral-7">Remaining:</span>
                                    <span className={`font-medium ${getRemainingAmount() < 0 ? 'text-red-500' : 'text-green-600'}`}>
                                        ₦{getRemainingAmount().toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Attendee Cards */}
                        <div className="space-y-8 mt-6">
                            {attendees.map((attendee, index) => (
                                <SplitPaymentAddAttendee
                                    index={index} 
                                    attendee={attendee} 
                                    key={index} 
                                    canRemove={attendees.length > 1}
                                    allAttendees={attendees}
                                />
                            ))}
                        </div>
                    </div>
                )}

                <Controller
                    name="agreeToTerms"
                    control={control}
                    render={({ field }) => (
                        <FormCheckbox1
                            id="agreed-to-terms"
                            {...field}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            error={errors.agreeToTerms?.message}
                            className="mt-10 hidden md:block"
                            label={
                                <span className="font-normal">
                                    I agree to QavTix{' '}
                                    <Link href="/terms" className="text-accent-6 font-medium hover:underline">
                                        Terms & Conditions
                                    </Link>
                                    {' '}and{' '}
                                    <Link href="/commission" className="text-accent-6 font-medium hover:underline">
                                        Refund Policy
                                    </Link>.
                                </span>
                            }
                        />
                    )}
                />
            </form>
        </>
    )
}