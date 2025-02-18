"use server";

import { redirect } from "next/navigation";

export async function registerUser(formData) {
  const user = Object.fromEntries(formData);
  const created = await createUser(user);
  redirect("/login");
}
