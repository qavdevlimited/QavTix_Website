import { RadioGroupItem } from "../ui/radio-group";
import { CustomIcons } from "../Svg-Icons";
import { Label } from "../ui/label";
import { space_grotesk } from "@/lib/redux/fonts";

export default function AccountTypeBox({ value }: { value: AccountType }) {

    return (
        <Label htmlFor={value} className="cursor-pointer block w-full">
            <div className="bg-gray-200 rounded-xl h-57 px-6 py-4 flex flex-col justify-between border-2 border-transparent hover:border-primary-5 transition-colors">
                <RadioGroupItem 
                    value={value} 
                    id={value}
                    className="self-end data-[state=checked]:border-[1.5px] data-[state=checked]:border-primary-6 size-6"
                    circleIconClass="size-3"
                />
                
                <div className="space-y-3">
                    {
                        value === "attendee" ? <CustomIcons.ticket className="w-12 h-12 text-primary-6" /> :
                        value === "host" ? <CustomIcons.lightbulb className="w-12 h-12 text-primary-6" /> : null
                    }
                    <div>
                        <h3 className={`${space_grotesk.className} text-lg font-medium capitalize`}>
                            {value}
                        </h3>
                    </div>
                </div>
            </div>
        </Label>
    )
}