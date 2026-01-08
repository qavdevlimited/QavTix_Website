'use client'

import { DateRange } from 'react-day-picker'
import DateFilter from '../homepage/dropdowns/DateFilter'
import LocationFilter from '../homepage/dropdowns/LocationFilter'
import CategoryFilter from '../homepage/dropdowns/CategoryFilter'
import PriceFilter from '../homepage/dropdowns/PriceFilter'
import { space_grotesk } from '@/lib/redux/fonts'
import EventsCard1 from '../custom-utils/cards/EventCards'
import { eventsMock } from '@/components-data/demo-data'
import { useState } from 'react'
import { countries, getStates } from '@/components-data/location'
import { usePagination } from '@/lib/custom-hooks/PaginationHook'
import PaginationControls from '../custom-utils/buttons/event-search/PaginationControl'


export function TrendingEvents({ className }:{ className?: string }) {

    const [showAll,setShowAll] = useState(false)
    const pagination = usePagination(eventsMock, showAll ? 12 : 8)
    
    const [filters, setFilters] = useState<FilterValues>({
        categories: [],
        priceRange: null
    })

    const handleSearch = () => {
        console.log('Search with filters:', filters)
    }

    return (
        <section className={`w-full py-8 global-px ${className}`}>
            <div className='flex flex-wrap gap-4 mb-8'>
                <CategoryFilter
                    filterFor='eventPage'
                    value={filters.categories}
                    onChange={(categories) => setFilters({ ...filters, categories })}
                />
                <LocationFilter
                    filterFor='eventPage'
                    value={filters.location}
                    onChange={(location) => setFilters({ ...filters, location })} 
                    countries={countries}
                    getStates={getStates}
                />
                <PriceFilter
                    filterFor='eventPage'
                    value={filters.priceRange}
                    onChange={(priceRange) => setFilters({ ...filters, priceRange })}
                />
                <DateFilter
                    filterFor='eventPage'
                    value={filters.dateRange}
                    onChange={(v) => setFilters({...filters, dateRange: v || { from: new Date(), to: new Date()} as DateRange})}
                />
            </div>


            <div>
                <div className="flex items-center justify-between gap-8">
                    <h2 className={`text-2xl sm:text-3xl  md:text-[2rem] font-bold text-secondary-9 ${space_grotesk.className}`}>
                        Trending events
                    </h2>

                    {
                        !showAll &&
                        <button onClick={() => setShowAll(true)} className='text-sm font-medium text-primary-6 hover:underline'>View All</button>
                    }
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 mt-10 justify-items-center">
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