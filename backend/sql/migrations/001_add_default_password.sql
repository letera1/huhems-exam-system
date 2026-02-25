-- Migration: Add default_password column to users table
-- This allows tracking of initial passwords for display purposes

-- Add the default_password column
ALTER TABLE users ADD COLUMN IF NOT EXISTS default_password text NULL;

-- Add last_login_at if it doesn't exist (for completeness)
ALTER TABLE users ADD COLUMN IF NOT EXISTS last_login_at timestamptz NULL;

-- Add password_changed_at if it doesn't exist (for completeness)
ALTER TABLE users ADD COLUMN IF NOT EXISTS password_changed_at timestamptz NULL;
