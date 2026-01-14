import { space_grotesk } from "@/lib/redux/fonts";
import Image from "next/image";

export default function EventDetailsPreview(){
    return (
        <div className="flex gap-3 w-full rounded-[27px] p-2 border border-neutral-5">
            <figure>
                <Image 
                    src="/images/demo-images/event-detail-img.png" 
                    alt=""
                    width={300}
                    height={300}
                    className="rounded-3xl h-full object-cover"
                />
            </figure>

            <div>
                <h3 className={`${space_grotesk.className} text-secondary-9 leading-5.5`}>
                    Learn to create visually appealing  and user-friendly interfaces.
                </h3>
                <p className="text-xs mt-3 text-neutral-7">March 22, 9AM - 12PM WAT</p>
            </div>
        </div>
    )
}