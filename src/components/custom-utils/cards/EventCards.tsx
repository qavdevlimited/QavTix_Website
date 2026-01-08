"use client"

import { Icon } from "@iconify/react";
import Image from "next/image";
import { EventCardIconActionButton } from "../buttons/EventCardIconActionButton";
import { copyToClipboard } from "@/helper-fns/copyToClipboard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatPrice } from "@/helper-fns/formatPrice";
import { space_grotesk } from "@/lib/redux/fonts";

type StatusStylesRecord = Record<
  IEventStatus,
  { bg: string; text: string; label: string }
>

const statusStyles : StatusStylesRecord  = {
  "filling-fast": {
    bg: "bg-warning-tertiary",
    text: "text-secondary-9",
    label: "Filling fast",
  },
  "near-capacity": {
    bg: "bg-danger-tertiary",
    text: "text-secondary-9",
    label: "Near capacity",
  },
  new: {
    bg: "bg-positive-tertiary",
    text: "text-secondary-9",
    label: "New",
  },
  "sold-out": {
    bg: "bg-white",
    text: "text-red-600",
    label: "Sold out",
  },
}


export default function EventsCard1(cardData : IEvent){
    return (
        <div className="w-[18em] p-3 relative min-h-[25em] flex flex-col h-[25em] rounded-[32px] border border-neutral-6 bg-secondary-1">
            <div className="relative shrink-0">
                {
                    cardData.status &&
                    <span className={`absolute py-1 px-2 rounded-2xl text-center text-sm font-medium top-2 left-2 ${statusStyles[cardData.status as keyof StatusStylesRecord].bg} ${statusStyles[cardData.status as keyof StatusStylesRecord].text} capitalize`}>{cardData.status}</span>
                }
                <Image src={cardData.image} alt={cardData.title} width={400} height={400} className="rounded-4xl" />

                <div className="flex justify-end gap-4 items-center absolute bottom-3 right-3">
                    <EventCardIconActionButton 
                        icon="hugeicons:share-08" 
                        onClick={() => {}} 
                        feedback=""
                    />
                    <EventCardIconActionButton 
                        icon="ph:link-bold" 
                        onClick={() => copyToClipboard(cardData.href)} 
                        feedback="Event link copied"
                    />
                    <EventCardIconActionButton 
                        icon="hugeicons:favourite" 
                        onClick={() => {}} 
                        feedback="Added to favourites"
                    />
                </div>
            </div>

            <div className="flex flex-col justify-between flex-1">
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

                    {/* Date/Location */}
                    <div className="space-y-2 mb-2">
                        <div className="flex items-center gap-1">
                            <div className="flex items-center gap-0.5">
                                <Icon icon="hugeicons:calendar-04" className="size-4 text-accent-6" />
                                <hr className="w-px h-2 border border-neutral-6" />
                                <Icon icon="hugeicons:clock-01" className="size-4 text-accent-6" />
                            </div>
                            <span className="text-neutral-7 text-[11px] truncate flex-1">
                                {cardData.date}
                            </span>
                        </div>

                        <div className="flex items-center gap-1">
                            <Icon icon="hugeicons:location-01" className="size-4 text-accent-6" />
                            <span className="text-neutral-7 text-[11px] truncate flex-1">
                                {cardData.location}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex items-baseline-last justify-between pt-2">
                    {/* Attendees */}
                    <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                            {cardData.attendees.slice(0, 4).map((user) => (
                                <Avatar key={user.id} className="ring-2 ring-background">
                                    <AvatarImage src={user.image} />
                                    <AvatarFallback>{user.initials}</AvatarFallback>
                                </Avatar>
                            ))}
                        </div>
                        {cardData.attendees.length > 4 && (
                            <span className="text-xs text-secondary-7">
                                +{cardData.attendees.length - 4}
                            </span>
                        )}
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