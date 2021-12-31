-- CreateEnum
CREATE TYPE "DataProvider" AS ENUM ('TINDER', 'HINGE', 'BUMBLE');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TinderProfile" (
    "tinderId" TEXT,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "createDate" TIMESTAMP(3) NOT NULL,
    "gender" TEXT NOT NULL,
    "bio" TEXT,
    "city" TEXT,
    "region" TEXT,
    "instagram" BOOLEAN NOT NULL,
    "spotify" BOOLEAN NOT NULL,
    "jobs" JSONB NOT NULL,
    "schools" JSONB NOT NULL,
    "user_interests" TEXT[],
    "sexual_orientations" TEXT[],
    "appOpens" JSONB NOT NULL,
    "matches" JSONB NOT NULL,
    "swipeLikes" JSONB NOT NULL,
    "swipePasses" JSONB NOT NULL,
    "messagesSent" JSONB NOT NULL,
    "messagesReceived" JSONB NOT NULL,
    "messagesMeta" JSONB NOT NULL,
    "userId" INTEGER NOT NULL,
    "customDataId" TEXT
);

-- CreateTable
CREATE TABLE "CustomData" (
    "id" TEXT NOT NULL,
    "phoneNumbersExchanged" INTEGER NOT NULL,
    "dateArranged" INTEGER NOT NULL,
    "dateAttended" INTEGER NOT NULL,
    "dateCreepy" INTEGER NOT NULL,
    "dateNoSpark" INTEGER NOT NULL,
    "multipleDates" INTEGER NOT NULL,
    "sleptWithFirstDate" INTEGER NOT NULL,
    "sleptWithEventually" INTEGER NOT NULL,
    "relationshipsStarted" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "OriginalAnonymizedFile" (
    "id" SERIAL NOT NULL,
    "dataProvider" "DataProvider" NOT NULL,
    "file" JSONB NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OriginalAnonymizedFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Waitlist" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "dataProvider" "DataProvider" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Waitlist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TinderProfile_tinderId_key" ON "TinderProfile"("tinderId");

-- CreateIndex
CREATE UNIQUE INDEX "TinderProfile_userId_key" ON "TinderProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CustomData_id_key" ON "CustomData"("id");

-- AddForeignKey
ALTER TABLE "TinderProfile" ADD CONSTRAINT "TinderProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TinderProfile" ADD CONSTRAINT "TinderProfile_customDataId_fkey" FOREIGN KEY ("customDataId") REFERENCES "CustomData"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OriginalAnonymizedFile" ADD CONSTRAINT "OriginalAnonymizedFile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
