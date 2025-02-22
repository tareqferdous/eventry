import EventDetails from "@/components/details/EventDetails";
import EventVenue from "@/components/details/EventVenue";
import HeroSection from "@/components/details/HeroSection";
import { getEventsById } from "@/db/queries";

export async function generateMetadata({ params: { id } }) {
  const eventInfo = await getEventsById(id);

  return {
    title: `Eventry - ${eventInfo?.name}`,
    description: eventInfo?.details,
    openGraph: {
      images: [eventInfo?.imageUrl],
    },
  };
}

const EventDetailsPage = async ({ params: { id } }) => {
  const eventInfo = await getEventsById(id);

  return (
    <>
      <HeroSection eventInfo={eventInfo} />
      <section class="container">
        <div class="grid grid-cols-5 gap-12 my-12">
          <EventDetails details={eventInfo?.details} swags={eventInfo?.swags} />
          <EventVenue location={eventInfo?.location} />
        </div>
      </section>
    </>
  );
};

export default EventDetailsPage;
