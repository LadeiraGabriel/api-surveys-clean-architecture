import type { AddAccount } from '../../domain/use-cases/account/add-account'
import type { Hasher } from '../protocols/cryptography/Hasher'

export class DbAddAccount implements AddAccount {
  constructor (private readonly hasher: Hasher) {}
  async add (account: AddAccount.Params): Promise<AddAccount.Result> {
    await this.hasher.hash(account.password)
    return Promise.resolve(true)
  }
}
