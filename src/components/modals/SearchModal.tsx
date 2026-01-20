import { Dispatch, SetStateAction } from "react";
import { AnimatedDialog } from "../custom-utils/AnimatedDialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Icon } from "@iconify/react";

interface SearchModalProps {
    openSearchModal: boolean
    setOpenSearchModal: Dispatch<SetStateAction<boolean>>
    searchValue: string
    setSearchValue: Dispatch<SetStateAction<string>>
}

export default function SearchModal({ 
    openSearchModal, 
    setOpenSearchModal,
    searchValue,
    setSearchValue
}: SearchModalProps) {
    return (
        <AnimatedDialog position="top" title="Search" open={openSearchModal} onOpenChange={(v) => setOpenSearchModal(v)}>
            <div className="w-full mt-10">
                <div className="relative group">
                    <Icon 
                        icon="hugeicons:search-01" 
                        className="absolute left-5 top-1/2 -translate-y-1/2 size-5 text-neutral-6 group-focus-within:text-primary transition-colors duration-200" 
                    />
                    <input
                        type="text"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="Search events, categories, or organizers..."
                        autoFocus
                        className="
                            w-full h-16 pl-14 pr-5 
                            text-sm text-secondary-9 placeholder:text-neutral-6
                            bg-neutral-2 
                            border-2 border-neutral-3
                            rounded-2xl
                            outline-none
                            transition-all duration-300 ease-out
                            hover:bg-neutral-1 hover:border-neutral-4
                            focus:bg-white focus:border-accent-7 focus:shadow-lg focus:shadow-primary/10
                            focus:scale-[1.01]
                        "
                    />
                </div>
            </div>
        </AnimatedDialog>
    )
}