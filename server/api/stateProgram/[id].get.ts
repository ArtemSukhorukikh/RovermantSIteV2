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

    const statePrograms = prisma.stateProgram.findFirst({
        where: {id: Number(id)}
    })

    return statePrograms
})