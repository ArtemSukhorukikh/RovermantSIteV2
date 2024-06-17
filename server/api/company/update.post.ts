import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const user = await prisma.user.findFirst({ where: { id: body.userId } });

  if (user === null) {
    throw createError({
      status: 404,
      message: "Пользователь не найден",
    });
  }

  let company = await prisma.company.findFirst({ where: { id: body.id } });

  if (company === null) {
    throw createError({
      status: 404,
      message: "Предприятие не найдено",
    });
  }

  await prisma.companyCondition.deleteMany({
    where: { companyId: body.id },
  });

  company = await prisma.company.update({
    where: {
      id: body.id,
    },
    data: {
      name: body.name,
      description: body.description,
      userId: user.id,
      conditions: {
        set: [],
      },
      data: undefined,
    },
    include: {
      conditions: true,
    },
  });

  return { company: company };
});
