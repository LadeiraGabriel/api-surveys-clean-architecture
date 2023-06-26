import type { LogErrorRepository } from '../../../data/protocols/db/log/log-error-repository'
import { prismaClientHelper } from '../../helpers/prisma-client-helper'

export class LogPrismaRepository implements LogErrorRepository {
  async logError (stack: string): Promise<void> {
    const date = new Date()
    await prismaClientHelper.log.create({
      data: {
        stack,
        date
      }
    })
  }
}
