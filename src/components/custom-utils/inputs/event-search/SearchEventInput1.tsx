'use client'

import { useState } from 'react'
import { Icon } from '@iconify/react'
import { cn } from '@/lib/utils' // assuming you have this utility

interface SearchInputProps {
  placeholder?: string
  className?: string
}

export default function SearchEventInput1({
  placeholder = 'Search event',
  className,
}: SearchInputProps) {

    const [isFocused, setIsFocused] = useState(false)

    return (
        <div className={cn('w-fit', className)}>
            <div
                className={cn(
                'relative flex items-center gap-2 px-4 py-3.5',
                'rounded-full border h-10 text-sm transition-all duration-200 bg-neutral-2',
                isFocused
                    ? 'border-primary-7 shadow-sm'
                    : 'border-neutral-5 hover:border-neutral-4',
                )}
            >
                <input
                    type="text"
                    placeholder={placeholder}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className={cn(
                        'flex-1 outline-none bg-transparent text-sm text-neutral-9',
                        'placeholder:text-neutral-6',
                    )}
                />

                {/* Search icon on the right */}
                <Icon
                    icon="lucide:search"
                    className={cn(
                        'size-6 shrink-0 transition-colors',
                        isFocused ? 'text-primary-6' : 'text-neutral-6',
                    )}
                />
            </div>
        </div>
    )
}