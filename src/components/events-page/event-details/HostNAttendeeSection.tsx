import { mockAttendees } from "@/components-data/demo-data";
import { EVENT_ROUTES, NAV_LINKS } from "@/components-data/navigation/navLinks";
import FollowHostBtn1 from "@/components/custom-utils/buttons/FollowHostBtn1";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getAvatarColor } from "@/helper-fns/getAvatarColor";
import { getInitialsFromName } from "@/helper-fns/getInitialFromName";
import { space_grotesk } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useParams } from "next/navigation";

const HostNAttendeeDetailsSection = ({ className }:{ className?: string }) => {

    const { event_id } = useParams()

    return (
        <div className={cn(
            className
        )}>
            <div className={cn(
                "flex flex-wrap justify-between items-center gap-4",
                "md:justify-start md:gap-6"
            )}
                >
                <div className="flex items-center gap-2">
                    <Avatar className="ring-2 ring-background size-12">
                        <AvatarImage src="/images/demo-images/host-img.png" />
                    </Avatar>

                    <div>
                        <p className="text-xs text-neutral-7">Hosted by</p>
                        <Link 
                            className="flex items-center text-secondary-9 text-sm"
                            href={NAV_LINKS.HOST_PROFILE.href.replace('[host_id]', "3636273")}
                            >
                            <strong className="font-normal whitespace-nowrap">Qavdev Limited</strong>
                            <Icon icon="line-md:chevron-right" width="20" height="20" />
                        </Link>
                    </div>
                </div>
                <FollowHostBtn1 
                    className={cn(
                        "w-auto! px-4 bg-secondary-6!",
                        "md:px-6"
                    )}
                />
            </div>
            <h3 className={cn(
                space_grotesk.className,
                "text-secondary-9 font-medium mt-8 mb-4"
            )}>
                Attendees
            </h3>

            <Link
                href={`${EVENT_ROUTES.EVENTS_DETAILS.href.replace("[event_id]", String(event_id))}/attendees`}
                aria-label="View event attendees"
                className="inline-flex focus:outline-none"
                >
                <div className="flex -space-x-2">
                    {mockAttendees.slice(0, 4).map((user) => (
                    <Avatar
                        key={user.id}
                        className="ring-2 ring-background size-9"
                    >
                        {user.profile_img ? (
                        <AvatarImage src={user.profile_img} alt={user.name} />
                        ) : null}

                        <AvatarFallback
                        className={`${getAvatarColor(user.id.toString())} text-white font-medium`}
                        >
                        {getInitialsFromName(user.name)}
                        </AvatarFallback>
                    </Avatar>
                    ))}

                    {mockAttendees.length > 4 && (
                    <Avatar className="ring-1 size-9 ring-background">
                        <AvatarFallback className="bg-primary-1 font-medium text-secondary-7">
                        +{mockAttendees.length - 4}
                        </AvatarFallback>
                    </Avatar>
                    )}
                </div>
                </Link>
            <p className="text-neutral-7 mt-1">
                {
                    mockAttendees.slice(0, 4).map((v,i) => (
                        <span key={v.username}>{v.name}{i !== 3 && ", "}{i === 3 && " and "}</span>
                    ))
                }
                <span>{mockAttendees.length} others</span>
            </p>

            <div className="flex flex-wrap gap-2 items-center mt-7">
                {
                    ["#Networking","#Lagos"].map((v,index) => (
                        <Badge key={`${v}${index}`} variant="default" className={`py-1 px-2 bg-accent-1 text-accent-7 rounded-2xl text-center text-sm font-medium capitalize`}>
                            {v}
                        </Badge>
                    ))
                }
            </div>
        </div>
    )
}


export default HostNAttendeeDetailsSection;