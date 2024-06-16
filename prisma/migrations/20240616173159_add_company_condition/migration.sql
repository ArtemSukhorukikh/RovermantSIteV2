-- CreateTable
CREATE TABLE "CompanyCondition" (
    "companyId" INTEGER NOT NULL,
    "conditionId" INTEGER NOT NULL,

    CONSTRAINT "CompanyCondition_pkey" PRIMARY KEY ("companyId","conditionId")
);

-- AddForeignKey
ALTER TABLE "CompanyCondition" ADD CONSTRAINT "CompanyCondition_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyCondition" ADD CONSTRAINT "CompanyCondition_conditionId_fkey" FOREIGN KEY ("conditionId") REFERENCES "Condition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
