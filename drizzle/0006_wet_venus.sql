ALTER TABLE "writeup-app_writeup_note" ADD COLUMN "iv" text;--> statement-breakpoint
ALTER TABLE "writeup-app_writeup_note" ADD COLUMN "is_encrypted" boolean DEFAULT false;