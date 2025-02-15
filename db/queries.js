import { eventModel } from "@/models/event-models";

async function getAllEvents() {
  const allEvents = await eventModel.find();
  return allEvents;
}

export { getAllEvents };
