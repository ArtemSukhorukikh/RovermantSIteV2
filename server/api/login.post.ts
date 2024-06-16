import { PrismaClient } from "@prisma/client";
import { compareSync } from "bcrypt-ts";
import { sing } from "../../tools/token";

const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });
  if (user === null) {
    setResponseStatus(event, 404, "Пользователь не найден");
    return;
  }

  const isSamePassword = compareSync(body.password, user.password as string);
  if (!isSamePassword) {
    setResponseStatus(event, 500, "Неправильный пароль");
    return;
  }

  const stringToken = await sing({ username: body.email });
  return {
    id: (await user).id,
    token: stringToken,
  };
});
