import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const user = await prisma.user.findFirst({where: {id: body.userId}})

    if (user === null) {
        throw createError({
            status: 404,
            message: 'Пользователь не найден'
        })
    }

    const company = await prisma.company.create({
        data: {
            name: body.name,
            description: body.description,
            userId: user.id
        }
    })

    return {company : company}
})