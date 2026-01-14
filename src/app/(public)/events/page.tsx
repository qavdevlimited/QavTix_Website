import TopHostsSection from "@/components/events-page/TopHostSection";
import { TrendingEvents } from "@/components/shared/TrendingEvents";
import TopDestinationTravelledSection from "@/components/homepage/TopDestinationTravelledSection";
import EventCategorySection2 from "@/components/shared/EventCategorySection2";
import EventsNearYouSection from "@/components/shared/EventsNearYou";
import FeaturedEventsSection from "@/components/shared/FeaturedEventsSection";
import SectionHeading from "@/components/shared/SectionHeading";
import WhereItsHappeningSection from "@/components/shared/WhereItsHappeningSection";
import { space_grotesk } from "@/lib/fonts";

export default function EventsPage(){
    return (
        <main className="pb-14">
            <SectionHeading title="Events" />

            <div className="mt-10 md:mt-16">
                <FeaturedEventsSection />
            </div>

            <WhereItsHappeningSection />
            <EventsNearYouSection />
            <EventCategorySection2 />
            <div className="mt-12 md:mt-20">
                <TrendingEvents />
            </div>
            <TopDestinationTravelledSection />
            <TopHostsSection />
        </main>
    )
}