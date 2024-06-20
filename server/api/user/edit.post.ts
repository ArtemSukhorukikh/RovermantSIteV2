import { PrismaClient } from "@prisma/client";
import { genSaltSync, hashSync } from "bcrypt-ts";

const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  let user = await prisma.user.findFirst({ where: { id: body.id } });

  if (user === null) {
    throw createError({
      status: 404,
      message: "Пользователь не найден",
    });
  }

  const salt = genSaltSync(10);
  const hashPassowrd = hashSync(body.password, salt);

  user = await prisma.user.update({
    where: {
      id: body.id,
    },
    data: {
      name: body.name,
      surname: body.surname,
      patronymic: body.patronymic,
      email: body.email,
      password: hashPassowrd,
    },
  });

  return user;
});
