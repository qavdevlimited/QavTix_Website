import { CustomIcons } from "../Svg-Icons";
import { space_grotesk } from "@/lib/redux/fonts";
import { EventCategory, EventCategoryValue, getEventCategoryLabel } from "@/components-data/eventCategory";

export default function EventCategoryBox({ value }: { value: EventCategoryValue }) {

    return (
        <div className="bg-neutral-3 rounded-[18.4px] flex justify-center items-center h-52 px-6 py-4 border-2 border-transparent hover:scale-105 duration-200 transition-all ease-linear">
            <div className="items-center gap-3 flex flex-col justify-center">
                {
                    value === EventCategory.ConcertAndMusic.value ? <CustomIcons.musicConcerts className="size-14" /> :
                    value === EventCategory.SportAndFitness.value ? <CustomIcons.sportAndFitness className="size-14" /> : 
                    value === EventCategory.ArtAndTheater.value ? <CustomIcons.artsAndTheater className="size-14" /> : 
                    value === EventCategory.FoodAndDrinking.value ? <CustomIcons.foodAndDrink className="size-14" /> : 
                    value === EventCategory.Festivals.value ? <CustomIcons.festival className="size-14" /> : 
                    value === EventCategory.BusinessAndNetworking.value ? <CustomIcons.briefCase className="size-14" /> : 
                    value === EventCategory.TravelsAndTours.value ? <CustomIcons.travel className="size-14" /> : 
                    value === EventCategory.NightlifeAndParties.value ? <CustomIcons.djIcon className="size-14" />
                    :
                    null
                }
                <div>
                    <h3 className={`${space_grotesk.className} text-neutral-9 text-sm text-center capitalize`}>
                        {getEventCategoryLabel(value)}
                    </h3>
                </div>
            </div>
        </div>
    )
}