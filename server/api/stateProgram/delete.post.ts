import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log(body)

  if (!body.ids) {
    throw createError({
      status: 400,
      message: "Параметр ids пропущен",
    });
  }
  const { count } = await prisma.stateProgram.deleteMany({
    where: {
      id: {
        in: body.ids,
      },
    },
  });

  return count;
});
