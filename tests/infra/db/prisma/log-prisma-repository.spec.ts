import { LogPrismaRepository } from '@/infra/db/prisma/log-prisma-repository'
import { prismaClientHelper } from '@/infra/helpers/prisma-client-helper'

describe('Log prisma repository', () => {
  beforeEach(async () => {
    await prismaClientHelper.log.deleteMany({})
  })
  afterEach(async () => {
    await prismaClientHelper.log.deleteMany({})
  })
  test('Should create log on success', async () => {
    const stack = 'any_error'
    const sut = new LogPrismaRepository()
    await sut.logError(stack)
    const logs = await prismaClientHelper.log.findFirst({
      where: {
        stack
      }
    })
    expect(logs.stack).toEqual(stack)
  })
})
