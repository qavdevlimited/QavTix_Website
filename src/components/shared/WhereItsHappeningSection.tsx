'use client'

import { space_grotesk } from "@/lib/redux/fonts"
import { motion, useInView } from "framer-motion"
import { Icon } from "@iconify/react"
import Link from "next/link"
import { useRef } from "react"
import { nigeriaStates } from "@/components-data/location"

interface LocationLink {
  cityOrState: string
  country?: string
  slug: string
}


const midIndex = Math.floor(nigeriaStates.length / 2)

const topRowLocations: LocationLink[] = nigeriaStates
  .slice(0, midIndex)
  .map((state) => ({
    cityOrState: state,
    slug: state.toLowerCase().replace(/\s+/g, "-"),
    country: "NG",
  }))

const bottomRowLocations: LocationLink[] = nigeriaStates
  .slice(midIndex)
  .map((state) => ({
    cityOrState: state,
    slug: state.toLowerCase().replace(/\s+/g, "-"),
    country: "NG",
  }))


function InfiniteScrollRow({
  locations,
  direction = "left",
  duration = 40,
}: {
  locations: LocationLink[]
  direction?: "left" | "right"
  duration?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { margin: "-100px" })

  const duplicatedLocations = [...locations, ...locations]

  const distance = 1200

  return (
    <div ref={ref} className="relative overflow-hidden py-4">
      <motion.div
        className="flex gap-3 will-change-transform"
        animate={
          isInView
            ? {
                x:
                  direction === "left"
                    ? [0, -distance]
                    : [-distance, 0],
              }
            : { x: 0 }
        }
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {duplicatedLocations.map((location, index) => (
          <Link
            key={`${location.slug}-${index}`}
            href={`/events/${location.slug}`}
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-secondary-6 bg-white hover:bg-primary-1 hover:border-secondary-8 transition-colors whitespace-nowrap shrink-0"
          >
            <span className="text-sm text-secondary-8 font-medium">
              Events in {location.cityOrState}
            </span>

            <span className="">
              <Icon
                icon="lucide:arrow-up-right"
                width="16"
                height="16"
                className="text-secondary-9"
              />
            </span>
          </Link>
        ))}
      </motion.div>
    </div>
  )
}


export default function WhereItsHappeningSection() {
  return (
    <section className="w-full bg-neutral-1/30 py-16">
      <div className="mb-8 global-px">
        <h2
          className={`text-2xl sm:text-3xl  md:text-[2rem] font-bold text-secondary-9 ${space_grotesk.className}`}
        >
          Where it’s happening
        </h2>
      </div>

      <div className="">
        <InfiniteScrollRow
          locations={topRowLocations}
          direction="left"
          duration={40}
        />
        <InfiniteScrollRow
          locations={bottomRowLocations}
          direction="right"
          duration={40}
        />
      </div>
    </section>
  )
}
