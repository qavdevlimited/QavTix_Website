'use client'

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { usePathname } from 'next/navigation'
import { onboardingSlides, signInSlides, signUpSlides } from '@/components-data/auth-pages/slides'

export default function AuthPageImageCarousel() {

    const pathName = usePathname()
    const slides = pathName.includes('signin') ? 
    signInSlides : pathName.includes('signup') ? 
    signUpSlides : pathName.includes('onboarding') ? onboardingSlides : []
    const [emblaRef, emblaApi] = useEmblaCarousel(
        { 
            loop: true,
            duration: 30
        },
        [
            Autoplay({ 
                delay: 5000,
                stopOnInteraction: false
            })
        ]
    )

    const [selectedIndex, setSelectedIndex] = useState(0)

    const onSelect = useCallback(() => {
        if (!emblaApi) return
        setSelectedIndex(emblaApi.selectedScrollSnap())
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return
        onSelect()
        emblaApi.on('select', onSelect)
        emblaApi.on('reInit', onSelect)
    }, [emblaApi, onSelect])

    const scrollTo = useCallback((index: number) => {
        if (emblaApi) emblaApi.scrollTo(index)
    }, [emblaApi])

    return (
        <div className="relative w-2/5">
            <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
                <div className="flex">
                    {slides.map((slide) => (
                        <div key={slide.id} className="flex-[0_0_100%] min-w-0 relative">
                        <div className="relative h-[500px] md:h-[600px]">
                            {/* Background Image */}
                            <div 
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: `url(${slide.image})` }}
                                >
                                {/* Dark Overlay */}
                                <div className="absolute inset-0 bg-black/40" />
                            </div>
                            
                            {/* Content */}
                            <div className="relative h-full flex items-center justify-center px-6 md:px-12">
                                <div className="max-w-3xl text-center text-white">
                                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                                    {slide.title}
                                    </h1>
                                    <p className="text-lg md:text-xl opacity-90 mb-8">
                                    {slide.description}
                                    </p>
                                    <div className="flex gap-4 justify-center">
                                    <button className="bg-[rgb(var(--primary-6))] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[rgb(var(--primary-7))] transition-colors">
                                        Get Started
                                    </button>
                                    <button className="bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors border border-white/20">
                                        Learn More
                                    </button>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="absolute top-6 left-0 right-0 flex justify-center gap-2 z-10">
                {slides.map((_, index) => (
                <button
                    key={index}
                    onClick={() => scrollTo(index)}
                    className={`transition-all duration-300 rounded-full ${
                    index === selectedIndex
                        ? 'w-8 h-2 bg-white'
                        : 'w-2 h-2 bg-white/50 hover:bg-white/75'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                />
                ))}
            </div>
        </div>
    )
}