import EventLocationDetailsSection from "@/components/events-page/EventLocationDetailsSection";
import { TrendingEvents } from "@/components/shared/TrendingEvents";
import FeaturedEventsSection from "@/components/shared/FeaturedEventsSection";
import TopHostsSection from "@/components/events-page/TopHostSection";

export default function EventLocationPage(){
    return (
        <main className="pt-24 md:pt-40">
            <EventLocationDetailsSection location="Lagos" events={30} subscribers={230} />
            <div className="mt-10 md:mt-16">
                <FeaturedEventsSection />
            </div>

            <TrendingEvents className="" />
            <TopHostsSection />
        </main>
    )
}