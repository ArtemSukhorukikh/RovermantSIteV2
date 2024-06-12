-- CreateEnum
CREATE TYPE "ProgramStatus" AS ENUM ('INDEXED', 'NEEDINDEXED');

-- CreateTable
CREATE TABLE "StateProgram" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "resource" TEXT NOT NULL,
    "path" TEXT,
    "url" TEXT,
    "status" "ProgramStatus" NOT NULL DEFAULT 'NEEDINDEXED',

    CONSTRAINT "StateProgram_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Condition" (
    "id" SERIAL NOT NULL,
    "programId" INTEGER NOT NULL,
    "condition" TEXT NOT NULL,

    CONSTRAINT "Condition_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Condition" ADD CONSTRAINT "Condition_programId_fkey" FOREIGN KEY ("programId") REFERENCES "StateProgram"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
