'use client'

import { useState } from 'react'
import Image from 'next/image'
import { z } from 'zod'
import { space_grotesk } from '@/lib/redux/fonts'
import ErrorPara from '../custom-utils/ErrorPara'

const emailSchema = z.string().email('Please enter a valid email address')

interface EventLocationDetailsSectionProps {
    location?: string
    subscribers: number
    events: number
    imageSrc?: string
    heading?: string
    description?: string
}

const DEFAULT_IMAGE = "/images/demo-images/d5e805332d43cd0ed9dd77016db84f44acf2d7c4.jpg"

export default function EventLocationDetailsSection({
    location,
    subscribers,
    events,
    imageSrc = DEFAULT_IMAGE,
    heading,
    description
}: EventLocationDetailsSectionProps) {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const handleSubmit = () => {
        setError('')
        setIsSuccess(false)

        const result = emailSchema.safeParse(email)
        if (!result.success) {
            setError(result.error.issues[0].message)
            return
        }

        setIsSubmitting(true)

        setTimeout(() => {
            setIsSubmitting(false)
            setIsSuccess(true)
            setEmail('')

            setTimeout(() => setIsSuccess(false), 3000)
        }, 1000)
    }

    return (
        <section className="relative w-full overflow-hidden sm:px-10 lg:px-12 xl:px-16">
            {/* Mobile Background Image with Overlay */}
            <div className="md:hidden absolute inset-0">
                <Image
                    src={imageSrc}
                    alt={`${location} cityscape`}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/25 backdrop-blur-[1px]" />
            </div>

            <div className="md:flex gap-8 justify-between items-center">
                <div className="relative z-10 flex flex-col justify-end min-h-screen md:w-1/2 md:min-h-0 px-4 md:px-0 pb-12 pt-20 md:py-0">
                    <div className="space-y-6 max-w-xl">
                        <div className="space-y-3">
                            <h2
                                className={`text-2xl max-w-[10em] capitalize sm:text-3xl font-medium md:font-bold text-white md:text-secondary-9 leading-tight ${space_grotesk.className}`}
                            >
                                {heading}
                            </h2>
                            <p className="text-secondary-1 md:text-neutral-7 mt-5 text-sm leading-relaxed">
                                {description}
                            </p>
                        </div>

                        <div className={`${space_grotesk.className} flex items-center gap-5`}>
                            <div>
                                <p className="text-xl font-medium text-neutral-5 md:text-neutral-7">
                                    {subscribers.toLocaleString()}
                                </p>
                                <p className="text-white md:text-secondary-9 font-medium mt-1">
                                    Subscribers
                                </p>
                            </div>
                            <div className="w-0.5 h-12 bg-neutral-6" />
                            <div>
                                <p className="text-xl font-medium text-neutral-5 md:text-neutral-7">
                                    {events.toLocaleString()}
                                </p>
                                <p className="text-white md:text-secondary-9 font-medium mt-1">
                                    Events
                                </p>
                            </div>
                        </div>

                        <div className="space-y-2 md:mt-8 max-w-xl">
                            <div className="flex flex-wrap gap-3">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                        setError('')
                                        setIsSuccess(false)
                                    }}
                                    placeholder="Enter email address"
                                    className="flex-1 p-4 rounded-sm bg-neutral-3/90 backdrop-blur-sm text-xs md:text-sm text-neutral-8 placeholder:text-neutral-7 outline-none focus:ring-2 focus:ring-white transition-all"
                                    disabled={isSubmitting}
                                />
                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting || !email.trim()}
                                    className="px-8 py-4 rounded-full bg-secondary-6 text-white font-medium text-sm hover:bg-secondary-7 disabled:hover:bg-secondary-6 active:scale-95 disabled:cursor-not-allowed transition-all whitespace-nowrap"
                                >
                                    {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                                </button>
                            </div>

                            {error && <ErrorPara error={error} />}
                            {isSuccess && (
                                <p className="text-xs text-green-300 ml-4">
                                    Successfully subscribed!
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Desktop Image */}
                <div className="hidden md:block relative w-2/5 aspect-square rounded-4xl overflow-hidden shadow-2xl">
                    <Image
                        src={imageSrc}
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