/*
  Warnings:

  - Added the required column `teamId` to the `MatchParticipant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `match` DROP FOREIGN KEY `Match_summonerId_fkey`;

-- DropForeignKey
ALTER TABLE `matchparticipant` DROP FOREIGN KEY `MatchParticipant_matchId_fkey`;

-- DropForeignKey
ALTER TABLE `matchteam` DROP FOREIGN KEY `MatchTeam_matchId_fkey`;

-- AlterTable
ALTER TABLE `matchparticipant` ADD COLUMN `teamId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Match` ADD CONSTRAINT `Match_summonerId_fkey` FOREIGN KEY (`summonerId`) REFERENCES `Summoner`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MatchTeam` ADD CONSTRAINT `MatchTeam_matchId_fkey` FOREIGN KEY (`matchId`) REFERENCES `Match`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MatchParticipant` ADD CONSTRAINT `MatchParticipant_matchId_fkey` FOREIGN KEY (`matchId`) REFERENCES `Match`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
