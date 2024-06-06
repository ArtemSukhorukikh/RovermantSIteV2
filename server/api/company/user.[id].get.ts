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

    const company = await prisma.company.findMany({
        include:{
            user: true,
        },
        where: {userId: Number(id) }
    })

    if (company === null) {
        throw createError({
            status: 404,
            message: 'Предприятие не найдено'
        })
    }
    return {company: company}
})