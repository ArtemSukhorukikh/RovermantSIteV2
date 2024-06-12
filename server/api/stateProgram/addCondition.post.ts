import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    if (!body.programId) {
        throw createError({
            status: 402,
            message: 'id программы не найден'
        })
    }

    const stateProg = await prisma.stateProgram.findFirst({
        where: {
            id: body.programId
        }
    })

    if (!stateProg) {
        throw createError({
            status: 404,
            message: 'Программа не найдена'
        })
    }

    const condition = prisma.condition.create({data: {
        programId: stateProg.id,
        condition: body.condition
    }})

    return condition
})