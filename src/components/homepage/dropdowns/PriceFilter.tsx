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

interface PriceRange {
    min: number
    max: number
}

interface PriceFilterProps {
    value?: PriceRange | null
    onChange: (value: PriceRange | null) => void
    currency?: string
}

export default function PriceFilter({
    value,
    onChange,
    currency = '₦',
}: PriceFilterProps) {
    const [isOpen, setIsOpen] = useState(false)
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

    return (
        <>
            {/* Mobile & Tablet - Bottom Sheet */}
            <div className="lg:hidden relative w-full">
                <button
                    onClick={() => setIsOpen(true)}
                    className={cn(
                        'w-full flex items-center justify-between text-left text-sm rounded-xl font-normal h-14 px-4 bg-accent-1 hover:bg-accent-2/60 border border-transparent transition-colors',
                        hasActiveFilter ? 'text-neutral-8' : 'text-neutral-7'
                    )}
                >
                    <span className="truncate">{displayText}</span>
                    <Icon
                        icon="flowbite:chevron-down-outline"
                        width="30"
                        height="30"
                        className={cn('text-neutral-8 size-6 transition-transform duration-200', isOpen && 'rotate-180')}
                    />
                </button>

                <MobileBottomSheet
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    title="Price"
                >
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
                </MobileBottomSheet>
            </div>

            {/* Desktop - Dialog */}
            <div className="hidden lg:block">
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <button
                            className={cn(
                                'w-full flex items-center justify-between text-left text-sm rounded-xl font-normal h-14 px-4 bg-accent-1 hover:bg-accent-2/60 border border-transparent transition-colors',
                                hasActiveFilter ? 'text-neutral-8' : 'text-neutral-7'
                            )}
                        >
                            <span className="truncate">{displayText}</span>
                            <Icon
                                icon="flowbite:chevron-down-outline"
                                width="30"
                                height="30"
                                className={cn('text-neutral-8 size-6 transition-transform duration-200', isOpen && 'rotate-180')}
                            />
                        </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-125 rounded-2xl">
                        <DialogHeader>
                            <DialogTitle className="text-xl">Price</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-6">
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
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    )
}