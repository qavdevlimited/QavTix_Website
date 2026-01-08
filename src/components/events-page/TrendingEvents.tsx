'use client'

import * as React from 'react'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DateRange } from 'react-day-picker'
import { Country, State } from 'country-state-city'
import DateFilter from '../homepage/dropdowns/DateFilter'
import LocationFilter from '../homepage/dropdowns/LocationFilter'
import CategoryFilter from '../homepage/dropdowns/CategoryFilter'
import PriceFilter from '../homepage/dropdowns/PriceFilter'
import { space_grotesk } from '@/lib/redux/fonts'
import EventsCard1 from '../custom-utils/cards/EventCards'
import { eventsMock } from '@/components-data/demo-data'


export function TrendingEvents() {
    const [filters, setFilters] = React.useState<FilterValues>({
        categories: [],
        priceRange: null
    })

    const handleSearch = () => {
        console.log('Search with filters:', filters)
    }

    const countries = Country.getAllCountries().map(c => ({
        value: c.isoCode,
        label: c.name
    }))

    const getStates = (countryCode: string) => 
        State.getStatesOfCountry(countryCode).map(s => ({
            value: s.isoCode,
            label: s.name
        }
    ))

    return (
        <section className="w-full py-8 mt-12 md:mt-20 global-px">
            <div className='flex gap-4 mb-8'>
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

                    <button className='text-sm font-medium text-primary-6 hover:underline'>View All</button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 mt-10 justify-items-center">
                    {eventsMock.map((event) => (
                        <EventsCard1 
                            key={event.href}
                            {...event} 
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}