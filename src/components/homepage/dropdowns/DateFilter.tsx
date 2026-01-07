
'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Icon } from '@iconify/react'
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

interface DateFilterProps {
    value?: DateRange | null
    onChange: (value: DateRange | null) => void
}

export default function DateFilter({ value, onChange }: DateFilterProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [dateRange, setDateRange] = useState<DateRange>(
        value || { from: undefined, to: undefined }
    )

    const hasActiveFilter = value && (value.from || value.to)

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
                        icon="flowbite:calendar-outline"
                        width="30"
                        height="30"
                        className="text-neutral-8 size-6"
                    />
                </button>

                <MobileBottomSheet
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    title="Date"
                >
                    <QuickDateButtons
                        selectedRange={dateRange}
                        onSelect={handleQuickSelect}
                    />

                    <div className="pt-6">
                        <EventSearchDateRangePicker
                            value={dateRange}
                            onChange={setDateRange}
                        />
                    </div>

                    <FilterButtonsActions1
                        onApply={handleApply}
                        onClear={handleClear}
                    />
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
                                icon="flowbite:calendar-outline"
                                width="30"
                                height="30"
                                className="text-neutral-8 size-6 shrink-0"
                            />
                        </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-150 rounded-2xl">
                        <DialogHeader>
                            <DialogTitle className="text-xl">Date</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-6">
                            <QuickDateButtons
                                selectedRange={dateRange}
                                onSelect={handleQuickSelect}
                            />

                            <EventSearchDateRangePicker
                                value={dateRange}
                                onChange={setDateRange}
                            />

                            <FilterButtonsActions1
                                onApply={handleApply}
                                onClear={handleClear}
                            />
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    )
}