import type { CheckAccounByEmailRepository } from './../protocols/db/account/check-account-by-email-repository'
import type { AddAccountRepository } from '../protocols/db/account/add-account-repository'
import type { AddAccount } from '../../domain/use-cases/account/add-account'
import type { Hasher } from '../protocols/cryptography/Hasher'

export class DbAddAccount implements AddAccount {
  constructor (private readonly hasher: Hasher, private readonly addAccountRepository: AddAccountRepository, private readonly checkAccounByEmailRepository: CheckAccounByEmailRepository) { }
  async add (account: AddAccount.Params): Promise<AddAccount.Result> {
    await this.checkAccounByEmailRepository.checkByEmail(account.email)
    const passwordHashed = await this.hasher.hash(account.password)
    const result = await this.addAccountRepository.add({
      ...account,
      password: passwordHashed
    })
    return result
  }
}
