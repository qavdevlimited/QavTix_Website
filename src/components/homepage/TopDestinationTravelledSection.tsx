"use client"

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
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

const duplicatedDestinations = [...destinations, ...destinations].map((dest, index) => ({
    ...dest,
    id: `dest-${index}`
}))

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
                delay: 2500,
                stopOnInteraction: false,
                stopOnMouseEnter: true
            })
        ]
    )

    const autoplay = emblaApi?.plugins()?.autoplay

    const scrollPrev = useCallback(() => {
        autoplay?.stop()
        emblaApi?.scrollPrev()
    }, [emblaApi, autoplay])

    const scrollNext = useCallback(() => {
        autoplay?.stop()
        emblaApi?.scrollNext()
    }, [emblaApi, autoplay])

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
        <section className="w-full py-8 mt-8 bg-neutral-1 ps-4 sm:ps-10 lg:ps-14 xl:ps-20 lg:min-h-[25em] lg:h-[25em]">
            <div>
                <div className="flex items-center justify-between mb-10 pe-4 sm:pe-10 lg:pe-14 xl:pe-20">
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

                <div className="overflow-hidden" ref={emblaRef}>
                  <div className="flex gap-6 px-3 py-1">
                    {duplicatedDestinations.map((dest) => (
                      <div
                      key={dest.id}
                      className="relative flex-[0_0_85%] sm:flex-[0_0_45%] md:flex-[0_0_30%] xl:flex-[0_0_22%] min-w-0"
                      onMouseEnter={() => autoplay?.stop()}
                      onMouseLeave={() => autoplay?.play()}
                    >
                      <div className="group relative rounded-3xl overflow-hidden flex flex-col transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
                          
                        {/* Image Container */}
                        <div className="relative h-56 lg:h-64 group-hover:h-32 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden rounded-3xl">
                          <Image
                            src={dest.image}
                            alt={dest.title}
                            fill
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                          />
                            
                          {/* Title overlay - fades out on hover */}
                          <div className="absolute hidden lg:block inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-500 ease-out group-hover:opacity-0">
                            <h3
                              className={`absolute left-5 bottom-5 z-10 text-lg md:text-xl text-white font-medium drop-shadow-md transition-all duration-500 ease-out group-hover:translate-y-2 group-hover:opacity-0 ${space_grotesk.className}`}
                            >
                              {dest.title}
                            </h3>
                          </div>
                        </div>

                        {/* Details Container */}
                        <div className="bg-white h-auto lg:h-0 lg:opacity-0 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:h-auto group-hover:opacity-100">
                          <div className="p-5 transform translate-y-0 opacity-100 lg:translate-y-4 lg:opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                            <h3 className={`text-lg text-secondary-9 font-medium mb-2 ${space_grotesk.className}`}>
                              {dest.title}
                            </h3>
                            <p className="text-sm leading-relaxed text-secondary-7 line-clamp-3">
                              {dest.description}
                            </p>
                            <p className="text-xs text-neutral-6 mt-2 flex items-center gap-1">
                              <span>📍</span>
                              {dest.location}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    ))}
                  </div>
                </div>
            </div>
        </section>
    )
}