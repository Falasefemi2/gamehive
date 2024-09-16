/** @format */

"use server";

import { db } from "@/server/db";
import { games } from "@/server/schema";
import { sql } from "drizzle-orm";

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

export async function getAllGamesWithPagination(
  page: number = 1,
  pageSize: number = 12
) {
  try {
    const offset = (page - 1) * pageSize;

    const allGame = await db
      .select({
        id: games.id,
        title: games.title,
        thumbnail: games.thumbnail,
        shortDescription: games.shortDescription,
      })
      .from(games)
      .limit(pageSize)
      .offset(offset);

    const totalGames = await db
      .select({ count: sql<number>`count(${games.id})` })
      .from(games)
      .then((result) => result[0].count);

    const totalPages = Math.ceil(totalGames / pageSize);

    return {
      allGame,
      currentPage: page,
      totalPages,
      pageSize,
      totalGames,
    };
  } catch (error) {
    console.error("Error fetching games:", error);
    throw error;
  }
}
