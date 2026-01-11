import { space_grotesk } from "@/lib/redux/fonts";

export default function HostPricingContent(){
    return (
        <section>
            <h2 className={`${space_grotesk.className} font-bold text-2xl md:text-3xl lg:text-[2.5rem] text-secondary-9`}>Pricing that grows with your events</h2>
            <p className="text-neutral-8 mt-4">
                Start free and upgrade anytime. Whether you’re hosting your first event or managing hundreds, QavTix offers flexible, fair pricing designed for organizers at every level.
            </p>

            
        </section>
    )
}