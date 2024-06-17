-- DropForeignKey
ALTER TABLE "CompanyCondition" DROP CONSTRAINT "CompanyCondition_conditionId_fkey";

-- AddForeignKey
ALTER TABLE "CompanyCondition" ADD CONSTRAINT "CompanyCondition_conditionId_fkey" FOREIGN KEY ("conditionId") REFERENCES "Condition"("id") ON DELETE CASCADE ON UPDATE CASCADE;
