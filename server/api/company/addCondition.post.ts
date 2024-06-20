import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    if (!body.companyId) {
        throw createError({
            status: 400,
            message: 'id компании не найден'
        })
    }

    if (!body.conditionId) {
        throw createError({
            status: 400,
            message: 'id усвловия не найден'
        })
    }

    const company = await prisma.company.findFirst({
        where: {
            id:  Number(body.companyId)
        }
    })

    if (!body.conditionId) {
        throw createError({
            status: 404,
            message: 'id усвловие не найдено'
        })
    }

    const condition = await prisma.company.findFirst({
        where: {
            id:  Number(body.companyId)
        }
    })

    if (!condition) {
        throw createError({
            status: 404,
            message: 'Усвловие не найдено'
        })
    }
    
    await prisma.companyCondition.create({
        data: {
            companyId: body.companyId,
            conditionId: body.conditionId
        }
    })

    return {message: 'ok'}
})