'use client'

import { useState } from 'react'
import Image from 'next/image'
import { z } from 'zod'
import { space_grotesk } from '@/lib/redux/fonts'
import ErrorPara from '../custom-utils/ErrorPara'

interface EventLocationDetailsSectionProps {
    location: string
    subscribers: number
    events: number
}

const emailSchema = z.email('Please enter a valid email address')

export default function EventLocationDetailsSection({
    location,
    subscribers,
    events,
}: EventLocationDetailsSectionProps) {


    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const handleSubmit = () => {
        setError('')
        setIsSuccess(false)

        try {
            emailSchema.parse(email)
        } catch (err) {
            if (err instanceof z.ZodError) {
                setError(err.issues[0].message)
            }
            return
        }

        setIsSubmitting(true)

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false)
            setIsSuccess(true)
            setEmail('')
            
            setTimeout(() => setIsSuccess(false), 3000)
        }, 1000)
    }

    return (
        <section className="relative w-full overflow-hidden md:px-10">
            {/* Mobile Background Image with Overlay */}
            <div className="md:flex gap-8 justify-between items-center">
                <div className="relative min-h-screen md:min-h-0">
                    {/* Background Image */}
                    <div className="absolute inset-0 md:hidden">
                        <Image
                            src="/images/demo-images/d5e805332d43cd0ed9dd77016db84f44acf2d7c4.jpg"
                            alt={`${location} cityscape`}
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute h-full left-0 right-0 mx-auto bottom-0 my-0 bg-black/25 backdrop-blur-[1px]" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col justify-end min-h-screen px-4 md:px-0 pb-12 pt-20 md:py-0 md:min-h-[unset]">
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <h2 className={`text-2xl sm:text-3xl font-bold text-white md:text-secondary-9 leading-tight ${space_grotesk.className}`}>
                                    Events Happening in<br />{location}
                                </h2>
                                <p className="text-secondary-1 md:text-neutral-7 mt-5 text-sm leading-relaxed max-w-lg">
                                    From concerts and parties to conferences and pop-ups, {location} is where experiences come alive. Discover what's happening next that bring {location} to life.
                                </p>
                            </div>

                            <div className={`${space_grotesk.className} flex items-center gap-5`}>
                                <div>
                                    <p className="text-xl font-medium text-neutral-5 md:text-neutral-7">
                                        {subscribers}
                                    </p>
                                    <p className="text-white md:text-secondary-9 font-medium mt-1">
                                        Subscribers
                                    </p>
                                </div>
                                <div className="w-0.5 h-12 bg-neutral-6" />
                                <div>
                                    <p className="text-xl font-medium text-neutral-5 md:text-neutral-7">
                                        {events}
                                    </p>
                                    <p className="text-white md:text-secondary-9 font-medium mt-1">
                                        Events
                                    </p>
                                </div>
                            </div>

                            {/* Subscribe Form */}
                            <div className="space-y-2 md:mt-8">
                                <div className="flex gap-x-3 gap-y-4 flex-wrap">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value)
                                            setError('')
                                        }}
                                        placeholder="Enter email address"
                                        className="flex-1 p-4 rounded-sm bg-neutral-3 text-xs md:text-sm backdrop-blur-sm text-neutral-8 placeholder:text-neutral-7 outline-none focus:ring-2 focus:ring-white transition-all"
                                        disabled={isSubmitting}
                                    />
                                    <button
                                        onClick={handleSubmit}
                                        disabled={isSubmitting || !email}
                                        className="px-8 py-3 rounded-full bg-secondary-6 text-white font-medium text-sm hover:bg-secondary-7 disabled:hover:bg-secondary-6 active:scale-95 disabled:cursor-not-allowed transition-all whitespace-nowrap"
                                    >
                                        {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                                    </button>
                                </div>
                                {error && (
                                    <ErrorPara error={error} />
                                )}
                                {isSuccess && (
                                    <p className="text-xs text-green-300 ml-4">
                                        Successfully subscribed!
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>


                <div className='hidden relative md:block w-2/5 aspect-square rounded-4xl overflow-hidden'>
                    <Image
                        src="/images/demo-images/d5e805332d43cd0ed9dd77016db84f44acf2d7c4.jpg"
                        alt={`${location} cityscape`}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            </div>
        </section>
    )
}