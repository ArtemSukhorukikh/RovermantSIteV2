import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  console.log(id);
  if (!id) {
    throw createError({
      status: 400,
      message: "id не найден",
    });
  }
  const user = await prisma.user.findFirst({ where: { id: Number(id) } });
  if (!user) {
    throw createError({
      status: 400,
      message: "Пользователь не найден",
    });
  }

  const userCompanies = await prisma.company.findMany({
    where: { userId: Number(id) },
    include: {
      conditions: {
        include: {
          condition: true,
        },
      },
    },
  });

  if (userCompanies.length === 0) {
    throw createError({
      status: 400,
      message: "Предприятия не найдены",
    });
  }

  // Получаем все программы
  const programs = await prisma.stateProgram.findMany({
    include: {
      conditions: true,
    },
  });

  const companiesCompliance = [];

  for (const company of userCompanies) {
    const fullCompliancePrograms = [];
    const partialCompliancePrograms = [];

    for (const program of programs) {
      const programConditionIds = program.conditions.map((cond) => cond.id);
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
        fullCompliancePrograms.push({
          ...program,
          conditions: program.conditions,
        });
      } else if (matchingConditionIds.length > 0) {
        // Частичное соответствие
        partialCompliancePrograms.push({
          ...program,
          matchingConditions: program.conditions.filter((cond) =>
            matchingConditionIds.includes(cond.id)
          ),
          nonMatchingConditions: program.conditions.filter((cond) =>
            nonMatchingConditionIds.includes(cond.id)
          ),
        });
      }
    }

    companiesCompliance.push({
      ...company,
      fullCompliancePrograms,
      partialCompliancePrograms,
    });
  }

  return companiesCompliance;
});
