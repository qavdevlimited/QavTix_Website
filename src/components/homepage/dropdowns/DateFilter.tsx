'use client'

import { useState } from 'react'
import { MobileBottomSheet } from '@/components/custom-utils/EventFilterDropdownMobileBottomSheet'
import FilterButtonsActions1 from '@/components/custom-utils/buttons/event-search/FilterActionButtons1'
import { QuickDateButtons } from '@/components/custom-utils/buttons/event-search/QuickDateButtons'
import { EventSearchDateRangePicker } from '@/components/custom-utils/inputs/event-search/EventSearchDateRangePicker'
import { formatDate } from '@/helper-fns/date-utils'
import { DateRange } from 'react-day-picker'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import EventFilterTypeBtn from '@/components/custom-utils/buttons/event-search/EventFilterTypeBtn'
import { useMediaQuery } from '@/lib/custom-hooks/UseMediaQuery'
import { AnimatedDialog } from '@/components/custom-utils/AnimatedDialog'

interface DateFilterProps {
    value?: DateRange | null
    onChange: (value: DateRange | null) => void,
    filterFor?: "homepage" | "eventPage"
}

export default function DateFilter({ value, onChange, filterFor = "homepage" }: DateFilterProps) {

    
    const [isOpen, setIsOpen] = useState(false)
    const isDesktop = useMediaQuery('(min-width: 1024px)')
    
    const [dateRange, setDateRange] = useState<DateRange>(
        value || { from: undefined, to: undefined }
    )

    const hasActiveFilter = value && (value?.from || value?.to)

    const displayText = (() => {
        if (!hasActiveFilter) return 'Date'
        if (value?.from && value?.to) {
            return `${formatDate(value.from, 'MMM dd')} - ${formatDate(value.to, 'MMM dd')}`
        }
        if (value?.from) {
            return formatDate(value.from, 'MMM dd, yyyy')
        }
        return 'Date'
    })()

    const handleApply = () => {
        onChange(dateRange.from || dateRange.to ? dateRange : null)
        setIsOpen(false)
    }

    const handleClear = () => {
        setDateRange({ from: undefined, to: undefined })
        onChange(null)
    }

    const handleQuickSelect = (range: DateRange) => {
        setDateRange(range)
    }

    const triggerVariant = filterFor === "homepage" ? 'default' : 'compact'

    const filterContent = (
        <>
            <QuickDateButtons
                selectedRange={dateRange}
                onSelect={handleQuickSelect}
            />

            <EventSearchDateRangePicker
                value={dateRange}
                onChange={setDateRange}
            />
        </>
    )

    return (
        <>
            {/* Mobile & Tablet - Bottom Sheet */}
            {!isDesktop && (
                <>
                    <EventFilterTypeBtn 
                        onClick={() => setIsOpen(true)}
                        displayText={displayText} 
                        hasActiveFilter={!!hasActiveFilter}
                        variant={triggerVariant}
                    />

                    <MobileBottomSheet
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                        title="Date"
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
                    title='Date'
                    onOpenChange={setIsOpen}
                    open={isOpen}
                    trigger={
                        <EventFilterTypeBtn
                            onClick={() => setIsOpen(true)}
                            displayText={displayText} 
                            hasActiveFilter={!!hasActiveFilter}
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