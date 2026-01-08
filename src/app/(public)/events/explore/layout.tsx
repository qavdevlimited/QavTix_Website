import TopHostsSection from "@/components/events-page/TopHostSection";
import FeaturedEventsSection from "@/components/shared/FeaturedEventsSection";
import { TrendingEvents } from "@/components/shared/TrendingEvents";
import { ReactNode } from "react";

export default function EventExploreLayout({ children }:{ children: ReactNode }){
    return (
        <>
            {children}
            <div className="mt-10 md:mt-16">
                <FeaturedEventsSection />
            </div>

            <TrendingEvents className="" />
            <TopHostsSection />
        </>
    )
}