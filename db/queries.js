import { eventModel } from "@/models/event-models";
import { userModel } from "@/models/user-model";
import { dbConnect } from "@/services/mongo";
import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data-utils";
import mongoose from "mongoose";

async function getAllEvents(query) {
  try {
    await dbConnect();
    let allEvents = [];
    if (query) {
      const regex = new RegExp(query, "i");
      allEvents = await eventModel.find({ name: { $regex: regex } }).lean();
    } else {
      allEvents = await eventModel.find().lean();
    }
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

async function updateInterest(eventId, authId) {
  const event = await eventModel.findById(eventId);

  if (event) {
    const foundUsers = event.interested_ids.find(
      (id) => id.toString() === authId
    );

    if (foundUsers) {
      event.interested_ids.pull(new mongoose.Types.ObjectId(authId));
    } else {
      event.interested_ids.push(new mongoose.Types.ObjectId(authId));
    }

    event.save();
  }
}

const updateGoing = async (eventId, authId) => {
  const event = await eventModel.findById(eventId);

  if (event) {
    event.going_ids.push(new mongoose.Types.ObjectId(authId));
  }
  event.save();
};

export {
  createUser,
  findUserByCredentials,
  getAllEvents,
  getEventsById,
  updateGoing,
  updateInterest,
};
