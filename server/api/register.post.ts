import { PrismaClient } from '@prisma/client'
import { genSaltSync, hashSync } from "bcrypt-ts";
import { sing } from "../../tools/token"

const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    console.log(body)

    const salt = genSaltSync(10)
    const hashPassowrd = hashSync(body.password, salt)
    let user = prisma.user.findUnique({
        where: {
            email: body.email
        }
    })
    if (user !== null) {
        setResponseStatus(event, 500, 'Пользователь с такими email уже существует')
        return
    }
    const newUser = await prisma.user.create({
        data: {
            email: body.email,
            password: hashPassowrd,
            name: body.name, 
            surname: body.surname,
            patronymic: body.patronymic ?? null
        }
    })
    if (user === null) {
        setResponseStatus(event, 500, 'Ошибка при создании пользователя')
        return
    }
    const id = (await newUser).id
    if (id) {
        const stringToken = await sing({username: body.email}) 
        return {
            id: (await newUser).id,
            token: stringToken
        }
    }
    setResponseStatus(event, 500, 'Ошибка при регистрации')
    return
})