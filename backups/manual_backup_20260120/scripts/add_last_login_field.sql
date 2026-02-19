-- Migration: Add last_login_at to users table
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "last_login_at" TIMESTAMP(3);

-- Comment: This field tracks the last successful login time for each user.
COMMENT ON COLUMN "users"."last_login_at" IS 'Timestamp of the last successful user login';
