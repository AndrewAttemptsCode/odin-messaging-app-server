/*
  Warnings:

  - Made the column `avatarColor` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `usernameColor` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "avatarColor" SET NOT NULL,
ALTER COLUMN "avatarColor" SET DEFAULT '#5f9ea0',
ALTER COLUMN "usernameColor" SET NOT NULL,
ALTER COLUMN "usernameColor" SET DEFAULT '#000000';
