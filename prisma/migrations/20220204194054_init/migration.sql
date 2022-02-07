-- CreateTable
CREATE TABLE `Summoner` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `summonerId` VARCHAR(191) NOT NULL,
    `puuid` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `profileIconId` INTEGER NOT NULL,
    `summonerLevel` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `rankedStats` JSON NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Match` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `summonerId` INTEGER NOT NULL,
    `matchId` VARCHAR(191) NOT NULL,
    `gameStart` DATETIME(3) NOT NULL,
    `gameDuration` INTEGER NOT NULL,
    `gameMode` VARCHAR(191) NOT NULL,
    `gameVersion` VARCHAR(191) NOT NULL,
    `mapId` INTEGER NOT NULL,
    `platformId` VARCHAR(191) NOT NULL,
    `queueId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MatchTeam` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `matchId` INTEGER NOT NULL,
    `bans` JSON NULL,
    `objectives` JSON NULL,
    `teamId` INTEGER NOT NULL,
    `win` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MatchParticipant` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `matchId` INTEGER NOT NULL,
    `puuid` VARCHAR(191) NOT NULL,
    `summonerName` VARCHAR(191) NOT NULL,
    `profileIconId` INTEGER NOT NULL,
    `kills` INTEGER NOT NULL,
    `deaths` INTEGER NOT NULL,
    `assists` INTEGER NOT NULL,
    `challenges` JSON NULL,
    `championId` INTEGER NOT NULL,
    `championLevel` INTEGER NOT NULL,
    `items` JSON NOT NULL,
    `lane` VARCHAR(191) NOT NULL,
    `teamPosition` VARCHAR(191) NOT NULL,
    `perks` JSON NOT NULL,
    `styles` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Match` ADD CONSTRAINT `Match_summonerId_fkey` FOREIGN KEY (`summonerId`) REFERENCES `Summoner`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MatchTeam` ADD CONSTRAINT `MatchTeam_matchId_fkey` FOREIGN KEY (`matchId`) REFERENCES `Match`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MatchParticipant` ADD CONSTRAINT `MatchParticipant_matchId_fkey` FOREIGN KEY (`matchId`) REFERENCES `Match`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
