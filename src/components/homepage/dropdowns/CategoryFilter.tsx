'use client'

import { useState, useEffect } from 'react'
import FilterButtonsActions1 from '@/components/custom-utils/buttons/event-search/FilterActionButtons1'
import { MobileBottomSheet } from '@/components/custom-utils/EventFilterDropdownMobileBottomSheet'
import CategoryItemBtn from '@/components/custom-utils/buttons/event-search/CategoryItemBtn'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import EventFilterTypeBtn from '@/components/custom-utils/buttons/event-search/EventFilterTypeBtn'
import { useMediaQuery } from '@/lib/custom-hooks/UseMediaQuery'
import { cn } from '@/lib/utils'

interface Category {
    value: string
    label: string
    count: number
}

interface CategoryFilterProps {
    value?: string[]
    filterFor?: string
    onChange: (value: string[]) => void
    categories?: Category[]
}

const defaultCategories: Category[] = [
    { value: 'all', label: 'All Events', count: 30 },
    { value: 'concerts', label: 'Concerts & Music', count: 30 },
    { value: 'sports', label: 'Sport & Fitness', count: 30 },
    { value: 'arts', label: 'Arts & Theater', count: 30 },
    { value: 'food', label: 'Food & Dining', count: 30 },
    { value: 'festivals', label: 'Festivals', count: 30 },
    { value: 'business', label: 'Business & Networking', count: 30 },
    { value: 'travel', label: 'Travel & Tours', count: 30 },
    { value: 'nightlife', label: 'Nightlife & Parties', count: 30 },
]

export default function CategoryFilter({
    value = [],
    onChange,
    filterFor = "homepage",
    categories = defaultCategories,
}: CategoryFilterProps) {

    
    const [isOpen, setIsOpen] = useState(false)
    const isTablet = useMediaQuery('(min-width: 768px)')
    
    const [selectedCategories, setSelectedCategories] = useState<string[]>(value)

    // Sync local state with parent value when dropdown opens
    useEffect(() => {
        if (isOpen) {
            setSelectedCategories(value)
        }
    }, [isOpen, value])

    const handleToggle = (categoryValue: string) => {
        if (categoryValue === 'all') {
            setSelectedCategories([])
            return
        }

        setSelectedCategories((prev) =>
            prev.includes(categoryValue)
                ? prev.filter((v) => v !== categoryValue)
                : [...prev, categoryValue]
        )
    }

    const handleApply = () => {
        onChange(selectedCategories)
        setIsOpen(false)
    }

    const handleClear = () => {
        setSelectedCategories([])
    }

    const hasActiveFilter = value.length > 0 // Use parent value for display
    const displayText = hasActiveFilter
        ? `${value.length} selected` // Use parent value
        : 'Event category'
    
    const triggerVariant = filterFor === "homepage" ? 'default' : 'compact'

    const categoryList = (
        <div className="space-y-1 max-h-[50vh] overflow-y-auto md:max-h-[unset]">
            {categories.map((category, index) => {
                const isSelected =
                    category.value === 'all'
                        ? selectedCategories.length === 0
                        : selectedCategories.includes(category.value)

                return (
                    <CategoryItemBtn
                        key={index}
                        category={category}
                        isSelected={isSelected}
                        handleToggle={handleToggle} // Only updates local state
                    />
                )
            })}
        </div>
    )

    return (
        <>
            {/* Mobile & Tablet - Bottom Sheet */}
            {!isTablet && (
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
                        title="Event Category"
                    >
                        {categoryList}
                        <FilterButtonsActions1 onApply={handleApply} onClear={handleClear} />
                    </MobileBottomSheet>
                </>
            )}

            {/* Tablet - Dropdown Menu */}
            {isTablet && (
                <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                    <DropdownMenuTrigger asChild>
                        <div>
                            <EventFilterTypeBtn 
                                displayText={displayText} 
                                hasActiveFilter={hasActiveFilter}
                                variant={triggerVariant}
                                onClick={() => setIsOpen(true)}
                            />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                        className={cn(
                            "w-full z-100! p-4 rounded-xl shadow-[0px_3.69px_14.76px_0px_rgba(51,38,174,0.08)]",
                            // Open animation
                            "data-[state=open]:animate-in",
                            "data-[state=open]:fade-in-0",
                            "data-[state=open]:duration-500 data-[state=open]:ease-[cubic-bezier(0.16,1,0.3,1)]",
                            "data-[state=open]:zoom-in-90",
                            "data-[state=open]:slide-in-from-top-4",
                            // Close animation
                            "data-[state=closed]:animate-out",
                            "data-[state=closed]:fade-out-0",
                            "data-[state=closed]:duration-400 data-[state=closed]:ease-in",
                            "data-[state=closed]:zoom-out-90",
                            "data-[state=closed]:slide-out-to-top-4"
                        )}
                        align="start"
                    >
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold text-gray-900">Category</h3>
                            {categoryList}
                            <FilterButtonsActions1 onApply={handleApply} onClear={handleClear} />
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </>
    )
}