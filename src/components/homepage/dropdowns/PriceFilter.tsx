'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Slider } from '@/components/ui/slider'
import { Icon } from '@iconify/react'
import FilterButtonsActions1 from '@/components/custom-utils/buttons/event-search/FilterActionButtons1'
import { MobileBottomSheet } from '@/components/custom-utils/EventFilterDropdownMobileBottomSheet'
import { QuickPriceButtons } from '@/components/custom-utils/buttons/event-search/QuickPriceButtons'
import { PriceRangeInputs } from '@/components/custom-utils/inputs/event-search/PriceRangeInputs'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import EventFilterTypeBtn from '@/components/custom-utils/buttons/event-search/EventFilterTypeBtn'
import { useMediaQuery } from '@/lib/custom-hooks/UseMediaQuery'

interface PriceRange {
    min: number
    max: number
}

interface PriceFilterProps {
    value?: PriceRange | null
    onChange: (value: PriceRange | null) => void
    currency?: string
    filterFor?: FilterFor
}

export default function PriceFilter({
    value,
    onChange,
    filterFor = "homepage",
    currency = '₦',
}: PriceFilterProps) {
    
    const [isOpen, setIsOpen] = useState(false)
    const isDesktop = useMediaQuery('(min-width: 1024px)')
    
    const defaultMax = 500000
    const [priceRange, setPriceRange] = useState<PriceRange>(
        value || { min: 0, max: 10000 }
    )

    const hasActiveFilter = value && (value.min > 0 || value.max < defaultMax)
    const displayText = hasActiveFilter
        ? `${currency}${value.min.toLocaleString()} - ${currency}${value.max.toLocaleString()}`
        : 'Price'

    const handleApply = () => {
        onChange(priceRange)
        setIsOpen(false)
    }

    const handleClear = () => {
        setPriceRange({ min: 0, max: 10000 })
        onChange(null)
    }

    const handleQuickPrice = (price: number) => {
        setPriceRange(price === 0 ? { min: 0, max: 0 } : { min: 0, max: price })
    }

    const handleSliderChange = (values: number[]) => {
        setPriceRange({ min: values[0], max: values[1] })
    }

    // Shared content
    const filterContent = (
        <>
            <QuickPriceButtons
                currency={currency}
                selectedMax={priceRange.max}
                onSelect={handleQuickPrice}
            />

            <div className="pt-4 pb-2">
                <Slider
                    min={0}
                    max={defaultMax}
                    step={1000}
                    value={[priceRange.min, priceRange.max]}
                    onValueChange={handleSliderChange}
                />
            </div>

            <PriceRangeInputs
                min={priceRange.min}
                max={priceRange.max}
                currency={currency}
                onMinChange={(v) => setPriceRange(prev => ({ ...prev, min: v }))}
                onMaxChange={(v) => setPriceRange(prev => ({ ...prev, max: v }))}
            />

            <FilterButtonsActions1 onApply={handleApply} onClear={handleClear} />
        </>
    )

    return (
        <>
            {/* Mobile & Tablet - Bottom Sheet */}
            {!isDesktop && (
                <>
                    {filterFor === "homepage" ? (
                        <EventFilterTypeBtn 
                            onClick={() => setIsOpen(true)}
                            displayText={displayText} 
                            hasActiveFilter={!!hasActiveFilter}
                            variant='default' 
                        />
                    ) : (
                        <EventFilterTypeBtn 
                            onClick={() => setIsOpen(true)}
                            displayText={displayText} 
                            hasActiveFilter={!!hasActiveFilter}
                            variant='compact' 
                        />
                    )}

                    <MobileBottomSheet
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                        title="Price"
                    >
                        {filterContent}
                    </MobileBottomSheet>
                </>
            )}

            {/* Desktop - Dialog */}
            {isDesktop && (
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        {filterFor === "homepage" ? (
                            <EventFilterTypeBtn
                                onClick={() => setIsOpen(true)}
                                displayText={displayText} 
                                hasActiveFilter={!!hasActiveFilter}
                                variant='default' 
                            />
                        ) : (
                            <EventFilterTypeBtn 
                                onClick={() => setIsOpen(true)}
                                displayText={displayText} 
                                hasActiveFilter={!!hasActiveFilter}
                                variant='compact' 
                            />
                        )}
                    </DialogTrigger>
                    <DialogContent className="max-w-125 rounded-2xl">
                        <DialogHeader>
                            <DialogTitle className="text-xl">Price</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-6">
                            {filterContent}
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </>
    )
}