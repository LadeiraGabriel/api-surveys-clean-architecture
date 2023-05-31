import { PrismaClient } from '@prisma/client'

export const prismaClientHelper = (): PrismaClient => {
  return new PrismaClient()
}
