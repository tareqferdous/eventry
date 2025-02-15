import { getAllEvents } from "@/db/queries";
import EventCard from "./EventCard";

const EventList = async () => {
  const allEvents = await getAllEvents();
  console.log("allEvents", allEvents.length);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
      <EventCard />
    </div>
  );
};

export default EventList;
