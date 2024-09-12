/** @format */

// /** @format */

// import { db } from "@/server/db";
// import { gamePlatforms, games, platforms } from "@/server/schema";
// import { sql } from "drizzle-orm";

// interface APIGame {
//   id: number;
//   title: string;
//   thumbnail: string;
//   short_description: string;
//   game_url: string;
//   genre: string;
//   platform: string;
//   publisher: string;
//   developer: string;
//   release_date: string;
//   freetogame_profile_url: string;
// }

// async function fetchGames(): Promise<APIGame[]> {
//   const response = await fetch("https://www.freetogame.com/api/games");
//   return response.json();
// }

// async function pushGamesToDb() {
//   try {
//     const apiGames = await fetchGames();

//     for (const apiGame of apiGames) {
//       // Insert or update game
//       await db.insert(games).values({
//         id: apiGame.id,
//         title: apiGame.title,
//         thumbnail: apiGame.thumbnail,
//         shortDescription: apiGame.short_description,
//         gameUrl: apiGame.game_url,
//         genre: apiGame.genre,
//         publisher: apiGame.publisher,
//         developer: apiGame.developer,
//         releaseDate: apiGame.release_date,
//         freetogameProfileUrl: apiGame.freetogame_profile_url,
//       }).onConflictDoUpdate({
//         target: games.id,
//         set: {
//           title: apiGame.title,
//           thumbnail: apiGame.thumbnail,
//           shortDescription: apiGame.short_description,
//           gameUrl: apiGame.game_url,
//           genre: apiGame.genre,
//           publisher: apiGame.publisher,
//           developer: apiGame.developer,
//           releaseDate: apiGame.release_date,
//           freetogameProfileUrl: apiGame.freetogame_profile_url,
//         }
//       });

//       // Insert platforms and link to game
//       const platformNames = apiGame.platform.split(", ");
//       for (const platformName of platformNames) {
//         let platform = await db
//           .select()
//           .from(platforms)
//           .where(sql`${platforms.name} = ${platformName}`)
//           .limit(1)
//           .then((results) => results[0]);

//         if (!platform) {
//           [platform] = await db
//             .insert(platforms)
//             .values({
//               id: sql`default`,
//               name: platformName,
//             })
//             .returning();
//         }

//         await db
//           .insert(gamePlatforms)
//           .values({
//             gameId: apiGame.id,
//             platformId: platform.id,
//           })
//           .onConflictDoNothing();
//       }
//     }

//     console.log("All games successfully pushed to database");
//   } catch (error) {
//     console.error("Error pushing games to database:", error);
//   } finally {
//     process.exit(0);
//   }
// }

// pushGamesToDb();

/** @format */

import { db } from "@/server/db";
import { gamePlatforms, games, platforms } from "@/server/schema";
import { sql } from "drizzle-orm";

interface APIGame {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
}

async function fetchGames(): Promise<APIGame[]> {
  const response = await fetch("https://www.freetogame.com/api/games");
  return response.json();
}

async function pushGamesToDb() {
  try {
    const apiGames = await fetchGames();

    for (const apiGame of apiGames) {
      // Insert or update game
      await db
        .insert(games)
        .values({
          id: apiGame.id,
          title: apiGame.title,
          thumbnail: apiGame.thumbnail,
          shortDescription: apiGame.short_description,
          gameUrl: apiGame.game_url,
          genre: apiGame.genre,
          publisher: apiGame.publisher,
          developer: apiGame.developer,
          releaseDate: apiGame.release_date,
          freetogameProfileUrl: apiGame.freetogame_profile_url,
        })
        .onConflictDoUpdate({
          target: games.id,
          set: {
            title: apiGame.title,
            thumbnail: apiGame.thumbnail,
            shortDescription: apiGame.short_description,
            gameUrl: apiGame.game_url,
            genre: apiGame.genre,
            publisher: apiGame.publisher,
            developer: apiGame.developer,
            releaseDate: apiGame.release_date,
            freetogameProfileUrl: apiGame.freetogame_profile_url,
          },
        });

      // Insert platforms and link to game
      const platformNames = apiGame.platform.split(", ");
      for (const platformName of platformNames) {
        let platform = await db
          .select()
          .from(platforms)
          .where(sql`${platforms.name} = ${platformName}`)
          .limit(1)
          .then((results) => results[0]);

        if (!platform) {
          [platform] = await db
            .insert(platforms)
            .values({
              id: sql`default`,
              name: platformName,
            })
            .returning();
        }

        await db
          .insert(gamePlatforms)
          .values({
            gameId: apiGame.id,
            platformId: platform.id,
          })
          .onConflictDoNothing();
      }
    }

    console.log("All games successfully pushed to database");
  } catch (error) {
    console.error("Error pushing games to database:", error);
  } finally {
    process.exit(0);
  }
}

// Run the function
pushGamesToDb();
