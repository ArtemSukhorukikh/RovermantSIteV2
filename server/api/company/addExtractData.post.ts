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

    const company = await prisma.company.findFirst({
        where: {
            id: body.companyId
        }
    })

    if (!company) {
        throw createError({
            status: 404,
            message: 'Компания не найдена'
        })
    }

    await prisma.company.update({where: {id: body.companyId}, data: {data: body.data}})
    

    return company
})