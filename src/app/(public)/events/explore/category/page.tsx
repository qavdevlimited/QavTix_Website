import EventLocationDetailsSection from "@/components/events-page/EventLocationDetailsSection";

export default async function EventCategoryPage({ params }:{ params: Promise<{location: string}>}){

    const location = (await params).location;

    return (
        <main className="pt-24 md:pt-40">
            <EventLocationDetailsSection 
                location="Lagos" 
                events={30} 
                subscribers={230}
                heading={`Events Happening in ${location}`}
                description={`From concerts and parties to conferences and pop-ups, ${location} is where experiences come alive. Discover what's happening next that bring  to life.`}
            />
        </main>
    )
}