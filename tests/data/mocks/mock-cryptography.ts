import type { Encrypter } from '../../../src/data/protocols/cryptography/Encrypter'
import type { Hasher } from '../../../src/data/protocols/cryptography/Hasher'
import type { Decrypter } from '../../../src/data/protocols/cryptography/descrypter'
import type { HashComparer } from '../../../src/data/protocols/cryptography/hash-comparer'
import type { AddAccount } from '../../../src/domain/use-cases/add-account'

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

export class HashComparerStub implements HashComparer {
  async compare (plainText: HashComparer.Params): Promise<HashComparer.Result> {
    return Promise.resolve(true)
  }
}

export class EncrypterStub implements Encrypter {
  async encrypt (plainText: Encrypter.Params): Promise<Encrypter.Result> {
    return Promise.resolve('any_token')
  }
}

export const mockdecrypterStub = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (plainText: Encrypter.Params): Promise<Encrypter.Result> {
      return Promise.resolve('any_token')
    }
  }
  return new DecrypterStub()
}
