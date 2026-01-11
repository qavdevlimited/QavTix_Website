import { mockAvailableTickets } from "@/components-data/demo-data";
import { AUTH_ROUTES } from "@/components-data/navigation/navLinks";
import FormCheckbox1 from "@/components/custom-utils/inputs/FormCheckbox1";
import FormInput2 from "@/components/custom-utils/inputs/FormInput2";
import TicketReservationTimer from "@/components/custom-utils/TicketReservationTimer";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useCheckoutAttendeeInfoForm } from "@/contexts/CheckoutAttendeeInfoFormContext";
import { useCheckout } from "@/contexts/CheckoutFlowProvider";
import { space_grotesk } from "@/lib/redux/fonts";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Controller } from "react-hook-form";

export default function TicketCheckoutAttendeeInformationStep(){

    const hasStartedReservation = useRef(false)
    const { initializeTickets, startReservation, tickets } = useCheckout()
    useEffect(() => {
        if (mockAvailableTickets.length > 0 && tickets.length === 0) {
            initializeTickets(mockAvailableTickets)
        }
    }, [mockAvailableTickets, tickets.length, initializeTickets])

    useEffect(() => {
        if (!hasStartedReservation.current) {
            startReservation()
            hasStartedReservation.current = true
        }
    }, [startReservation])

    const { form } = useCheckoutAttendeeInfoForm()
    const { register, control, formState: { errors } } = form;


    return (
        <div>
            <h2 className={`${space_grotesk.className} mb-6 text-secondary-9 font-medium text-xl`}>Ticket Information</h2>
            <TicketReservationTimer />

            <p className="text-sm text-neutral-7 mb-8">
                <Link href={AUTH_ROUTES.SIGN_IN} className="font-medium text-accent-6">Sign in</Link> for a quicker, smoother experience
            </p>


            <form className="space-y-5">
                <FormInput2
                    label="Name"
                    placeholder="e.g. Jon"
                    required
                    {...register('name')}
                    error={errors.name?.message}
                    className="bg-neutral-3! border-none!"
                />
                <div className="md:grid grid-cols-2 gap-4">
                    <FormInput2
                        label="Email Address"
                        placeholder="e.g. Jon.Doe@gmail.com"
                        required
                        {...register('email')}
                        error={errors.email?.message}
                        className="bg-neutral-3! border-none!"
                    />
                    <FormInput2
                        label="Phone Number"
                        placeholder="e.g. +234 806 123 4567 "
                        required
                        {...register('phone')}
                        error={errors.phone?.message}
                        className="bg-neutral-3! border-none!"
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
                            className='mt-10'
                            label={
                                <span className='font-normal'>
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
                                <span className='font-normal'>
                                    Keep me in the loop with the best events near me or online
                                </span>
                            }
                        />
                    )}
                />


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
                                    {...field}
                                />
                                <Label htmlFor="split-payment" className="flex items-center gap-1 font-normal text-secondary-8">
                                    <span>Share tickets with a group</span>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <button
                                                type="button"
                                                aria-label="Membership discount info"
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
                <Controller
                    name="splitPayment"
                    control={control}
                    render={({ field: { value, onChange, ...field } }) => (
                        <div>
                            <div className="flex items-center gap-2">
                                <Switch 
                                    id="split-payment" 
                                    checked={value}
                                    onCheckedChange={onChange}
                                    {...field}
                                />
                                <Label htmlFor="split-payment" className="flex items-center gap-1 font-normal text-secondary-8">
                                    <span>Split payment with the group</span>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <button
                                                type="button"
                                                aria-label="Membership discount info"
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
                            {errors.splitPayment?.message && (
                                <p className="text-xs text-red-500 mt-1.5 ml-1">
                                    {errors.splitPayment.message}
                                </p>
                            )}
                        </div>
                    )}
                />


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
                            className='mt-10 hidden md:block'
                            label={
                                <span className='font-normal'>
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
        </div>
    )
}