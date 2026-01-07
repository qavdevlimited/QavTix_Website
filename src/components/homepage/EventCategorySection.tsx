import { EVENT_CATEGORIES_ARRAY } from "@/components-data/eventCategory";
import EventCategoryBox from "./EventCategoryBox";

export default function EventCategorySection(){
    return (
        <section>
            <h2>We’ve got you!</h2>
            <p>No one gets left out. We’ve got something for everyone, and finding events that make your vibe has never been easier.</p>

            <div>
                {
                    EVENT_CATEGORIES_ARRAY.map((v,index) => (
                        <EventCategoryBox value={v.value} key={`${v.value}-${index}`} />
                    ))
                }
            </div>
        </section>
    )
}