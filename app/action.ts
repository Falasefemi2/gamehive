/** @format */

"use server";

import { db } from "@/server/db";
import { games } from "@/server/schema";
import { eq, sql } from "drizzle-orm";

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

export async function getGameById(id: number) {
  try {
    const game = await db.select().from(games).where(eq(games.id, id)).limit(1);

    if (game.length === 0) {
      return null;
    }

    const gameResult = game[0];

    return {
      id: gameResult.id,
      title: gameResult.title,
      thumbnail: gameResult.thumbnail,
      description: gameResult.shortDescription,
      gameUrl: gameResult.gameUrl,
      genre: gameResult.genre,
      publisher: gameResult.publisher,
      developer: gameResult.developer,
      releaseDate: gameResult.releaseDate,
      freetogameProfileUrl: gameResult.freetogameProfileUrl,
    };
  } catch (error) {
    console.error("Error fetching game by id:", error);
    throw error;
  }
}
