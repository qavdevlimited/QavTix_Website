'use client'

import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DateRange } from 'react-day-picker'
import { Country, State } from 'country-state-city'
import LocationFilterDropdown from './dropdowns/LocationFilter'
import DateFilter from './dropdowns/DateFilter'
import CategoryFilter from './dropdowns/CategoryFilter'
import PriceFilter from './dropdowns/PriceFilter'
import { useState } from 'react'


export function EventSearchFilters() {
    const [filters, setFilters] = useState<FilterValues>({
        categories: [],
        priceRange: null,
        dateRange: null
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
        <div className="w-full py-8 md:mt-12">
            <div>
                <div className="space-y-4">
                    {/* First Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DateFilter
                            value={filters.dateRange || { from: new Date(), to: new Date() }}
                            onChange={(v) => setFilters({...filters, dateRange: v || { from: new Date(), to: new Date()} as DateRange})}
                        />
                        <LocationFilterDropdown
                            value={filters.location}
                            onChange={(location) => setFilters({ ...filters, location })} 
                            countries={countries}
                            getStates={getStates}
                        />
                    </div>

                    {/* Second Row */}
                    <div className="grid grid-cols-2 gap-4">
                        <CategoryFilter
                            value={filters.categories}
                            onChange={(categories) => setFilters({ ...filters, categories })}
                        />
                        <PriceFilter
                            value={filters.priceRange}
                            onChange={(priceRange) => setFilters({ ...filters, priceRange })}
                        />
                    </div>
                </div>


                {/* Search Button */}
                <Button
                    onClick={handleSearch}
                    className="w-44 bg-primary hover:bg-primary-7 h-14 mt-5 md:mt-10 px-8 rounded-full"
                >
                    <Search className="mr-2 h-5 w-5" />
                    Search event
                </Button>
            </div>
        </div>
    )
}