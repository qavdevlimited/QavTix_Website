'use client'

import { useCallback, useEffect, useState, useRef } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import { space_grotesk } from '@/lib/fonts'
import { motion } from 'framer-motion'
import CarouselActionBtns from '../custom-utils/buttons/CarouselActionBtns'

interface TopDestination {
    id: number
    image: string
    title: string
    description: string
    location: string
}

const destinations: TopDestination[] = [
    {
        id: 1,
        image: "/images/demo-images/unsplash_JOurOANPgIc.png",
        title: "Lagos",
        description: "The vibrant heart of Nigeria with beaches, nightlife, and bustling markets.",
        location: "Lagos, Nigeria"
    },
    {
        id: 2,
        image: "/images/demo-images/unsplash_JOurOANPgIc.png",
        title: "Abuja",
        description: "Modern capital city featuring Aso Rock, beautiful architecture and green spaces.",
        location: "Abuja, Nigeria"
    },
    {
        id: 3,
        image: "/images/demo-images/unsplash_JOurOANPgIc.png",
        title: "Calabar",
        description: "Known as the 'Canaan City' with rich cultural heritage and the famous carnival.",
        location: "Cross River, Nigeria"
    },
    {
        id: 4,
        image: "/images/demo-images/unsplash_JOurOANPgIc.png",
        title: "Port Harcourt",
        description: "The garden city famous for oil, rivers, and vibrant food culture.",
        location: "Rivers, Nigeria"
    },
    {
        id: 5,
        image: "/images/demo-images/unsplash_JOurOANPgIc.png",
        title: "Obudu",
        description: "Mountain resort with cool climate, cable cars and stunning natural views.",
        location: "Cross River, Nigeria"
    },
    {
        id: 6,
        image: "/images/demo-images/unsplash_JOurOANPgIc.png",
        title: "Kano",
        description: "Ancient city with historic walls, dye pits, and rich Hausa culture.",
        location: "Kano, Nigeria"
    }
]

const duplicatedDestinations = [...destinations, ...destinations, ...destinations].map(
    (dest, index) => ({
        ...dest,
        id: index + 1
    })
)

export default function TopDestinationTravelledSection() {
    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            align: 'start',
            skipSnaps: false,
            dragFree: false
        },
        [
            Autoplay({
                delay: 2000,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
                stopOnFocusIn: false
            })
        ]
    )

    const autoplay = emblaApi?.plugins()?.autoplay

    const scrollPrev = useCallback(() => {
        const autoplayPlugin = emblaApi?.plugins()?.autoplay
        autoplayPlugin?.stop()
        emblaApi?.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        const autoplayPlugin = emblaApi?.plugins()?.autoplay
        autoplayPlugin?.stop()
        emblaApi?.scrollNext()
    }, [emblaApi])

    const [canScrollPrev, setCanScrollPrev] = useState(false)
    const [canScrollNext, setCanScrollNext] = useState(false)

    const onSelect = useCallback(() => {
        if (!emblaApi) return
        setCanScrollPrev(emblaApi.canScrollPrev())
        setCanScrollNext(emblaApi.canScrollNext())
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return
        onSelect()
        emblaApi.on('select', onSelect)
        emblaApi.on('reInit', onSelect)
        return () => {
            emblaApi.off('select', onSelect)
            emblaApi.off('reInit', onSelect)
        }
    }, [emblaApi, onSelect])

    return (
        <section className="w-full py-14 mt-8 lg:mt-16 px-4 sm:px-10 lg:px-16 bg-neutral-1">
            <div className="">
                <div className="flex items-center justify-between mb-10 md:mb-14">
                    <h2 className={`text-2xl md:text-3xl font-bold text-secondary-9 ${space_grotesk.className}`}>
                        Top traveled destinations
                    </h2>

                    <CarouselActionBtns
                        scrollPrev={scrollPrev}
                        scrollNext={scrollNext}
                        canScrollPrev={canScrollPrev}
                        canScrollNext={canScrollNext}
                    />
                </div>

                {/* Carousel */}
                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex gap-6 px-3">
                        {duplicatedDestinations.map((dest) => (
                            <div
                                key={dest.id}
                                className="relative flex-[0_0_90%] sm:flex-[0_0_50%] md:flex-[0_0_40%] lg:flex-[0_0_25%] min-w-0 aspect-square"
                                onMouseEnter={() => autoplay?.stop()}
                                onMouseLeave={() => autoplay?.play()}
                                >
                                <motion.div
                                    className="group relative aspect-square rounded-3xl overflow-hidden cursor-pointer"
                                    initial="rest"
                                    whileHover="hover"
                                    animate="rest"
                                >
                                    <Image
                                        src={dest.image}
                                        alt={dest.title}
                                        width={400}
                                        height={400}
                                        className="object-cover rounded-3xl"
                                    />

                                    <motion.h3
                                        variants={{
                                            rest: { opacity: 1, y: 0 },
                                            hover: { opacity: 0, y: 10 },
                                        }}
                                        transition={{ duration: 0.3 }}
                                        className={`absolute left-6 bottom-6 z-10 text-lg md:text-xl text-white font-medium ${space_grotesk.className}`}
                                    >
                                        {dest.title}
                                    </motion.h3>

                                    {/* Info panel */}
                                    <motion.div
                                        variants={{
                                            rest: { y: "100%" },
                                            hover: { y: "0%" },
                                        }}
                                        transition={{ duration: 0.45, ease: "easeOut" }}
                                        className="absolute inset-x-0 bottom-0 h-[55%] bg-white backdrop-blur-sm p-6 flex items-end"
                                    >
                                        <div>
                                            <h3
                                            className={`text-lg text-secondary-9 font-medium mb-2 ${space_grotesk.className}`}
                                            >
                                            {dest.title}
                                            </h3>
                                            <p className="text-sm leading-relaxed text-secondary-7 line-clamp-3">
                                            {dest.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}