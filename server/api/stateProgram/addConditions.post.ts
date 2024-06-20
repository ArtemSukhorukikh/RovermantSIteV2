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
            id:  Number(body.programId)
        }
    })

    if (!stateProg) {
        throw createError({
            status: 404,
            message: 'Программа не найдена'
        })
    }

    await prisma.stateProgram.update({where: {id: stateProg.id}, data: {status: 'INDEXED'}})
    

    const condition = await prisma.condition.createMany({data: body.conditions.map((cond: string) => { 
        return {
            programId: stateProg.id,
            condition: cond
        }
    })})

    return condition
})