import { EVENT_CATEGORIES_ARRAY } from "@/components-data/eventCategory";
import EventCategoryBox from "../custom-utils/cards/EventCategoryBox";
import { space_grotesk } from "@/lib/redux/fonts";

export default function EventCategorySection2(){
    return (
        <section className="mt-20 md:mt-24 global-px">
            <h2 className={`${space_grotesk.className} font-bold text-[2rem] text-secondary-9 mb-3`}>Events categories</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 lg:gap-x-7 gap-y-7 mt-10 px-4 md:px-0">
                {
                    EVENT_CATEGORIES_ARRAY.map((v,index) => (
                        <EventCategoryBox value={v.value} key={`${v.value}-${index}`} />
                    ))
                }
            </div>
        </section>
    )
}