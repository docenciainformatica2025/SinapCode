
-- ⚠️ WARNING: Run this only if you see DUPLICATE tables in Supabase (e.g. "User" and "users")
-- The application uses the lowercase plural tables ("users", "accounts", etc.)
-- This script renames the unused PascalCase tables to avoid confusion.

BEGIN;

-- 1. Archive "User" -> "User_Archived"
DO $$ 
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'User') THEN
        ALTER TABLE "User" RENAME TO "User_Archived";
        RAISE NOTICE 'Archived table "User" to "User_Archived"';
    END IF;
END $$;

-- 2. Archive "Account" -> "Account_Archived"
DO $$ 
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'Account') THEN
        ALTER TABLE "Account" RENAME TO "Account_Archived";
        RAISE NOTICE 'Archived table "Account" to "Account_Archived"';
    END IF;
END $$;

-- 3. Archive "Session" -> "Session_Archived"
DO $$ 
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'Session') THEN
        ALTER TABLE "Session" RENAME TO "Session_Archived";
        RAISE NOTICE 'Archived table "Session" to "Session_Archived"';
    END IF;
END $$;

-- 4. Archive "VerificationToken" -> "VerificationToken_Archived"
DO $$ 
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'VerificationToken') THEN
        ALTER TABLE "VerificationToken" RENAME TO "VerificationToken_Archived";
        RAISE NOTICE 'Archived table "VerificationToken" to "VerificationToken_Archived"';
    END IF;
END $$;

COMMIT;
