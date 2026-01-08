import TeamLeadersSection from "@/components/about-page/TeamLeadersSection";
import WhyChooseUsSection from "@/components/about-page/WhyChooseUsSection";
import YourGatewaySection from "@/components/about-page/YourGatewaySection";
import { space_grotesk } from "@/lib/redux/fonts";

export default function AboutUsPage(){
    return (
        <main className="">
            <div className="w-[70%] lg:w-[75%] h-52 lg:h-76 bg-secondary-6 flex justify-end items-end rounded-br-[45px] md:rounded-br-[105px] lg:rounded-br-[130px] pt-40 lg:pt-52 pb-8 px-10 md:px-20 lg:px-28">
                <h1 className={`${space_grotesk.className} text-white font-medium text-right text-4xl md:text-5xl lg:text-7xl`}>About</h1>
            </div>

            <YourGatewaySection />
            <WhyChooseUsSection />
            <TeamLeadersSection />
        </main>
    )
}