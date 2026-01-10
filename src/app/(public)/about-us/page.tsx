import TeamLeadersSection from "@/components/about-page/TeamLeadersSection";
import WhyChooseUsSection from "@/components/about-page/WhyChooseUsSection";
import YourGatewaySection from "@/components/about-page/YourGatewaySection";
import SectionHeading from "@/components/shared/SectionHeading";

export default function AboutUsPage(){
    return (
        <main className="">
            <SectionHeading title="About" />

            <YourGatewaySection />
            <WhyChooseUsSection />
            <TeamLeadersSection />
        </main>
    )
}