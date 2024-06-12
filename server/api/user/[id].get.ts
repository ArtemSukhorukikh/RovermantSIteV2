import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    if (!id) {
        throw createError({
            status: 402,
            message: 'id не найден'
        })
    }
    const user = prisma.user.findFirst({where: {id: Number(id)}})

    if (user === null) {
        throw createError({
            status: 404,
            message: 'Пользователь не найден'
        })
    }
    return {user: user}
})