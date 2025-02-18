"use server";

import { createUser, findUserByCredentials } from "@/db/queries";
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
