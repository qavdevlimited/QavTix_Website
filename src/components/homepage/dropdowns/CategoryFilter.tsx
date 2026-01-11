'use client'

import { useState } from 'react'
import FilterButtonsActions1 from '@/components/custom-utils/buttons/event-search/FilterActionButtons1'
import { MobileBottomSheet } from '@/components/custom-utils/EventFilterDropdownMobileBottomSheet'
import CategoryItemBtn from '@/components/custom-utils/buttons/event-search/CategoryItemBtn'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import EventFilterTypeBtn from '@/components/custom-utils/buttons/event-search/EventFilterTypeBtn'
import { useMediaQuery } from '@/lib/custom-hooks/UseMediaQuery'

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
    const isDesktop = useMediaQuery('(min-width: 1024px)')
    
    const [selectedCategories, setSelectedCategories] = useState<string[]>(value)

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
        onChange([])
    }

    const hasActiveFilter = selectedCategories.length > 0
    const displayText = hasActiveFilter
        ? `${selectedCategories.length} selected`
        : 'Event category'
    
    const triggerVariant = filterFor === "homepage" ? 'default' : 'compact'

    const categoryList = (
        <div className="space-y-2 max-h-[50vh] overflow-y-auto">
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
                        handleToggle={handleToggle}
                    />
                )
            })}
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
                        title="Event Category"
                    >
                        {categoryList}
                        <FilterButtonsActions1 onApply={handleApply} onClear={handleClear} />
                    </MobileBottomSheet>
                </>
            )}

            {/* Desktop - Dialog */}
            {isDesktop && (
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <EventFilterTypeBtn 
                            onClick={() => setIsOpen(true)}
                            displayText={displayText} 
                            hasActiveFilter={hasActiveFilter}
                            variant={triggerVariant}
                        />
                    </DialogTrigger>
                    <DialogContent className="max-w-125 rounded-2xl">
                        <DialogHeader>
                            <DialogTitle className="text-xl">Event Category</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-6">
                            {categoryList}
                            <FilterButtonsActions1 onApply={handleApply} onClear={handleClear} />
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </>
    )
}