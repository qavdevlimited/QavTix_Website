import { cn } from "@/lib/utils";

export default function FollowHostBtn1({ className }:{ className?: string }){
    return (
        <button className={cn(
            className,
            "p-3 rounded-3xl bg-secondary-6 text-white font-medium text-sm w-36",
            "hover:bg-secondary-7 hover:shadow-md hover:opacity-95"
        )}
        >Follow</button>
    )
}