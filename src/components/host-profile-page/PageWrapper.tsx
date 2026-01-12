import { eventsMock } from "@/components-data/demo-data";
import UpcomingEvents from "../shared/UpcomingEvents";
import HostProfilePageHeader from "./HostProfileHeader";
import { PastEvents } from "../shared/PastEvents";

export default function PageWrapper(){
    return (
        <main className="py-24.5 mt-2 md:mt-8">
            <div className="global-px">
                <HostProfilePageHeader />
            </div>

            <div className="mt-20 mb-8 px-4 md:px-0">
                <UpcomingEvents upcomingEventsData={eventsMock} />
            </div>
            <div className="global-px">
                <PastEvents pastEventsData={eventsMock} />
            </div>

        </main>
    )
}