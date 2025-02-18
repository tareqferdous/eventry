import { eventModel } from "@/models/event-models";
import { userModel } from "@/models/user-model";
import { dbConnect } from "@/services/mongo";
import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data-utils";

async function getAllEvents() {
  try {
    await dbConnect();
    const allEvents = await eventModel.find().lean();
    return replaceMongoIdInArray(allEvents);
  } catch (error) {
    console.log(error);
  }
}

async function getEventsById(eventId) {
  try {
    await dbConnect();
    const event = await eventModel.findById(eventId).lean();
    return replaceMongoIdInObject(event);
  } catch (error) {
    console.log(error);
  }
}

async function createUser(user) {
  return await userModel.create(user);
}

async function findUserByCredentials(credentials) {
  const user = await userModel.findOne(credentials).lean();
  if (user) {
    return replaceMongoIdInObject(user);
  }
  return null;
}

export { createUser, findUserByCredentials, getAllEvents, getEventsById };
