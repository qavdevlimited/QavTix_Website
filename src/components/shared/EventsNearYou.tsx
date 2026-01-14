"use client"

import { space_grotesk } from "@/lib/redux/fonts";
import ActionButton1 from "../custom-utils/buttons/ActionButton1";
import { useRouter } from "next/navigation";
import EventsCard1 from "../custom-utils/cards/EventCards";
import { Icon } from "@iconify/react";
import { eventsMock } from "@/components-data/demo-data";



export default function EventsNearYouSection(){

  const router = useRouter()

  return (
    <section className="global-px">
      <div className="flex items-center justify-between gap-5">
      <h2
        className={`text-2xl sm:text-3xl  md:text-[2rem] font-bold text-secondary-9 ${space_grotesk.className}`}
      >
        Events near you
      </h2>

      <ActionButton1 buttonText="Explore Events" className="hidden! md:flex!" iconPosition="right" icon="iconoir:arrow-right" action={() => router.push("/explore-events")} />
          <button 
            className="
              text-sm
              md:hidden
              bg-primary
              hover:bg-primary-7
              active:bg-primary-8
              disabled:bg-neutral-5
              disabled:cursor-not-allowed
              text-white
              p-2
              rounded-full
              h-12
              aspect-square
              font-medium
              transition-colors
              inline-flex
              items-center
              justify-center
              "
              >
            <Icon
              icon="lucide:arrow-up-right"
              width="20"
              height="20"
              className="text-white"
            />
          </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 mt-10 justify-items-center md:justify-items-start">
        {eventsMock.map((event) => (
          <EventsCard1 
            key={event.href}
            {...event} 
          />
        ))}
      </div>
    </section>
  )
}