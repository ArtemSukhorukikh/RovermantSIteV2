import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const  user = prisma.user.create({
        data: {
            email: body.email,
            password: body.password
        }
    })
    return {
        id: (await user).id
    }
})