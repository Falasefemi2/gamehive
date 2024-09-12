"use strict";
/** @format */
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
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
//       // Check if the game already exists in the database
//       const existingGame = await db
//         .select()
//         .from(games)
//         .where(sql`${games.id} = ${apiGame.id}`)
//         .limit(1);
//       if (existingGame.length === 0) {
//         // Insert new game
//         await db.insert(games).values({
//           id: apiGame.id,
//           title: apiGame.title,
//           thumbnail: apiGame.thumbnail,
//           shortDescription: apiGame.short_description,
//           gameUrl: apiGame.game_url,
//           genre: apiGame.genre,
//           publisher: apiGame.publisher,
//           developer: apiGame.developer,
//           releaseDate: apiGame.release_date,
//           freetogameProfileUrl: apiGame.freetogame_profile_url,
//         });
//         // Insert platforms and link to game
//         const platformNames = apiGame.platform.split(", ");
//         for (const platformName of platformNames) {
//           let platform = await db
//             .select()
//             .from(platforms)
//             .where(sql`${platforms.name} = ${platformName}`)
//             .limit(1)
//             .then((results) => results[0]);
//           if (!platform) {
//             [platform] = await db
//               .insert(platforms)
//               .values({
//                 id: sql`default`,
//                 name: platformName,
//               })
//               .returning();
//           }
//           await db
//             .insert(gamePlatforms)
//             .values({
//               gameId: apiGame.id,
//               platformId: platform.id,
//             })
//             .onConflictDoNothing();
//         }
//       }
//     }
//     console.log("New games successfully pushed to database");
//   } catch (error) {
//     console.error("Error pushing games to database:", error);
//   }
// }
// pushGamesToDb();
/** @format */
var db_1 = require("@/server/db");
var schema_1 = require("@/server/schema");
var drizzle_orm_1 = require("drizzle-orm");
function fetchGames() {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("https://www.freetogame.com/api/games")];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.json()];
            }
        });
    });
}
function pushGamesToDb() {
    return __awaiter(this, void 0, void 0, function () {
        var apiGames, _i, apiGames_1, apiGame, existingGame, platformNames, _a, platformNames_1, platformName, platform, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 13, 14, 15]);
                    return [4 /*yield*/, fetchGames()];
                case 1:
                    apiGames = _b.sent();
                    _i = 0, apiGames_1 = apiGames;
                    _b.label = 2;
                case 2:
                    if (!(_i < apiGames_1.length)) return [3 /*break*/, 12];
                    apiGame = apiGames_1[_i];
                    return [4 /*yield*/, db_1.db
                            .select()
                            .from(schema_1.games)
                            .where((0, drizzle_orm_1.sql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["", " = ", ""], ["", " = ", ""])), schema_1.games.id, apiGame.id))
                            .limit(1)];
                case 3:
                    existingGame = _b.sent();
                    if (!(existingGame.length === 0)) return [3 /*break*/, 11];
                    // Insert new game
                    return [4 /*yield*/, db_1.db.insert(schema_1.games).values({
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
                        })];
                case 4:
                    // Insert new game
                    _b.sent();
                    platformNames = apiGame.platform.split(", ");
                    _a = 0, platformNames_1 = platformNames;
                    _b.label = 5;
                case 5:
                    if (!(_a < platformNames_1.length)) return [3 /*break*/, 11];
                    platformName = platformNames_1[_a];
                    return [4 /*yield*/, db_1.db
                            .select()
                            .from(schema_1.platforms)
                            .where((0, drizzle_orm_1.sql)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["", " = ", ""], ["", " = ", ""])), schema_1.platforms.name, platformName))
                            .limit(1)
                            .then(function (results) { return results[0]; })];
                case 6:
                    platform = _b.sent();
                    if (!!platform) return [3 /*break*/, 8];
                    return [4 /*yield*/, db_1.db
                            .insert(schema_1.platforms)
                            .values({
                            id: (0, drizzle_orm_1.sql)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["default"], ["default"]))),
                            name: platformName,
                        })
                            .returning()];
                case 7:
                    platform = (_b.sent())[0];
                    _b.label = 8;
                case 8: return [4 /*yield*/, db_1.db
                        .insert(schema_1.gamePlatforms)
                        .values({
                        gameId: apiGame.id,
                        platformId: platform.id,
                    })
                        .onConflictDoNothing()];
                case 9:
                    _b.sent();
                    _b.label = 10;
                case 10:
                    _a++;
                    return [3 /*break*/, 5];
                case 11:
                    _i++;
                    return [3 /*break*/, 2];
                case 12:
                    console.log("New games successfully pushed to database");
                    return [3 /*break*/, 15];
                case 13:
                    error_1 = _b.sent();
                    console.error("Error pushing games to database:", error_1);
                    return [3 /*break*/, 15];
                case 14:
                    process.exit(0);
                    return [7 /*endfinally*/];
                case 15: return [2 /*return*/];
            }
        });
    });
}
// Run the function
pushGamesToDb();
var templateObject_1, templateObject_2, templateObject_3;
