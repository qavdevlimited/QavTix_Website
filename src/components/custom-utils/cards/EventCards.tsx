'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"
import { EventIconActionButton } from "../../shared/EventIconActionButton"
import { copyToClipboard } from "@/helper-fns/copyToClipboard"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatPrice } from "@/helper-fns/formatPrice"
import { space_grotesk } from "@/lib/redux/fonts"
import { getAvatarColor } from "@/helper-fns/getAvatarColor"
import { getInitialsFromName } from "@/helper-fns/getInitialFromName"
import { statusStyles, StatusStylesRecord } from "@/components-data/event-status-styles"


export default function EventsCard1(cardData: IEvent) {
  const [imageError, setImageError] = useState(false)

  return (
    <div className="w-[18em] p-3 relative min-h-[25em] flex flex-col rounded-[32px] border border-neutral-6 bg-secondary-1">
      {/* Image Container */}
      <div className="relative shrink-0">
        {cardData.status && (
          <span
            className={cn(
              "absolute top-2 left-2 z-10 py-1 px-2 rounded-2xl text-center text-sm font-medium",
              statusStyles[cardData.status as keyof StatusStylesRecord]?.bg,
              statusStyles[cardData.status as keyof StatusStylesRecord]?.text,
              "capitalize"
            )}
          >
            {cardData.status}
          </span>
        )}

        <figure className="relative w-full aspect-4/3 rounded-4xl overflow-hidden">
          {!imageError ? (
            <Image
              src={cardData.image}
              alt={cardData.title}
              fill
              className="object-cover"
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlNWU3ZWIiLz4KPC9zdmc+" // light gray placeholder
              onError={() => setImageError(true)}
              priority={false}
            />
          ) : (
            // Fallback if image fails to load
            <div className="w-full h-full bg-linear-to-br from-neutral-3 to-neutral-2 flex items-center justify-center">
              <Icon
                icon="hugeicons:image-not-found"
                className="size-16 text-neutral-5 opacity-50"
              />
            </div>
          )}
        </figure>

        {/* Action Buttons */}
        <div className="flex text-white justify-end gap-3 items-center absolute bottom-3 right-3">
          <EventIconActionButton 
            icon="hugeicons:share-08" 
            onClick={() => {}} 
            feedback=""
          />
          <EventIconActionButton 
            icon="ph:link-bold" 
            onClick={() => copyToClipboard(cardData.href)} 
            feedback="Event link copied"
          />
          <EventIconActionButton 
            icon="hugeicons:favourite" 
            onClick={() => {}} 
            feedback="Added to favourites"
          />
        </div>
      </div>

      <div className="flex flex-col justify-between flex-1 mt-3">
        <div>
          <span className="bg-accent-1 w-fit block text-accent-7 font-medium py-1 px-2 mt-2 rounded-2xl text-center text-xs">
            {cardData.category}
          </span>

          <span className="text-[11px] block mt-1 w-fit text-neutral-7 truncate max-w-full">
            Hosted by {cardData.host}
          </span>

          <p className="text-sm text-secondary-9 font-medium mt-1 mb-3 line-clamp-2">
            {cardData.title || "Learn to create visually appealing and user-friendly interfaces."}
          </p>

          {/* Date & Location */}
          <div className="space-y-2 mb-2">
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-0.5">
                <Icon icon="hugeicons:calendar-04" className="size-4 shrink-0 text-accent-6" />
                <hr className="w-px h-2 border border-neutral-6" />
                <Icon icon="hugeicons:clock-01" className="size-4 shrink-0 text-accent-6" />
              </div>
              <span className="text-neutral-7 text-[11px] truncate flex-1">
                {cardData.date}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <Icon icon="hugeicons:location-01" className="size-4 shrink-0 text-accent-6" />
              <span className="text-neutral-7 text-[11px] truncate flex-1">
                {cardData.location}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          {/* Attendees */}
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {cardData.attendees.slice(0, 4).map((user) => (
                <Avatar key={user.id} className="ring-2 ring-background size-8">
                  {user.profile_img && <AvatarImage src={user.profile_img} />}
                  <AvatarFallback
                    className={`${getAvatarColor(user.id.toString())} text-white font-medium text-xs`}
                  >
                    {getInitialsFromName(user.name)}
                  </AvatarFallback>
                </Avatar>
              ))}
              {cardData.attendees.length > 4 && (
                <Avatar className="ring-2 ring-background size-8">
                  <AvatarFallback className="bg-primary-1 font-medium text-secondary-7 text-xs">
                    +{cardData.attendees.length - 4}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          </div>

          {/* Price */}
          <div className="text-right shrink-0">
            {cardData.originalPrice && (
              <p className="text-xs text-neutral-6 line-through">
                {cardData.originalPrice}
              </p>
            )}
            <p className={`${space_grotesk.className} font-medium text-lg text-secondary-9`}>
              {cardData.price}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}