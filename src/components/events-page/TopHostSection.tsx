'use client'

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import { space_grotesk } from '@/lib/redux/fonts'
import CarouselActionBtns from '../custom-utils/buttons/CarouselActionBtns'
import { demoHosts } from '@/components-data/demo-data'
import FollowHostBtn1 from '../custom-utils/buttons/FollowHostBtn1'


const dupliactedHostsData: Host[] = [...demoHosts, ...demoHosts, ...demoHosts].map((event,index) => {
    return { ...event, id: index + 1}
})

export default function TopHostsSection() {
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
        <section className="w-full pt-20 pb-24 px-4 md:ps-10 lg:ps-16 md:pe-0">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-6 justify-between md:pe-16">
                    <h2 className={`text-2xl sm:text-3xl  md:text-[2rem] font-bold text-secondary-9 ${space_grotesk.className}`}>
                        Top Hosts
                    </h2>
                    
                    <CarouselActionBtns
                        scrollPrev={scrollPrev}
                        scrollNext={scrollNext}
                        canScrollPrev={canScrollPrev}
                        canScrollNext={canScrollNext}
                    />
                </div>

                {/* Carousel */}
                <div className="overflow-hidden mt-14 md:mt-16" ref={emblaRef}>
                    <div className="flex gap-6 px-3">
                        {dupliactedHostsData.map((host) => (
                            <div 
                                key={host.id}
                                onMouseOver={() => pauseAutoPlay()}
                                onMouseLeave={() => play()}
                                className="flex-[0_0_85%] sm:flex-[0_0_30%] lg:flex-[0_0_20%] min-w-0 flex justify-between items-center flex-col bg-secondary-1 rounded-3xl py-6 min-h-[19em]"
                            >
                                <Image
                                    src={host.profile_img}
                                    alt={host.name}
                                    width={400}
                                    height={400}
                                    className="object-cover rounded-full aspect-square w-28"
                                />
                                <div>
                                    <h3 className={`${space_grotesk.className} text-center text-lg font-medium text-secondary-9 mb-1`}>{host.name}</h3>
                                    <div className={`${space_grotesk.className} flex gap-3 text-xs font-medium text-neutral-8 items-center`}>
                                        <span>
                                            <span className='text-neutral-7'>{host.followers}</span> Followers
                                        </span>
                                        <hr className="w-px h-2 border border-neutral-6" />
                                        <span>
                                            <span className='text-neutral-7'>{host.events}</span> Events
                                        </span>
                                    </div>
                                </div>


                                <FollowHostBtn1 />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}