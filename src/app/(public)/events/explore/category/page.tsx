import EventLocationDetailsSection from "@/components/events-page/EventLocationDetailsSection";

export default async function EventCategoryPage(){

    return (
        <main className="pt-24 md:pt-40">
            <EventLocationDetailsSection 
                location="Lagos" 
                events={30} 
                subscribers={230}
                heading="Concerts & Music Events"
                description="From chart-topping artists to underground acts, live performances, unforgettable nights, and the sounds you love. Discover concerts and music events that move you."
            />   
        </main>
    )
}