import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
    const companies = prisma.company.findMany()
    return {companies: companies}
})