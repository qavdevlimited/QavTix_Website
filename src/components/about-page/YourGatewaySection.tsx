import { space_grotesk } from "@/lib/fonts";
import MobileInfiniteScroll from "../homepage/MobileInfiniteScrollImages";
import { slides_onlyImages } from "@/components-data/auth-pages/slides";

export default function YourGatewaySection(){
    return (
        <section className="mt-16">
            <div className="global-px max-w-lg md:max-w-2xl">
                <h2
                    className={`text-2xl sm:text-3xl  md:text-[2rem] font-bold text-secondary-9 ${space_grotesk.className}`}
                >
                    Your gateway to unforgettable experiences
                </h2>
                <p className="text-neutral-8 text-sm mt-5 md:text-base">QavTix is a modern, multi-purpose ticketing platform designed to help you discover, book, and enjoy events with ease. From concerts and nightlife to business events, sports,tours, and theatre, QavTix connects you to everything you love (securely, instantly, and hassle free) anytime, anywhere.</p>
            </div>


            <div className="mt-8 global-px pe-0!">
                <MobileInfiniteScroll images={slides_onlyImages} />
            </div>
        </section>
    )
}