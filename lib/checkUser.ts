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
    let dbUser = await db
      .select()
      .from(users)
      .where(eq(users.id, user.id))
      .limit(1);

    if (dbUser.length === 0) {
      // User doesn't exist, create a new one
      const newUser = {
        id: user.id, // Add this line
        authId: user.id,
        email: user.emailAddresses[0]?.emailAddress ?? "",
        profilePictureUrl: user.imageUrl ?? "",
        username: user.username ?? `user_${user.id}`,
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
      };

      dbUser = await db.insert(users).values(newUser).returning();
    }

    return dbUser[0];
  } catch (error) {
    console.error("Error in CheckUser:", error);
    return null;
  }
}
