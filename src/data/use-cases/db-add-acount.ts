import type { AddAccountRepository } from './../protocols/db/add-account-repository'
import type { AddAccount } from '../../domain/use-cases/account/add-account'
import type { Hasher } from '../protocols/cryptography/Hasher'

export class DbAddAccount implements AddAccount {
  constructor (private readonly hasher: Hasher, private readonly addAccountRepository: AddAccountRepository) { }
  async add (account: AddAccount.Params): Promise<AddAccount.Result> {
    const passwordHashed = await this.hasher.hash(account.password)
    const result = await this.addAccountRepository.add({
      ...account,
      password: passwordHashed
    })
    return result
  }
}
