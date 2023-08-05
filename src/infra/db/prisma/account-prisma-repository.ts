import { prismaClientHelper } from '../../../../src/infra/helpers/prisma-client-helper'
import type { LoadAccountByEmailRepository, UpdateAccessTokenRepository, CheckAccounByEmailRepository, AddAccountRepository, LoadAccountByTokenRepository } from '../../../data/protocols/db/account'

export class AccountPrismaRepository implements CheckAccounByEmailRepository, AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository, LoadAccountByTokenRepository {
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

  async update (identify: UpdateAccessTokenRepository.Params, dataUpdate: UpdateAccessTokenRepository.Params): Promise<void> {
    await prismaClientHelper.account.update({
      where: {
        id: identify
      },
      data: {
        token: dataUpdate
      }
    })
  }

  async loadAccountByToken (accessToken: string, role?: string): Promise<LoadAccountByTokenRepository.Result> {
    return await prismaClientHelper.account.findFirst({
      where: {
        token: accessToken
      }
    })
  }
}
