-- AlterTable
ALTER TABLE `matchparticipant` ADD COLUMN `summonerSpell1Id` INTEGER NULL,
    ADD COLUMN `summonerSpell2Id` INTEGER NULL,
    MODIFY `perks` JSON NULL;
