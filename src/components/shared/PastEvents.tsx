'use client'


import { space_grotesk } from '@/lib/redux/fonts'
import EventsCard1 from '../custom-utils/cards/EventCards'
import { useState } from 'react'
import { usePagination } from '@/lib/custom-hooks/PaginationHook'
import PaginationControls from '../custom-utils/buttons/event-search/PaginationControl'


export function PastEvents({ pastEventsData }:{ pastEventsData: IEvent[] }) {

    const [showAll,setShowAll] = useState(false)
    const pagination = usePagination(pastEventsData, showAll ? 12 : 8)
    
    return (
        <section className="w-full py-8">
            <div>
                <div className="flex items-center justify-between gap-8">
                    <h2
                        className={`${space_grotesk.className} text-2xl sm:text-3xl md:text-[2rem] font-medium text-secondary-9`}
                    >
                        Past events
                    </h2>

                    {
                        !showAll &&
                        <button onClick={() => setShowAll(true)} className='text-sm font-medium text-primary-6 hover:underline'>View All</button>
                    }
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 mt-10 justify-items-center md:justify-items-start">
                    {pagination.currentItems.map((event) => (
                        <EventsCard1 
                            key={event.href}
                            {...event} 
                        />
                    ))}
                </div>
            </div>


            {/* Pagination Controls */}
            {showAll && pagination.totalPages > 1 && (
                <div className="mt-16">
                    <PaginationControls
                        startIndex={pagination.startIndex}
                        endIndex={pagination.endIndex}
                        totalItems={pagination.totalItems}
                        hasNextPage={pagination.hasNextPage}
                        hasPreviousPage={pagination.hasPreviousPage}
                        onNextPage={pagination.nextPage}
                        onPreviousPage={pagination.previousPage}
                    />
                </div>
            )}
        </section>
    )
}