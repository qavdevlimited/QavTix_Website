import { Icon } from "@iconify/react"

interface PaginationControlsProps {
  startIndex: number
  endIndex: number
  totalItems: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  onNextPage: () => void
  onPreviousPage: () => void
  className?: string
}

export default function PaginationControls({
  startIndex,
  endIndex,
  totalItems,
  hasNextPage,
  hasPreviousPage,
  onNextPage,
  onPreviousPage,
  className = ''
}: PaginationControlsProps) {
    return (
        <div className={`flex items-center w-full justify-center gap-3 ${className}`}>
            <button
                onClick={onPreviousPage}
                disabled={!hasPreviousPage}
                className="w-10 h-10 rounded-lg bg-secondary-6 hover:bg-secondary-5 disabled:bg-neutral-4 disabled:text-secondary-4 disabled:cursor-not-allowed text-white flex items-center justify-center transition-colors"
                aria-label="Previous page"
            >
                <Icon icon="f7:chevron-left" width="24" height="24" />
            </button>

            <span className="text-sm font-medium text-neutral-8 min-w-20 text-center">
                {startIndex} - {endIndex} of {totalItems}
            </span>

            <button
                onClick={onNextPage}
                disabled={!hasNextPage}
                className="w-10 h-10 rounded-lg bg-secondary-6 hover:bg-secondary-5 disabled:bg-neutral-4 disabled:text-secondary-4 disabled:cursor-not-allowed text-white flex items-center justify-center transition-colors"
                aria-label="Next page"
            >
                <Icon icon="f7:chevron-right" width="24" height="24" />
            </button>
        </div>
    )
}