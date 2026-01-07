import EventCategorySection from "@/components/homepage/EventCategorySection";
import EventsNearYouSection from "@/components/homepage/EventsNearYou";
import FeaturedEventsSection from "@/components/homepage/FeaturedEventsSection";
import HeroSection from "@/components/homepage/HeroSection";
import PlanningAnEventSection from "@/components/homepage/PlanningAnEventSection";
import SellTicketsSection from "@/components/homepage/SellTicketsSection";
import TopDestinationTravelledSection from "@/components/homepage/TopDestinationTravelledSection";
import WhereItsHappeningSection from "@/components/homepage/WhereItsHappeningSection";

export default function Homepage(){
  return(
    <main className="">
      <HeroSection />
      <EventCategorySection />
      <FeaturedEventsSection />
      <WhereItsHappeningSection />
      <EventsNearYouSection />
      <TopDestinationTravelledSection />
      <PlanningAnEventSection />
      <SellTicketsSection />
    </main>
  )
}