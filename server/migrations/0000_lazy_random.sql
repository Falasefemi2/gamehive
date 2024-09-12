CREATE TABLE IF NOT EXISTS "public.game_game_platforms" (
	"game_id" integer NOT NULL,
	"platform_id" integer NOT NULL,
	CONSTRAINT "public.game_game_platforms_game_id_platform_id_pk" PRIMARY KEY("game_id","platform_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "public.game_games" (
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
CREATE TABLE IF NOT EXISTS "public.game_libraries" (
	"user_id" uuid NOT NULL,
	"game_id" integer NOT NULL,
	"added_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "public.game_libraries_user_id_game_id_pk" PRIMARY KEY("user_id","game_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "public.game_platforms" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "public.game_platforms_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "public.game_users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" text NOT NULL,
	"email" text NOT NULL,
	"profile_picture_url" varchar(256),
	"first_name" varchar(256),
	"last_name" varchar(256),
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "public.game_users_username_unique" UNIQUE("username"),
	CONSTRAINT "public.game_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "public.game_game_platforms" ADD CONSTRAINT "public.game_game_platforms_game_id_public.game_games_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."public.game_games"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "public.game_game_platforms" ADD CONSTRAINT "public.game_game_platforms_platform_id_public.game_platforms_id_fk" FOREIGN KEY ("platform_id") REFERENCES "public"."public.game_platforms"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "public.game_libraries" ADD CONSTRAINT "public.game_libraries_user_id_public.game_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."public.game_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "public.game_libraries" ADD CONSTRAINT "public.game_libraries_game_id_public.game_games_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."public.game_games"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
