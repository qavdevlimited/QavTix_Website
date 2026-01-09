import { NAV_LINKS } from "@/components-data/navigation/navLinks";

export const containsEventPage = (pathName: string) => (
    pathName.startsWith(NAV_LINKS.EVENT_LOCATION.href.replace(/\/$/, "")) ||
    pathName.startsWith(NAV_LINKS.EVENT_CATEGORY.href.replace(/\/$/, "")) ||
    pathName.startsWith(NAV_LINKS.EVENT_TRAVEL_AND_TOUR.href.replace(/\/$/, ""))
)