'use client'

import { slides_onlyImages } from '@/components-data/auth-pages/slides'
import { motion } from 'framer-motion'
import Image from 'next/image'

function InfiniteScrollRow({
    images,
    direction = 'left',
    duration = 30
}: {
    images: string[]
    direction?: 'left' | 'right'
    duration?: number
}) {
    const items = [...images, ...images]

    return (
        <div className="overflow-hidden">
            <motion.div
                className="flex gap-6"
                animate={{ x: direction === 'left' ? '-50%' : '0%' }}
                transition={{
                    duration,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop"
                }}
            >
                {items.map((image, index) => (
                    <div
                        key={index}
                        className="shrink-0"
                    >
                        <Image
                            src={image}
                            alt={`Slide ${index % images.length + 1}`}
                            width={400}
                            height={400}
                            className="h-64 w-64 object-cover rounded-2xl"
                            priority={index < images.length}
                            loading={index >= images.length ? "lazy" : "eager"}
                        />
                    </div>
                ))}
            </motion.div>
        </div>
    )
}

export default function InfiniteScrollImagesSingle() {
    return (
        <div className="mb-8 py-4">
            <InfiniteScrollRow
                images={slides_onlyImages}
                direction="left"
                duration={25}
            />
        </div>
    )
}