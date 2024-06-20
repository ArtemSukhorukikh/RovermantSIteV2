import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({
      status: 402,
      message: "id не найден",
    });
  }

  const programs = await prisma.stateProgram.findMany({
    where: {
      status: "INDEXED",
      conditions: {
        some: {}
      }
    },
    include: {
      conditions: true,
    },
  });

  // Получаем все предприятия и их условия
  const companies = await prisma.company.findMany({
    where: { userId: Number(id) },
    include: {
      conditions: {
        include: {
          condition: true,
        },
      },
    },
  });

  const programsWithEligibleCompanies = programs.map((program) => {
    const programConditionIds = program.conditions.map((cond) => cond.id);

    const fullComplianceCompanies = [];
    const partialComplianceCompanies = [];
    const nonComplianceCompanies = [];

    for (const company of companies) {
      const companyConditionIds = company.conditions.map(
        (cond) => cond.conditionId
      );

      const matchingConditionIds = programConditionIds.filter((id) =>
        companyConditionIds.includes(id)
      );
      const nonMatchingConditionIds = programConditionIds.filter(
        (id) => !companyConditionIds.includes(id)
      );

      if (matchingConditionIds.length === programConditionIds.length) {
        // Полное соответствие
        fullComplianceCompanies.push(company);
      } else if (matchingConditionIds.length > 0) {
        // Частичное соответствие
        partialComplianceCompanies.push({
          ...company,
          matchingConditions: company.conditions.filter((cond) =>
            matchingConditionIds.includes(cond.conditionId)
          ),
          nonMatchingConditions: program.conditions.filter((cond) =>
            nonMatchingConditionIds.includes(cond.id)
          ),
        });
      } else {
        // Полное несоответствие
        nonComplianceCompanies.push(company);
      }
    }

    return {
      ...program,
      fullComplianceCompanies,
      partialComplianceCompanies,
      nonComplianceCompanies,
    };
  });

  return programsWithEligibleCompanies;
});
