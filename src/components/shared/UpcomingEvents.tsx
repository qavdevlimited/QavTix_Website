'use client'

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { space_grotesk } from '@/lib/redux/fonts'
import CarouselActionBtns from '@/components/custom-utils/buttons/CarouselActionBtns'
import EventsCard1 from '@/components/custom-utils/cards/EventCards'

interface UpcomingEventsProps {
  upcomingEventsData: IEvent[]
}

export default function UpcomingEvents({ upcomingEventsData }: UpcomingEventsProps) {
    const duplicatedEvents = [...upcomingEventsData, ...upcomingEventsData].map((event, index) => ({
        ...event,
        _uniqueId: `${event.href}-${index}`,
    }))

    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
        loop: true,
        align: 'start',
        skipSnaps: false,
        dragFree: false,
        },
        [
        Autoplay({
            delay: 2000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
            stopOnFocusIn: false,
        }),
        ]
    )

    const autoplay = emblaApi?.plugins()?.autoplay

    const scrollPrev = useCallback(() => {
        emblaApi?.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        emblaApi?.scrollNext()
    }, [emblaApi])

    const pauseAutoPlay = useCallback(() => {
        autoplay?.stop()
    }, [autoplay])

    const resumeAutoPlay = useCallback(() => {
        autoplay?.play()
    }, [autoplay])

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
        <section className="w-full py-10 md:ps-10 lg:ps-16">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-6 justify-between mb-8 md:pe-16">
                <h2 className={`${space_grotesk.className} text-2xl sm:text-3xl md:text-[2rem] font-medium text-secondary-9`}>
                    Upcoming events
                </h2>

                <CarouselActionBtns
                    scrollPrev={scrollPrev}
                    scrollNext={scrollNext}
                    canScrollPrev={canScrollPrev}
                    canScrollNext={canScrollNext}
                />
                </div>

                {/* Carousel */}
                <div
                    className="overflow-hidden"
                    ref={emblaRef}
                    onMouseEnter={pauseAutoPlay}
                    onMouseLeave={resumeAutoPlay}
                >
                <div className="flex gap-4 px-3">
                    {duplicatedEvents.map((event) => (
                    <div
                        key={event._uniqueId}
                        className="flex-[0_0_95%] sm:flex-[0_0_45%] lg:flex-[0_0_33.33%] xl:flex-[0_0_24%] min-w-0"
                    >
                        <EventsCard1 {...event} />
                    </div>
                    ))}
                </div>
                </div>
            </div>
        </section>
    )
}