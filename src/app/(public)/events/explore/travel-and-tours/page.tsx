import EventLocationDetailsSection from "@/components/events-page/EventLocationDetailsSection";

export default async function TravelAndToursPage(){

    return (
        <main className="pt-24 md:pt-40">
            <EventLocationDetailsSection 
                events={30} 
                subscribers={230}
                heading="Experience Dubai Like Never Before"
                description="Explore a city where luxury meets adventure — from iconic skyscrapers and desert safaris to world-class shopping, beaches, and unforgettable experiences."
            />   
        </main>
    )
}