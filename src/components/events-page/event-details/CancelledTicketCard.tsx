import { NAV_LINKS } from "@/components-data/navigation/navLinks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAvatarColor } from "@/helper-fns/getAvatarColor";
import { getInitialsFromName } from "@/helper-fns/getInitialFromName";
import { space_grotesk } from "@/lib/redux/fonts";
import Link from "next/link";

export default function CancelledTicketCard(){
    return (
        <div className="w-full md:w-[36%] bg-secondary-1 flex flex-col gap-5 justify-between rounded-3xl p-5 min-h-40">
            <Avatar className="ring-2 ring-background size-14">
                <AvatarImage src="/images/demo-images/host-img.png" />
                <AvatarFallback className={`${getAvatarColor("Jennifer")}`}>{getInitialsFromName("Jennifer")}</AvatarFallback>
            </Avatar>
            
            <h3 className={`${space_grotesk.className} text-xl`}>
                Ticket canceled
            </h3>
            
            <p>
                Hope to catch you at a future event. You can always get  if you change your mind. 
            </p>
            <Link href={NAV_LINKS.EVENTS_GET_TICKETS_CHECKOUT.href.replace("[event_id]","123")} className='flex items-center gap-1 font-medium text-primary-6'>
                ticket again
            </Link>
        </div>
    )
}