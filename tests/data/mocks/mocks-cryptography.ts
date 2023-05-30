import type { Hasher } from '../../../src/data/protocols/cryptography/Hasher'
import type { AddAccount } from '../../../src/domain/use-cases/account/add-account'

export const mockFakeAccount = (): AddAccount.Params => ({
  name: 'any_name',
  email: 'any_email',
  password: 'any_password'
})
export class HasherStub implements Hasher {
  async hash (value: string): Promise<string> {
    return Promise.resolve('any_hash')
  }
}
