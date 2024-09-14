/** @format */

"use server";

import { db } from "@/server/db";
import { games } from "@/server/schema";

export async function getSevenGameThumbnails() {
  try {
    const sevenGames = await db
      .select({
        id: games.id,
        title: games.title,
        thumbnail: games.thumbnail,
        shortDescription: games.shortDescription,
      })
      .from(games)
      .limit(7);
    return sevenGames;
  } catch (error) {
    console.error("Error fetching games:", error);
    throw error;
  }
}
