import EventList from "@/components/landing/EventList";
import { Suspense } from "react";

export default function Home({ searchParams: { query } }) {
  return (
    <section className="container">
      <Suspense key={query} fallback={<div>Loading Events data..</div>}>
        <EventList query={query} />
      </Suspense>
    </section>
  );
}
