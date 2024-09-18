/** @format */

import { db, users } from "@/server/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export async function CheckUser() {
  try {
    const user = await currentUser();
    if (!user) {
      return null;
    }
    // Check if user is in db
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.id, user.id))
      .limit(1);

    if (existingUser.length > 0) {
      // User already exists in the database
      return existingUser[0];
    } else {
      // User doesn't exist, create a new one
      const newUser = {
        authId: user.id,
        email: user.emailAddresses[0]?.emailAddress ?? "",
        profilePictureUrl: user.imageUrl ?? "",
        username: user.username ?? `user_${user.id}`, // Generate a username if not provided
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
      };

      const insertedUser = await db.insert(users).values(newUser).returning();
      return insertedUser[0];
    }
  } catch (error) {
    console.error("Error in CheckUser:", error);
    return null;
  }
}
