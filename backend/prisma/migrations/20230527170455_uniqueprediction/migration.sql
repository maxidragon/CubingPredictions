/*
  Warnings:

  - A unique constraint covering the columns `[authorId,competitionId,eventId]` on the table `PodiumPrediction` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `PodiumPrediction_authorId_competitionId_eventId_key` ON `PodiumPrediction`(`authorId`, `competitionId`, `eventId`);
