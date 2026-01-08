'use client'

import { useState } from 'react'
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

interface LocationFilterProps {
    value?: { country: string; state: string } | null
    filterFor?: FilterFor
    onChange: (value: { country: string; state: string } | null) => void
    countries: { value: string; label: string }[]
    getStates: (countryCode: string) => { value: string; label: string }[]
}

export default function LocationFilter({
    value,
    onChange,
    countries,
    filterFor,
    getStates
}: LocationFilterProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [location, setLocation] = useState({
        country: value?.country || '',
        state: value?.state || ''
    })

    const countryCode = location.country
    ? resolveCountryCode(location.country)
    : null;

    const states = countryCode
    ? getStates(countryCode)
    : [];
    
    const hasActiveFilter = value && (value.country || value.state)
    
    const getDisplayText = () => {
        if (!value?.country && !value?.state) return 'Location'
        
        const countryName = countries.find(c => c.value === value.country)?.label
        const stateName = states.find(s => s.label.toLowerCase() === value.state.toLowerCase())?.label
                
        if (countryName && stateName) {
            return `${stateName}, ${countryName}`
        }
        return countryName || stateName || 'Location'
    }

    const handleApply = () => {
        onChange(location.country ? location : null)
        setIsOpen(false)
    }

    const handleClear = () => {
        setLocation({ country: '', state: '' })
        onChange(null)
    }

    return (
        <>
            {/* Mobile & Tablet - Bottom Sheet */}
            <div className="lg:hidden relative">
                {
                    filterFor === "homepage" ?
                    <EventFilterTypeBtn
                        onClick={() => setIsOpen(true)}
                        displayText={getDisplayText()} 
                        hasActiveFilter={!!hasActiveFilter}
                        variant='default' 
                    />
                    :
                    <EventFilterTypeBtn 
                        onClick={() => setIsOpen(true)}
                        displayText={getDisplayText()} 
                        hasActiveFilter={!!hasActiveFilter}
                        variant='compact' 
                    />
                }

                <MobileBottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)} title="Location">
                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-neutral-8 mb-2">
                                Country
                            </label>
                            <LocationFilterSelect
                                value={location.country}
                                onValueChange={(value) => {
                                    setLocation({ country: value, state: '' })
                                }}
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
                                onValueChange={(value) => {
                                    setLocation(prev => ({ ...prev, state: value }))
                                }}
                                options={states}
                                placeholder="Select state"
                                disabled={!location.country}
                            />
                        </div>
                    </div>

                    <FilterButtonsActions1 onApply={handleApply} onClear={handleClear} />
                </MobileBottomSheet>
            </div>

            {/* Desktop - Dialog */}
            <div className="hidden lg:block">
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        {
                            filterFor === "homepage" ?
                            <EventFilterTypeBtn 
                                onClick={() => setIsOpen(true)}
                                displayText={getDisplayText()} 
                                hasActiveFilter={!!hasActiveFilter}
                                variant='default' 
                            />
                            :
                            <EventFilterTypeBtn 
                                onClick={() => setIsOpen(true)}
                                displayText={getDisplayText()} 
                                hasActiveFilter={!!hasActiveFilter}
                                variant='compact' 
                            />
                        }
                    </DialogTrigger>
                    <DialogContent className="max-w-125 rounded-2xl">
                        <DialogHeader>
                            <DialogTitle className="text-xl">Location</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-6">
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-8 mb-2">
                                        Country
                                    </label>
                                    <LocationFilterSelect
                                        value={location.country}
                                        onValueChange={(value) => {
                                            setLocation({ country: value, state: '' })
                                        }}
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
                                        onValueChange={(value) => {
                                            setLocation(prev => ({ ...prev, state: value }))
                                        }}
                                        options={states}
                                        placeholder="Select state"
                                        disabled={!location.country}
                                    />
                                </div>
                            </div>

                            <FilterButtonsActions1 onApply={handleApply} onClear={handleClear} />
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    )
}
