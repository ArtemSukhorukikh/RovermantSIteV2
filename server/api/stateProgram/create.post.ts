import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const state = await prisma.stateProgram.create({
        data: {
            name: body.name,
            resource: body.resource,
            url: body.url,
        }
    })

    if (body.conditions) {
        for (const condition of body.conditions) {
            await prisma.condition.create({
                data:{
                    condition: condition.condition,
                    programId: state.id
                }
            })
        }
    }

    return state
})

type Condition = {
    programId: Number,
    condition: String
}