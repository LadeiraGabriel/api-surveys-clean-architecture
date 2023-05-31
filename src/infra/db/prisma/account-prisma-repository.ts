import type { CheckAccounByEmailRepository } from '../../../data/protocols/db/account/check-account-by-email-repository'
import { prismaClientHelper } from '../../../../src/infra/helpers/prisma-client-helper'

export class AccountPrismaRepository implements CheckAccounByEmailRepository {
  async checkByEmail (email: CheckAccounByEmailRepository.Params): Promise<CheckAccounByEmailRepository.Result> {
    await prismaClientHelper.account.findUnique({
      where: {
        email
      }
    })
    return Promise.resolve(true)
  }
}
