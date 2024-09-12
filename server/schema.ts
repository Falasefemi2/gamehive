/** @format */

import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { pgTableCreator, varchar } from "drizzle-orm/pg-core";
import {
  text,
  integer,
  timestamp,
  primaryKey,
  uuid,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

const databaseUrl = process.env.DATABASE_URL!;

// const schemaMatch = databaseUrl.match(/branch=([^&]+)/);
// const schemaName = schemaMatch ? schemaMatch[1] : "public";
const schemaMatch = databaseUrl.match(/branch=([^&]+)/);
const schemaName = schemaMatch ? schemaMatch[1] : "public"; // This defaults to "public"

const pgTable = pgTableCreator((name) => `${schemaName}.${name}`);

const sql = neon(databaseUrl);
export const db = drizzle(sql);

// User schema
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  profilePictureUrl: varchar("profile_picture_url", { length: 256 }),
  firstName: varchar("first_name", { length: 256 }),
  lastName: varchar("last_name", { length: 256 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Game schema
export const games = pgTable("games", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  thumbnail: text("thumbnail"),
  shortDescription: text("short_description"),
  gameUrl: text("game_url"),
  genre: text("genre"),
  publisher: text("publisher"),
  developer: text("developer"),
  releaseDate: text("release_date"),
  freetogameProfileUrl: text("freetogame_profile_url"),
});

// Platform schema
export const platforms = pgTable("platforms", {
  id: integer("id").primaryKey(),
  name: text("name").notNull().unique(),
});

// Game-Platform relation (many-to-many)
export const gamePlatforms = pgTable(
  "game_platforms",
  {
    gameId: integer("game_id")
      .notNull()
      .references(() => games.id),
    platformId: integer("platform_id")
      .notNull()
      .references(() => platforms.id),
  },
  (t) => ({
    pk: primaryKey(t.gameId, t.platformId),
  })
);

// Library schema (for favorite games)
export const libraries = pgTable(
  "libraries",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id),
    gameId: integer("game_id")
      .notNull()
      .references(() => games.id),
    addedAt: timestamp("added_at").defaultNow().notNull(),
  },
  (t) => ({
    pk: primaryKey(t.userId, t.gameId),
  })
);

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  libraries: many(libraries),
}));

export const gamesRelations = relations(games, ({ many }) => ({
  platforms: many(gamePlatforms),
  libraries: many(libraries),
}));

export const platformsRelations = relations(platforms, ({ many }) => ({
  games: many(gamePlatforms),
}));
