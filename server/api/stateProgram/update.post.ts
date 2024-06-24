import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log(body)

  let state = null;

  const formData = new FormData();


  state = await prisma.stateProgram.update({
    where: {
      id: body.id,
    },
    data: {
      name: body.name,
      resource: body.resource,
    },
  });

  if (body.needReindex) {
    const conditions = await prisma.condition.findMany({
      where: {
        programId: state.id
      }
    })
  
    conditions.forEach(async (condition) => {
      await prisma.condition.delete({
        where: {
          id: condition.id
        }
      })
    })

    // console.log(body.path);
    if (body.path) {
      const path = await storeFileLocally(
        body.path, // the file object
        15, // you can add a name for the file or length of Unique ID that will be automatically generated!
        "/userFiles" // the folder the file will be stored in
      );

      state = await prisma.stateProgram.update({
        where: {
          id: body.id,
        },
        data: {
          path: path,
          status: "NEEDINDEXED"
        },
      });

      const fileToSend = base64ToFile(
        body.path.content.split(",")[1],
        path,
        body.path.type
      );

      formData.append("file", fileToSend, path);
      formData.append("stateProgramId", state.id.toString());
    } else if (body.url) {
      state = await prisma.stateProgram.update({
        where: {
          id: body.id,
        },
        data: {
          name: body.name,
          resource: body.resource,
          url: body.url,
          status: "NEEDINDEXED"
        },
      });
      formData.append("fileUrl", body.url);
      formData.append("stateProgramId", state.id.toString());
    } else {
      throw createError({
        status: 500,
        message: "Нет файла",
      });
    }

    await $fetch("http://127.0.0.1:5000/conditions", {
      method: "POST",
      body: formData,
    });
  }

  return state;
});

function base64ToFile(
  base64String: string,
  fileName: string,
  mimeType: string
) {
  // Декодирование строки base64
  const byteCharacters = atob(base64String);

  // Преобразование декодированной строки в массив байтов
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  // Создание массива байтов
  const byteArray = new Uint8Array(byteNumbers);

  // Создание Blob объекта
  const blob = new Blob([byteArray], { type: mimeType });

  // Преобразование Blob в File
  const file = new File([blob], fileName, { type: mimeType });

  return file;
}
