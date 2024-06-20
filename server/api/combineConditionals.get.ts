import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const companies = await prisma.company.findMany({
    where: {
      data: {
        not: Prisma.JsonNull,
      },
    },
  });

  const conditions = await prisma.condition.findMany();
  console.log(companies.length);
  console.log(conditions.length);

  companies.forEach((company) => {
    conditions.forEach( async (condition) => {
      await $fetch("http://127.0.0.1:5000/chekCondition", {
        method: "POST",
        body: {
          company: { id: company.id, data: JSON.stringify(company.data) },
          condition: { id: condition.id, condition: condition.condition },
        },
      });
      
    });
  });

  return {'message': 'ok'}
});