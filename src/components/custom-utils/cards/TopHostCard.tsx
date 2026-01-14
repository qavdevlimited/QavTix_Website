'use client'

import Image from 'next/image'
import Link from 'next/link'
import { space_grotesk } from '@/lib/redux/fonts'
import FollowHostBtn1 from '@/components/custom-utils/buttons/FollowHostBtn1'
import { NAV_LINKS } from '@/components-data/navigation/navLinks'

interface TopHostCardProps {
    host: Host
    onMouseOver?: () => void
    onMouseLeave?: () => void
    className?: string
}

export default function TopHostCard({ 
    host, 
    onMouseOver, 
    onMouseLeave,
    className = ''
}: TopHostCardProps) {


    const hostUrl =  NAV_LINKS.HOST_PROFILE.href.replace("[host_id]", String(host.id))

    return (
        <Link
            href={hostUrl}
            onMouseOver={onMouseOver}
            onMouseLeave={onMouseLeave}
            className={`flex-[0_0_85%] sm:flex-[0_0_30%] lg:flex-[0_0_20%] min-w-0 flex justify-between items-center flex-col bg-secondary-1 rounded-3xl py-6 min-h-[19em] hover:shadow-lg hover:border hover:border-neutral-4 transition-all duration-200 focus:outline-none focus:ring-[1.5px] focus:ring-accent-5 focus:ring-offset-[1.5px] group ${className}`}
            aria-label={`View ${host.name}'s profile`}
        >
            <div className="relative">
                <Image
                    src={host.profile_img}
                    alt={`${host.name}'s profile picture`}
                    width={400}
                    height={400}
                    className="object-cover rounded-full aspect-square w-28 group-hover:scale-105 transition-transform duration-300"
                />
            </div>

            <div>
                <h3 className={`${space_grotesk.className} text-center text-lg font-medium text-secondary-9 mb-1`}>
                    {host.name}
                </h3>
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
        </Link>
    )
}