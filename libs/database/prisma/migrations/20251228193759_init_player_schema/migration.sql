/*
  Warnings:

  - You are about to drop the `CompanionAppState` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SbcChallenge` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SbcSolution` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserSession` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SbcSolution" DROP CONSTRAINT "SbcSolution_challengeId_fkey";

-- DropTable
DROP TABLE "CompanionAppState";

-- DropTable
DROP TABLE "SbcChallenge";

-- DropTable
DROP TABLE "SbcSolution";

-- DropTable
DROP TABLE "UserSession";

-- CreateTable
CREATE TABLE "Quality" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Quality_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rarity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Rarity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Country" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Position" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Position_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerPosition" (
    "id" SERIAL NOT NULL,
    "playerId" INTEGER NOT NULL,
    "positionId" INTEGER NOT NULL,

    CONSTRAINT "PlayerPosition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "League" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "countryId" INTEGER NOT NULL,

    CONSTRAINT "League_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Club" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "countryId" INTEGER NOT NULL,
    "leagueId" INTEGER NOT NULL,

    CONSTRAINT "Club_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Player" (
    "id" SERIAL NOT NULL,
    "displayName" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "qualityId" INTEGER NOT NULL,
    "rarityId" INTEGER NOT NULL,
    "ovr" INTEGER NOT NULL,
    "rating1" INTEGER NOT NULL,
    "rating2" INTEGER NOT NULL,
    "rating3" INTEGER NOT NULL,
    "rating4" INTEGER NOT NULL,
    "rating5" INTEGER NOT NULL,
    "rating6" INTEGER NOT NULL,
    "countryId" INTEGER NOT NULL,
    "clubId" INTEGER NOT NULL,
    "leagueId" INTEGER NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClubPlayer" (
    "id" SERIAL NOT NULL,
    "playerId" INTEGER NOT NULL,
    "sbc" BOOLEAN NOT NULL DEFAULT false,
    "squad" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ClubPlayer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Quality_name_key" ON "Quality"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Rarity_name_key" ON "Rarity"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Country_name_key" ON "Country"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Position_name_key" ON "Position"("name");

-- CreateIndex
CREATE INDEX "PlayerPosition_playerId_idx" ON "PlayerPosition"("playerId");

-- CreateIndex
CREATE INDEX "PlayerPosition_positionId_idx" ON "PlayerPosition"("positionId");

-- CreateIndex
CREATE UNIQUE INDEX "PlayerPosition_playerId_positionId_key" ON "PlayerPosition"("playerId", "positionId");

-- CreateIndex
CREATE INDEX "League_countryId_idx" ON "League"("countryId");

-- CreateIndex
CREATE INDEX "Club_countryId_idx" ON "Club"("countryId");

-- CreateIndex
CREATE INDEX "Club_leagueId_idx" ON "Club"("leagueId");

-- CreateIndex
CREATE INDEX "Player_qualityId_idx" ON "Player"("qualityId");

-- CreateIndex
CREATE INDEX "Player_rarityId_idx" ON "Player"("rarityId");

-- CreateIndex
CREATE INDEX "Player_countryId_idx" ON "Player"("countryId");

-- CreateIndex
CREATE INDEX "Player_clubId_idx" ON "Player"("clubId");

-- CreateIndex
CREATE INDEX "Player_leagueId_idx" ON "Player"("leagueId");

-- CreateIndex
CREATE INDEX "Player_ovr_idx" ON "Player"("ovr");

-- CreateIndex
CREATE INDEX "ClubPlayer_playerId_idx" ON "ClubPlayer"("playerId");

-- CreateIndex
CREATE INDEX "ClubPlayer_sbc_idx" ON "ClubPlayer"("sbc");

-- CreateIndex
CREATE INDEX "ClubPlayer_squad_idx" ON "ClubPlayer"("squad");

-- CreateIndex
CREATE UNIQUE INDEX "ClubPlayer_playerId_key" ON "ClubPlayer"("playerId");

-- AddForeignKey
ALTER TABLE "PlayerPosition" ADD CONSTRAINT "PlayerPosition_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerPosition" ADD CONSTRAINT "PlayerPosition_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "League" ADD CONSTRAINT "League_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Club" ADD CONSTRAINT "Club_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Club" ADD CONSTRAINT "Club_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "League"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_qualityId_fkey" FOREIGN KEY ("qualityId") REFERENCES "Quality"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_rarityId_fkey" FOREIGN KEY ("rarityId") REFERENCES "Rarity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "League"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClubPlayer" ADD CONSTRAINT "ClubPlayer_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;
