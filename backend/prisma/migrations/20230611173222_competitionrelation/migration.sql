-- AddForeignKey
ALTER TABLE `PodiumPrediction` ADD CONSTRAINT `PodiumPrediction_competitionId_fkey` FOREIGN KEY (`competitionId`) REFERENCES `Competition`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
