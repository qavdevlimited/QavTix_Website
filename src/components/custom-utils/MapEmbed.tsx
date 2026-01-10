'use client'

import { cn } from '@/lib/utils'

interface MapProps {
  location: string
  className?: string
  height?: string
  width?: string
  zoom?: number
  allowFullScreen?: boolean
}

export default function MapEmbed({
  location,
  className,
  height = '400px',
  width = '100%',
  allowFullScreen = true
}: MapProps) {
    const encodedLocation = encodeURIComponent(location)
    
    const searchUrl = `https://www.google.com/maps?q=${encodedLocation}&output=embed`

    return (
        <div className={cn('overflow-hidden rounded-xl', className)}>
            <iframe
                src={searchUrl}
                width={width}
                height={height}
                style={{ border: 0 }}
                allowFullScreen={allowFullScreen}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map of ${location}`}
                className="w-full"
            />
        </div>
    )
}