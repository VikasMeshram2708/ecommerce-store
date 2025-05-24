"use server";

import { auth } from "@clerk/nextjs/server";

export async function addToCart() {
  // auth & permission check
  const { userId, orgRole, has } = await auth();

  if (!userId || !has({ role: "Member" })) {
    throw new Error("Unauthorized");
  }
  // sanitize the incoming data
  //   save to db
  // return the response
}
