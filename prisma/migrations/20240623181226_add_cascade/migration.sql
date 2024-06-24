-- DropForeignKey
ALTER TABLE "Condition" DROP CONSTRAINT "Condition_programId_fkey";

-- AddForeignKey
ALTER TABLE "Condition" ADD CONSTRAINT "Condition_programId_fkey" FOREIGN KEY ("programId") REFERENCES "StateProgram"("id") ON DELETE CASCADE ON UPDATE CASCADE;
