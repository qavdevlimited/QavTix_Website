import { eventsMock } from "@/components-data/demo-data";
import EventsCard1 from "../custom-utils/cards/EventCards";
import { space_grotesk } from "@/lib/redux/fonts";

export default function BasedOnRecentSearchSection(){
    return (
        <section className="my-24 md:my-28 global-px">
            <h2 className={`text-2xl sm:text-3xl  md:text-[2rem] font-bold text-secondary-9 ${space_grotesk.className}`}>
                Based on recent searches
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-[repeat(auto-fit,minmax(18em,1fr))] gap-6 lg:gap-8 mt-10 justify-items-center md:justify-items-start">
                {eventsMock.slice(0,4).map((event) => (
                    <EventsCard1 
                        key={event.href}
                        {...event} 
                    />
                ))}
            </div>
        </section>
    )
}