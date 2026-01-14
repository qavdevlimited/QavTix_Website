import { eventsMock } from "@/components-data/demo-data";
import EventsCard1 from "../custom-utils/cards/EventCards";
import { space_grotesk } from "@/lib/redux/fonts";

export default function BasedOnRecentSearchSection(){
    return (
        <section className="my-24 md:my-28 global-px">
            <h2 className={`text-2xl sm:text-3xl  md:text-[2rem] font-bold text-secondary-9 ${space_grotesk.className}`}>
                Based on recent searches
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 mt-10 justify-items-center md:justify-items-start">
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