ALTER TABLE "writeup-app_writeup" ADD COLUMN "source" text DEFAULT 'pentesterland';--> statement-breakpoint
ALTER TABLE "writeup-app_writeup" ADD COLUMN "severity" text DEFAULT 'none';--> statement-breakpoint
ALTER TABLE "writeup-app_writeup" ADD COLUMN "summary" text;--> statement-breakpoint
ALTER TABLE "writeup-app_writeup_note" DROP COLUMN "iv";--> statement-breakpoint
ALTER TABLE "writeup-app_writeup_note" DROP COLUMN "is_encrypted";