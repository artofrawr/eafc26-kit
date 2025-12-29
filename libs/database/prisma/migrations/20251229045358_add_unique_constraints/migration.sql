/*
  Warnings:

  - A unique constraint covering the columns `[name,leagueId]` on the table `Club` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,countryId]` on the table `League` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[displayName,ovr,qualityId,rarityId]` on the table `Player` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Club_name_leagueId_key" ON "Club"("name", "leagueId");

-- CreateIndex
CREATE UNIQUE INDEX "League_name_countryId_key" ON "League"("name", "countryId");

-- CreateIndex
CREATE UNIQUE INDEX "Player_displayName_ovr_qualityId_rarityId_key" ON "Player"("displayName", "ovr", "qualityId", "rarityId");
