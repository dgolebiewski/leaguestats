/*
  Warnings:

  - Added the required column `neutralMinionsKilled` to the `MatchParticipant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `matchparticipant` ADD COLUMN `neutralMinionsKilled` INTEGER NOT NULL;
