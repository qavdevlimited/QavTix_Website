import React from "react";
import { Icon } from "@iconify/react";

type CarouselActionBtnsProps = {
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  className?: string;
}

const CarouselActionBtns: React.FC<CarouselActionBtnsProps> = ({
  scrollPrev,
  scrollNext,
  canScrollPrev,
  canScrollNext,
  className = "",
}) => {
    return (
        <div className={`flex gap-3 ${className}`}>
            <button
                onClick={scrollPrev}
                disabled={!canScrollPrev}
                className="w-10 h-10 rounded-full border border-secondary-6 flex items-center justify-center hover:bg-neutral-2 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Previous slide"
                type="button"
            >
                <Icon
                icon="si:chevron-left-line"
                width="24"
                height="24"
                className="text-secondary-6"
                />
            </button>

            <button
                onClick={scrollNext}
                disabled={!canScrollNext}
                className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:bg-primary-7 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md"
                aria-label="Next slide"
                type="button"
            >
                <Icon
                icon="si:chevron-right-line"
                width="24"
                height="24"
                className="text-white"
                />
            </button>
        </div>
    )
}

export default CarouselActionBtns;
