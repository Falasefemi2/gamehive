CREATE TABLE IF NOT EXISTS "public.games" (
	"id" integer PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"thumbnail" text,
	"short_description" text,
	"game_url" text,
	"genre" text,
	"publisher" text,
	"developer" text,
	"release_date" text,
	"freetogame_profile_url" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "public.libraries" (
	"user_id" uuid NOT NULL,
	"game_id" integer NOT NULL,
	"added_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "public.libraries_user_id_game_id_pk" PRIMARY KEY("user_id","game_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "public.platforms" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "public.platforms_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "public.users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" text NOT NULL,
	"email" text NOT NULL,
	"profile_picture_url" varchar(256),
	"first_name" varchar(256),
	"last_name" varchar(256),
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "public.users_username_unique" UNIQUE("username"),
	CONSTRAINT "public.users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DROP TABLE "public.game_game_platforms";--> statement-breakpoint
DROP TABLE "public.game_games";--> statement-breakpoint
DROP TABLE "public.game_libraries";--> statement-breakpoint
DROP TABLE "public.game_users";--> statement-breakpoint
ALTER TABLE "public.game_platforms" DROP CONSTRAINT "public.game_platforms_name_unique";--> statement-breakpoint
ALTER TABLE "public.game_platforms" ADD CONSTRAINT "public.game_platforms_game_id_platform_id_pk" PRIMARY KEY("game_id","platform_id");--> statement-breakpoint
ALTER TABLE "public.game_platforms" ADD COLUMN "game_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "public.game_platforms" ADD COLUMN "platform_id" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "public.libraries" ADD CONSTRAINT "public.libraries_user_id_public.users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."public.users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "public.libraries" ADD CONSTRAINT "public.libraries_game_id_public.games_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."public.games"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "public.game_platforms" ADD CONSTRAINT "public.game_platforms_game_id_public.games_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."public.games"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "public.game_platforms" ADD CONSTRAINT "public.game_platforms_platform_id_public.platforms_id_fk" FOREIGN KEY ("platform_id") REFERENCES "public"."public.platforms"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "public.game_platforms" DROP COLUMN IF EXISTS "id";--> statement-breakpoint
ALTER TABLE "public.game_platforms" DROP COLUMN IF EXISTS "name";