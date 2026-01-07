import { CustomIcons } from "../Svg-Icons";
import { Label } from "../ui/label";
import { space_grotesk } from "@/lib/redux/fonts";
import { EventCategory, EventCategoryValue, getEventCategoryLabel } from "@/components-data/eventCategory";

export default function EventCategoryBox({ value }: { value: EventCategoryValue }) {

    return (
        <Label htmlFor={value} className="cursor-pointer block w-full">
            <div className="bg-gray-200 rounded-xl h-52 px-6 py-4 flex flex-col justify-center items-center border-2 border-transparent hover:border-primary-5 transition-colors">
                <div className="space-y-3">
                    {
                        value === EventCategory.ConcertAndMusic.value ? <CustomIcons.musicConcerts /> :
                        value === EventCategory.SportAndFitness.value ? <CustomIcons.sportAndFitness /> : 
                        value === EventCategory.ArtAndTheater.value ? <CustomIcons.artsAndTheater /> : 
                        value === EventCategory.FoodAndDrinking.value ? <CustomIcons.foodAndDrink /> : 
                        value === EventCategory.Festivals.value ? <CustomIcons.festival /> : 
                        value === EventCategory.BusinessAndNetworking.value ? <CustomIcons.briefCase /> : 
                        value === EventCategory.TravelsAndTours.value ? <CustomIcons.travel /> : 
                        value === EventCategory.NightlifeAndParties.value ? <CustomIcons.djIcon />
                        :
                        null
                    }
                    <div>
                        <h3 className={`${space_grotesk.className} text-lg font-medium capitalize`}>
                            {getEventCategoryLabel(value)}
                        </h3>
                    </div>
                </div>
            </div>
        </Label>
    )
}