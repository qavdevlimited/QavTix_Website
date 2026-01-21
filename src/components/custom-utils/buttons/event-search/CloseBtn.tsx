import { Icon } from "@iconify/react";

export default function CloseBtn({ action }:{ action: () => void }){
    return (
        <button
            onClick={action}
            aria-label="Close"
        >
            <Icon
                icon="grommet-icons:close"
                width="22"
                height="22"
                className="text-[#1E1E1E] hover:text-red-700"
            />
        </button>
    )
}