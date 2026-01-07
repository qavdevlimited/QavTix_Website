import EventCategorySection from "@/components/homepage/EventCategorySection";
import FeaturedEventsSection from "@/components/homepage/FeaturedEventsSection";
import HeroSection from "@/components/homepage/HeroSection";

export default function Homepage(){
  return(
    <main className="">
      <HeroSection />
      <EventCategorySection />
      <FeaturedEventsSection />
    </main>
  )
}