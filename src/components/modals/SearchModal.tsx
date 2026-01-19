import { Dispatch, SetStateAction } from "react";
import { AnimatedDialog } from "../custom-utils/AnimatedDialog";
import SearchEventInput1 from "../custom-utils/inputs/event-search/SearchInput1";
import { DialogTitle } from "@radix-ui/react-dialog";

export default function SearchModal({ openSearchModal, setOpenSearchModal }:{ openSearchModal: boolean, setOpenSearchModal: Dispatch<SetStateAction<boolean>> }){
    return (
        <AnimatedDialog position="top" open={openSearchModal} onOpenChange={(v) => setOpenSearchModal(v)}>
            <DialogTitle className="sr-only">Search</DialogTitle>
            <div className="">
                <SearchEventInput1 />
            </div>
        </AnimatedDialog>
    )
}