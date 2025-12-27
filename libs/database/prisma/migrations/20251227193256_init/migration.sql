-- CreateTable
CREATE TABLE "UserSession" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "sessionId" TEXT NOT NULL,
    "data" JSONB,

    CONSTRAINT "UserSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SbcChallenge" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "challengeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "requirements" JSONB NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',

    CONSTRAINT "SbcChallenge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SbcSolution" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "challengeId" TEXT NOT NULL,
    "players" JSONB NOT NULL,
    "cost" DOUBLE PRECISION,
    "rating" INTEGER,
    "isValid" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "SbcSolution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanionAppState" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "state" JSONB NOT NULL,
    "sessionId" TEXT,

    CONSTRAINT "CompanionAppState_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserSession_sessionId_key" ON "UserSession"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "SbcChallenge_challengeId_key" ON "SbcChallenge"("challengeId");

-- AddForeignKey
ALTER TABLE "SbcSolution" ADD CONSTRAINT "SbcSolution_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "SbcChallenge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
