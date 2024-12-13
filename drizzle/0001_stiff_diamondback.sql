CREATE TABLE IF NOT EXISTS "user_metadata" (
	"user_id" text NOT NULL,
	"is_email_verified" boolean DEFAULT false,
	"phone_number" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "session" ADD COLUMN "deleted_at" timestamp with time zone;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_metadata" ADD CONSTRAINT "user_metadata_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
