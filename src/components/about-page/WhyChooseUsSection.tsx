import { space_grotesk } from "@/lib/redux/fonts";
import FeatureCards from "../custom-utils/cards/FeatureCards";

export default function WhyChooseUsSection(){
    return (
        <section className="global-px mt-24">
            <div className="sm:flex justify-center items-center flex-col max-w-xl sm:mx-auto sm:text-center">
                <h2
                    className={`text-2xl sm:text-3xl md:text-[2rem] font-bold text-secondary-9 ${space_grotesk.className}`}
                >
                    Why choose QavTix?
                </h2>
                <p className="text-neutral-8 text-sm mt-5 md:text-base">Our platform is built with speed, security, and simplicity in mind. QavTix ensures a smooth and enjoyable jounery browsing to checkout.</p>
            </div>

            <FeatureCards />
        </section>
    )
}