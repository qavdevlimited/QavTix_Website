'use client'

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import { space_grotesk } from '@/lib/redux/fonts'
import { Icon } from '@iconify/react'
import { demoFeaturedEvents } from '@/components-data/demo-data'


const dupliactedFeaturedEvents: FeaturedEvent[] = [...demoFeaturedEvents, ...demoFeaturedEvents, ...demoFeaturedEvents].map(
    (event, index) => ({
        ...event,
        id: index + 1
    })
)

export default function FeaturedEventsSection() {
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
                stopOnInteraction: true
            })
        ]
    )

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

    const pauseAutoPlay = useCallback(() => {
        const autoplayPlugin = emblaApi?.plugins()?.autoplay
        autoplayPlugin?.stop()
    }, [emblaApi])

    const play = useCallback(() => {
        const autoplayPlugin = emblaApi?.plugins()?.autoplay
        autoplayPlugin?.play()
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
    }, [emblaApi, onSelect])

    return (
        <section className="w-full py-10 px-4 md:ps-10 lg:ps-16 md:pe-0">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-6 justify-between mb-8 md:pe-16">
                    <h2 className={`text-2xl sm:text-3xl  md:text-[2rem] font-bold text-secondary-9 ${space_grotesk.className}`}>
                        Featured events
                    </h2>
                    
                    <div className="flex gap-3">
                        <button
                            onClick={scrollPrev}
                            disabled={!canScrollPrev}
                            className="w-10 h-10 rounded-full border border-secondary-6 flex items-center justify-center hover:bg-neutral-2 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                            aria-label="Previous slide"
                        >
                            <Icon icon="si:chevron-left-line" width="24" height="24" className='text-secondary-6' />
                        </button>
                        <button
                            onClick={scrollNext}
                            disabled={!canScrollNext}
                            className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:bg-primary-7 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md"
                            aria-label="Next slide"
                        >
                            <Icon icon="si:chevron-right-line" width="24" height="24" className='text-white' />
                        </button>
                    </div>
                </div>

                {/* Carousel */}
                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex gap-6 px-3">
                        {dupliactedFeaturedEvents.map((event) => (
                            <div 
                                key={event.id}
                                onMouseOver={() => pauseAutoPlay()}
                                onMouseLeave={() => play()}
                                className="flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_20%] min-w-0"
                            >
                                <div className="group relative aspect-3/4 rounded-3xl overflow-hidden cursor-pointer">
                                    <Image
                                        src={event.image}
                                        alt={event.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    {/* Overlay */}
                                    <div className="absolute inset-0 linear-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    
                                    {/* Title on hover */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                        <h3 className="text-white text-xl font-semibold">
                                            {event.title}
                                        </h3>
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