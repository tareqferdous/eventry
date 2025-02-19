"use server";

import {
  createUser,
  findUserByCredentials,
  updateInterest,
} from "@/db/queries";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function registerUser(formData) {
  const user = Object.fromEntries(formData);
  const created = await createUser(user);
  redirect("/login");
}

export async function performLogin(formData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");
    const user = {
      email,
      password,
    };

    const found = await findUserByCredentials(user);
    return found;
  } catch (error) {
    throw error;
  }
}

export async function addInterestedEvent(eventId, authId) {
  try {
    await updateInterest(eventId, authId);
  } catch (error) {
    throw error;
  }
  revalidatePath("/");
}
