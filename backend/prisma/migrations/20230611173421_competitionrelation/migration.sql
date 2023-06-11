-- DropForeignKey
ALTER TABLE `PodiumPrediction` DROP FOREIGN KEY `PodiumPrediction_competitionId_fkey`;

-- AlterTable
ALTER TABLE `PodiumPrediction` MODIFY `competitionId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `PodiumPrediction` ADD CONSTRAINT `PodiumPrediction_competitionId_fkey` FOREIGN KEY (`competitionId`) REFERENCES `Competition`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
