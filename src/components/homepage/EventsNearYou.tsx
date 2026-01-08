"use client"

import { space_grotesk } from "@/lib/redux/fonts";
import ActionButton1 from "../custom-utils/buttons/ActionButton1";
import { useRouter } from "next/navigation";
import EventsCard1 from "../custom-utils/cards/EventCards";
import { Icon } from "@iconify/react";


const eventsMock: IEvent[] = [
  {
    image: "/images/demo-images/unsplash_mlVbMbxfWI4.png",
    status: "filling-fast",
    category: "Networking",
    host: "Qavdev",
    title: "Learn to create visually appealing and user friendly interfaces",
    date: "Tomorrow, March 22, 9AM WAT",
    location: "1234, Shima Road, Victoria Island, Lagos",
    price: "₦3,500",
    originalPrice: "₦5,500",
    href: "/events/ui-workshop",
    attendees: [
      { id: "1", image: "/avatars/1.jpg", initials: "AD" },
      { id: "2", image: "/avatars/2.jpg", initials: "BK" },
      { id: "3", image: "/avatars/3.jpg", initials: "CJ" },
      { id: "4", image: "/avatars/4.jpg", initials: "DL" },
      { id: "5", image: "/avatars/5.jpg", initials: "EM" },
    ],
  },
  {
    image: "/images/demo-images/unsplash_mlVbMbxfWI4.png",
    status: "sold-out",
    category: "Design",
    host: "UX Lagos",
    title: "Product Design Systems Masterclass",
    date: "Saturday, March 30, 10AM WAT",
    location: "Landmark Centre, Victoria Island, Lagos",
    price: "₦7,000",
    href: "/events/design-systems",
    attendees: [
      { id: "1", image: "/avatars/6.jpg", initials: "FN" },
      { id: "2", image: "/avatars/7.jpg", initials: "GO" },
      { id: "3", image: "/avatars/8.jpg", initials: "HP" },
      { id: "4", image: "/avatars/9.jpg", initials: "IR" },
    ],
  },
  {
    image: "/images/demo-images/unsplash_mlVbMbxfWI4.png",
    status: "near-capacity",
    category: "Tech Meetup",
    host: "Frontend NG",
    title: "Modern Frontend Architecture Meetup",
    date: "Friday, April 5, 6PM WAT",
    location: "Radisson Blu, Ikeja, Lagos",
    price: "Free",
    href: "/events/frontend-meetup",
    attendees: [
      { id: "1", image: "/avatars/10.jpg", initials: "JS" },
      { id: "2", image: "/avatars/11.jpg", initials: "KT" },
      { id: "3", image: "/avatars/12.jpg", initials: "LU" },
    ],
  },
  {
    image: "/images/demo-images/unsplash_mlVbMbxfWI4.png",
    status: "new",
    category: "Startup",
    host: "Techpoint Africa",
    title: "Startup Pitch Night Lagos",
    date: "Wednesday, April 10, 7PM WAT",
    location: "Civic Centre, Victoria Island, Lagos",
    price: "₦2,000",
    href: "/events/startup-pitch-night",
    attendees: [
      { id: "1", image: "/avatars/13.jpg", initials: "MW" },
      { id: "2", image: "/avatars/14.jpg", initials: "NZ" },
    ],
  },
  {
    image: "/images/demo-images/unsplash_mlVbMbxfWI4.png",
    status: "filling-fast",
    category: "AI & Data",
    host: "Data Science Nigeria",
    title: "Practical AI for Business Workshop",
    date: "Saturday, April 13, 9AM WAT",
    location: "Yaba Tech Hub, Lagos",
    price: "₦10,000",
    originalPrice: "₦15,000",
    href: "/events/ai-business",
    attendees: [
      { id: "1", image: "/avatars/15.jpg", initials: "OA" },
      { id: "2", image: "/avatars/16.jpg", initials: "PB" },
      { id: "3", image: "/avatars/17.jpg", initials: "QC" },
      { id: "4", image: "/avatars/18.jpg", initials: "RD" },
    ],
  },
  {
    image: "/images/demo-images/unsplash_mlVbMbxfWI4.png",
    category: "Marketing",
    host: "Growth Africa",
    title: "Digital Marketing Growth Summit",
    date: "Friday, April 19, 11AM WAT",
    location: "Eko Convention Centre, Lagos",
    price: "₦8,500",
    href: "/events/marketing-summit",
    attendees: [
      { id: "1", image: "/avatars/19.jpg", initials: "SE" },
      { id: "2", image: "/avatars/20.jpg", initials: "TF" },
      { id: "3", image: "/avatars/21.jpg", initials: "UG" },
    ],
  },
  {
    image: "/images/demo-images/unsplash_mlVbMbxfWI4.png",
    status: "near-capacity",
    category: "Creator Economy",
    host: "YouTube Lagos",
    title: "Content Creators Networking Night",
    date: "Thursday, April 25, 6PM WAT",
    location: "Lekki Phase 1, Lagos",
    price: "₦3,000",
    href: "/events/creators-night",
    attendees: [
      { id: "1", image: "/avatars/22.jpg", initials: "VH" },
      { id: "2", image: "/avatars/23.jpg", initials: "WI" },
      { id: "3", image: "/avatars/24.jpg", initials: "XJ" },
      { id: "4", image: "/avatars/25.jpg", initials: "YK" },
    ],
  },
  {
    image: "/images/demo-images/unsplash_mlVbMbxfWI4.png",
    status: "new",
    category: "Blockchain",
    host: "Web3 Lagos",
    title: "Blockchain & Web3 Innovation Forum",
    date: "Saturday, April 27, 10AM WAT",
    location: "Oriental Hotel, Victoria Island, Lagos",
    price: "₦12,000",
    href: "/events/web3-forum",
    attendees: [
      { id: "1", image: "/avatars/26.jpg", initials: "ZL" },
      { id: "2", image: "/avatars/27.jpg", initials: "AM" },
    ],
  },
]


export default function EventsNearYouSection(){

  const router = useRouter()

  return (
    <section className="global-px max-w-7xl mx-auto">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 mt-10 justify-items-center">
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