import { prismaClientHelper } from '../../../../src/infra/helpers/prisma-client-helper'
import type { LoadAccountByEmailRepository, UpdateAcessTokenRepository, CheckAccounByEmailRepository, AddAccountRepository } from '../../../data/protocols/db/account'

export class AccountPrismaRepository implements CheckAccounByEmailRepository, AddAccountRepository, LoadAccountByEmailRepository, UpdateAcessTokenRepository {
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
    const account = await prismaClientHelper.account.findUnique({
      where: {
        email: plainText
      }
    })

    return account
  }

  async update (identify: UpdateAcessTokenRepository.Params, dataUpdate: UpdateAcessTokenRepository.Params): Promise<void> {
    await prismaClientHelper.account.update({
      where: {
        id: identify
      },
      data: {
        token: dataUpdate
      }
    })
  }
}
