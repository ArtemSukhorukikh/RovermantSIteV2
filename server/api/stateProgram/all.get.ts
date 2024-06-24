import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const statePrograms = prisma.stateProgram.findMany({
    include: {
      conditions: true,
    },
    orderBy: {
      id: "asc",
    }
  });

  return statePrograms;
});
