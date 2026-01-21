'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState, forwardRef, useImperativeHandle } from 'react'

interface SlantedCardCarouselProps {
  images: string[]
  duration?: number
  autoPlay?: boolean
  className?: string
}

export interface SlantedCardCarouselRef {
  scrollNext: () => void
}

const SlantedCardCarousel = forwardRef<
  SlantedCardCarouselRef,
  SlantedCardCarouselProps
>(({ images, duration = 4, autoPlay = true, className }, ref) => {

    const [index, setIndex] = useState(0)

    const next = () => setIndex((i) => (i + 1) % images.length)

    useImperativeHandle(ref, () => ({
        scrollNext: next
    }))

    useEffect(() => {
        if (!autoPlay) return
        const t = setInterval(next, duration * 1000)
        return () => clearInterval(t)
    }, [autoPlay, duration])

    const get = (i: number) => (i + images.length) % images.length

    const slides = [
        get(index - 1),
        get(index),
        get(index + 1)
    ]

    const positions = ['left', 'center', 'right'] as const

    return (
        <div className={`relative my-12 ${className}`}>
            <div className="relative flex items-center justify-center min-h-80 perspective-distant">
                {slides.map((imgIndex, i) => (
                <motion.div
                    key={imgIndex}
                    variants={cardVariants}
                    animate={positions[i]}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="absolute"
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    <div className="rounded-3xl overflow-hidden shadow-xl bg-white">
                    <Image
                        src={images[imgIndex]}
                        alt=""
                        width={460}
                        height={300}
                        className="w-[78vw] max-w-115 h-72 object-cover"
                        priority={i === 1}
                    />
                    </div>
                </motion.div>
                ))}
            </div>
        </div>
    )
})

const cardVariants = {
    left: {
        x: '-42%',
        scale: 0.88,
        opacity: 0.6,
        rotateY: 20,
        zIndex: 1
    },
    center: {
        x: '0%',
        scale: 1,
        opacity: 1,
        rotateY: 0,
        zIndex: 3
    },
    right: {
        x: '42%',
        scale: 0.88,
        opacity: 0.6,
        rotateY: -20,
        zIndex: 1
    }
}

SlantedCardCarousel.displayName = 'SlantedCardCarousel'
export default SlantedCardCarousel


// import { motion, AnimatePresence, Transition } from 'framer-motion'
// import Image from 'next/image'
// import { useEffect, useState, forwardRef, useImperativeHandle } from 'react'

// interface SlantedCardCarouselProps {
//     images: string[]
//     duration?: number // seconds to display each card
//     autoPlay?: boolean
//     className?: string
// }

// export interface SlantedCardCarouselRef {
//     scrollNext: () => void
// }

// const SlantedCardCarousel = forwardRef<SlantedCardCarouselRef, SlantedCardCarouselProps>(
//     ({ images, duration = 4, className, autoPlay = true }, ref) => {
//         const [currentIndex, setCurrentIndex] = useState(0)

//         const nextSlide = () => {
//             setCurrentIndex((prev) => (prev + 1) % images.length)
//         }

//         useImperativeHandle(ref, () => ({
//             scrollNext: nextSlide
//         }))

//         useEffect(() => {
//             if (!autoPlay) return

//             const interval = setInterval(() => {
//                 nextSlide()
//             }, duration * 1000)

//             return () => clearInterval(interval)
//         }, [autoPlay, duration, images.length])

//         const variants = {
//             enter: {
//                 x: '120%',
//                 rotateY: -35,
//                 opacity: 0,
//                 scale: 0.8,
//                 transformOrigin: 'right center' as const
//             },
//             center: {
//                 x: 0,
//                 rotateY: 0,
//                 opacity: 1,
//                 scale: 1,
//                 transformOrigin: 'center center' as const,
//                 transition: {
//                     duration: 1.2,
//                     ease: [0.4, 0.0, 0.2, 1]
//                 } as Transition
//             },
//             exit: {
//                 x: '-120%',
//                 rotateY: 35,
//                 opacity: 0,
//                 scale: 0.8,
//                 transformOrigin: 'left center' as const,
//                 transition: {
//                     duration: 1.2,
//                     ease: [0.4, 0.0, 0.2, 1]
//                 } as Transition
//             }
//         }

//         return (
//             <div className={`relative overflow-hidden my-12 ${className}`}>
//                 <div className="relative w-full flex justify-center items-center min-h-[280px] md:min-h-[400px]">
//                     <AnimatePresence initial={false}>
//                         <motion.div
//                             key={currentIndex}
//                             variants={variants}
//                             initial="enter"
//                             animate="center"
//                             exit="exit"
//                             className="absolute"
//                             style={{ perspective: 1200 }}
//                         >
//                             <div className="relative rounded-3xl md:rounded-4xl overflow-hidden shadow-2xl">
//                                 <Image
//                                     src={images[currentIndex]}
//                                     alt={`carousel image ${currentIndex + 1}`}
//                                     width={400}
//                                     height={280}
//                                     className="w-[90vw] max-w-[380px] md:max-w-[480px] h-64 md:h-80 object-cover"
//                                     priority
//                                 />
//                             </div>
//                         </motion.div>
//                     </AnimatePresence>
//                 </div>
//             </div>
//         )
//     }
// )

// SlantedCardCarousel.displayName = 'SlantedCardCarousel'

// export default SlantedCardCarousel