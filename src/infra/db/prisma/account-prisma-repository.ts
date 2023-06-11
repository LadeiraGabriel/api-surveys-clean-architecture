import type { CheckAccounByEmailRepository } from '../../../data/protocols/db/account/check-account-by-email-repository'
import type { AddAccountRepository } from '../../../data/protocols/db/account/add-account-repository'
import { prismaClientHelper } from '../../../../src/infra/helpers/prisma-client-helper'
import type { LoadAccountByEmailRepository } from '../../../data/protocols/db/account'

export class AccountPrismaRepository implements CheckAccounByEmailRepository, AddAccountRepository, LoadAccountByEmailRepository {
  async checkByEmail (email: CheckAccounByEmailRepository.Params): Promise<CheckAccounByEmailRepository.Result> {
    const findAccount = await prismaClientHelper.account.findUnique({
      where: {
        email
      }
    })
    return findAccount !== null
  }

  async add (account: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    const result = await prismaClientHelper.account.create({
      data: account
    })
    return result !== null
  }

  async loadByEmail (plainText: LoadAccountByEmailRepository.Params): Promise<LoadAccountByEmailRepository.Result> {
    await prismaClientHelper.account.findUnique({
      where: {
        email: plainText
      }
    })

    return Promise.resolve(null)
  }
}
