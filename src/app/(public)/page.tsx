import EventCategorySection from "@/components/shared/EventCategorySection";
import EventsNearYouSection from "@/components/shared/EventsNearYou";
import FeaturedEventsSection from "@/components/shared/FeaturedEventsSection";
import HeroSection from "@/components/homepage/HeroSection";
import PlanningAnEventSection from "@/components/homepage/PlanningAnEventSection";
import SellTicketsSection from "@/components/homepage/SellTicketsSection";
import TopDestinationTravelledSection from "@/components/homepage/TopDestinationTravelledSection";
import WhereItsHappeningSection from "@/components/shared/WhereItsHappeningSection";

export default function Homepage(){
  return(
    <main className="">
      <HeroSection />
      <EventCategorySection />
      <div className="mt-10 md:mt-20">
        <FeaturedEventsSection />
      </div>
      <WhereItsHappeningSection />
      <EventsNearYouSection />
      <TopDestinationTravelledSection />
      <PlanningAnEventSection />
      <SellTicketsSection />
    </main>
  )
}