import BasedOnRecentSearchSection from "@/components/events-page/BasedOnRecentSearchSection";
import { SearchResultSection } from "@/components/events-page/SearchResultSection";
import SectionHeading from "@/components/shared/SectionHeading";

export default function ExploreEventPage(){
    return (
        <main>
            <SectionHeading title="Events" />

            <SearchResultSection 
                data={[]} 
                searchValue={{ categories: [], priceRange: { min: 300, max: 400 }, location: { country: "NG", state: "Lagos" }}} 
            />

            <BasedOnRecentSearchSection />
        </main>
    )
}