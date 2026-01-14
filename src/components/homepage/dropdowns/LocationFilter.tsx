'use client'

import { useState, useMemo, useCallback } from 'react'
import { MobileBottomSheet } from '@/components/custom-utils/EventFilterDropdownMobileBottomSheet'
import FilterButtonsActions1 from '@/components/custom-utils/buttons/event-search/FilterActionButtons1'
import { LocationFilterSelect } from '@/components/custom-utils/inputs/event-search/LocationFilterSelect'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import EventFilterTypeBtn from '@/components/custom-utils/buttons/event-search/EventFilterTypeBtn'
import { resolveCountryCode } from '@/helper-fns/resolveCountryCode'
import { useMediaQuery } from '@/lib/custom-hooks/UseMediaQuery'
import { AnimatedDialog } from '@/components/custom-utils/AnimatedDialog'

interface LocationFilterProps {
    value?: { country: string; state: string } | null
    filterFor?: 'homepage' | 'eventPage'
    onChange: (value: { country: string; state: string } | null) => void
    countries: { value: string; label: string }[]
    getStates: (countryCode: string) => { value: string; label: string }[]
}

export default function LocationFilter({
    value,
    onChange,
    countries,
    filterFor = 'homepage',
    getStates
}: LocationFilterProps) {


    const [isOpen, setIsOpen] = useState(false)
    const isDesktop = useMediaQuery('(min-width: 1024px)')
    
    const [location, setLocation] = useState(() => ({
        country: value?.country || '',
        state: value?.state || ''
    }))

    const states = useMemo(() => {
        if (!location.country) return []
        const countryCode = resolveCountryCode(location.country)
        return countryCode ? getStates(countryCode) : []
    }, [location.country, getStates])

    const displayText = useMemo(() => {
        if (!value?.country && !value?.state) return 'Location'

        const countryName = countries.find(c => c.value === value.country)?.label
        const stateName = states.find(s => s.label.toLowerCase() === value.state.toLowerCase())?.label

        return countryName && stateName
            ? `${stateName}, ${countryName}`
            : countryName || stateName || 'Location'
    }, [value, countries, states])

    const hasActiveFilter = !!value?.country || !!value?.state

    const handleApply = useCallback(() => {
        onChange(location.country ? location : null)
        setIsOpen(false)
    }, [onChange, location])

    const handleClear = useCallback(() => {
        setLocation({ country: '', state: '' })
        onChange(null)
    }, [onChange])

    const handleCountryChange = useCallback((country: string) => {
        setLocation({ country, state: '' })
    }, [])

    const handleStateChange = useCallback((state: string) => {
        setLocation(prev => ({ ...prev, state }))
    }, [])

    const triggerVariant = filterFor === "homepage" ? 'default' : 'compact'

    const filterContent = (
        <div className="space-y-5">
            <div>
                <label className="block text-sm font-medium text-neutral-8 mb-2">
                    Country
                </label>
                <LocationFilterSelect
                    value={location.country}
                    onValueChange={handleCountryChange}
                    options={countries}
                    placeholder="Select country"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-neutral-8 mb-2">
                    State / Region
                </label>
                <LocationFilterSelect
                    value={location.state}
                    onValueChange={handleStateChange}
                    options={states}
                    placeholder="Select state"
                    disabled={!location.country}
                />
            </div>
        </div>
    )

    return (
        <>
            {/* Mobile & Tablet - Bottom Sheet */}
            {!isDesktop && (
                <>
                    <EventFilterTypeBtn
                        onClick={() => setIsOpen(true)}
                        displayText={displayText}
                        hasActiveFilter={hasActiveFilter}
                        variant={triggerVariant}
                    />

                    <MobileBottomSheet
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                        title="Location"
                    >
                        {filterContent}
                        <FilterButtonsActions1
                            onApply={handleApply}
                            onClear={handleClear}
                        />
                    </MobileBottomSheet>
                </>
            )}

            {/* Desktop - Dialog */}
            {isDesktop && (
                <AnimatedDialog 
                    onOpenChange={setIsOpen}
                    open={isOpen}
                    className=''
                    title='Location'
                    trigger={
                        <EventFilterTypeBtn
                            onClick={() => setIsOpen(true)}
                            displayText={displayText}
                            hasActiveFilter={hasActiveFilter}
                            variant={triggerVariant}
                        />
                    }
                    >
                    <div className="space-y-6">
                        {filterContent}
                        <FilterButtonsActions1
                            onApply={handleApply}
                            onClear={handleClear}
                        />
                    </div>
                </AnimatedDialog>
            )}
        </>
    )
}