/*
  Warnings:

  - Added the required column `totalMinionsKilled` to the `MatchParticipant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `matchparticipant` ADD COLUMN `totalMinionsKilled` INTEGER NOT NULL;
