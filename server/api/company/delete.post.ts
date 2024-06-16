import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body.ids) {
    throw createError({
      status: 402,
      message: "Параметр ids пропущен",
    });
  }
  const { count } = await prisma.company.deleteMany({
    where: {
      id: {
        in: body.ids,
      },
    },
  });

  return count;
});
