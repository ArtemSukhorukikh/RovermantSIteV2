import { PrismaClient } from "@prisma/client";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { sing } from "../../tools/token";

const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log(body);

  const salt = genSaltSync(10);
  const hashPassowrd = hashSync(body.password, salt);
  let user = await prisma.user.findFirst({
    where: {
      email: body.email,
    },
  });
  console.log(user);
  if (user !== null) {
    throw createError({
      status: 500,
      message: "Пользователь с такой почтой уже существуеб",
    });
  }
  const newUser = await prisma.user.create({
    data: {
      email: body.email,
      password: hashPassowrd,
      name: body.name,
      surname: body.surname,
      patronymic: body.patronymic ?? null,
    },
  });
  if (newUser === null) {
    throw createError({
      status: 502,
      message: "Ошибка в создании пользователя",
    });
  }
  const id = (await newUser).id;
  if (id) {
    const stringToken = await sing({ username: body.email });
    return {
      id: (await newUser).id,
      token: stringToken,
    };
  }
  throw createError({
    status: 502,
    message: "Ошибка в создании пользователя",
  });
});
