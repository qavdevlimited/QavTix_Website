"use client"

import SectionHeading from "@/components/shared/SectionHeading";
import Image from "next/image";
import ContactHostForm from "../forms/ContactHostForm";
import EventOverviewSection from "./event-details/EventOverviewSection";
import HostNAttendeeDetailsSection from "./event-details/HostNAttendeeSection";
import RelatedEventsYouMightLike from "./event-details/RelatedEventsYouMightLike";


export default function EventDetailsPageContentContainer(){


    return (
        <main className="pb-20">
            <SectionHeading title="Events" />

            <div className="md:flex md:mt-20 global-px justify-between gap-8">

                <div className="hidden md:block md:w-[45%]">
                    <figure>
                        <Image 
                            src="/images/demo-images/event-detail-img.png"
                            alt="Event Image"
                            width={900}
                            height={900}
                            className="rounded-4xl h-60 object-cover md:h-96"
                        />
                    </figure>
                    <HostNAttendeeDetailsSection className="md:mt-8" />
                    <ContactHostForm />
                </div>


                <section className="mt-12 md:mt-0 md:w-[50%]">
                    <figure className="md:hidden">
                        <Image 
                            src="/images/demo-images/event-detail-img.png"
                            alt="Event Image"
                            width={900}
                            height={900}
                            className="rounded-4xl h-[50%] max-w-full w-[32em] mx-auto object-cover"
                        />
                    </figure>

                    <HostNAttendeeDetailsSection className="hidden" />

                    <EventOverviewSection />

                    <div className="md:hidden">
                        <ContactHostForm />
                    </div>
                </section>


                <EventOverviewSection className="hidden" />

                <div className="md:hidden mt-20">
                    <RelatedEventsYouMightLike />            
                </div>
            </div>
        </main>
    )
}