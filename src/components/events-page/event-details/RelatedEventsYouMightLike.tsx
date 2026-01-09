'use client'
import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { space_grotesk } from '@/lib/redux/fonts'
import { eventsMock } from '@/components-data/demo-data'
import CarouselActionBtns from '@/components/custom-utils/buttons/CarouselActionBtns'
import EventsCard1 from '@/components/custom-utils/cards/EventCards'

export default function RelatedEventsYouMightLike() {
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
        <section className="w-full py-10 md:ps-10 lg:ps-16">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-6 justify-between mb-8 md:pe-16">
                    <h2 className={`text-2xl sm:text-3xl md:text-[2rem] font-bold text-secondary-9 ${space_grotesk.className}`}>
                        Related events you may like
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
                    <div className="flex gap-4 md:gap-6">
                        {eventsMock.map((event) => (
                            <div 
                                key={event.href}
                                onMouseOver={() => pauseAutoPlay()}
                                onMouseLeave={() => play()}
                                className="flex-[0_0_calc(100%-1rem)] sm:flex-[0_0_calc(50%-0.75rem)] md:flex-[0_0_calc(33.333%-1rem)] lg:flex-[0_0_calc(25%-1.125rem)] xl:flex-[0_0_calc(20%-1.2rem)] min-w-0"
                            >
                                <EventsCard1 
                                    {...event} 
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}