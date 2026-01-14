"use client"

import { space_grotesk } from "@/lib/redux/fonts";
import { EventSearchFilters } from "./EventSearchFilter";
import InfiniteScrollImages from "./InfiniteScrollImages";
import { Icon } from "@iconify/react";
import MobileInfiniteScroll, { MobileInfiniteScrollRef } from "./MobileInfiniteScrollImages";
import { useRef } from "react";
import { slides_onlyImages } from "@/components-data/auth-pages/slides";

export default function HeroSection(){

    const mobileInfiniteScrollRef = useRef<MobileInfiniteScrollRef>(null)

    return (
        <section className="global-px md:pe-0! md:flex justify-between">
            <div className="md:w-[48%] pt-36 md:pt-44">
                <h1 className={`${space_grotesk.className} leading-12 text-primary-6 text-center text-[2.5rem] md:text-6xl lg:text-7xl md:leading-15 lg:leading-19 md:text-left font-medium`}>Discover <span className="text-secondary-9 md:block">Your Next</span> Experience</h1>
                <p className="text-neutral-8 text-center mt-4 md:text-left md:text-lg md:max-w-sm">From Concerts to travel, find and book tickets for everything you love</p>

                <button onClick={() => mobileInfiniteScrollRef.current?.scrollNext()} className="flex md:hidden mx-auto flex-col items-center justify-center text-neutral-7 mt-7">
                    <Icon icon="iconamoon:mouse-thin" width="32" height="32" />
                    <span className="text-xs">Tap to scroll</span>
                </button>

                <MobileInfiniteScroll className="md:hidden" images={slides_onlyImages} ref={mobileInfiniteScrollRef} />
                <EventSearchFilters />
            </div>

            <div className='hidden relative md:block w-[48%] bg-primary-1 pb-36 pt-44 md:pt-44'>
                <InfiniteScrollImages />
            </div>
        </section>
    )
}