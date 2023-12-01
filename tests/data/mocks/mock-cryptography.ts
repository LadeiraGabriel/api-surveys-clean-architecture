import type { Encrypter } from '@/data/protocols/cryptography'
import type { Hasher } from '@/data/protocols/cryptography/Hasher'
import type { Decrypter } from '@/data/protocols/cryptography/descrypter'
import type { HashComparer } from '@/data/protocols/cryptography/hash-comparer'
import type { AddAccount } from '@/domain/use-cases/add-account'

export const mockFakeAccount = (): AddAccount.Params => ({
  name: 'any_name',
  email: 'any_email',
  password: 'any_password'
})
export class HasherSpy implements Hasher {
  value: string
  result: string = 'any_hash'
  async hash (value: string): Promise<string> {
    this.value = value
    return this.result
  }
}

export class HashComparerSpy implements HashComparer {
  plainText: HashComparer.Params
  result: HashComparer.Result = true
  async compare (plainText: HashComparer.Params): Promise<HashComparer.Result> {
    this.plainText = plainText
    return this.result
  }
}

export class EncrypterSpy implements Encrypter {
  plainText: Encrypter.Params
  result: Encrypter.Result = 'any_token'
  async encrypt (plainText: Encrypter.Params): Promise<Encrypter.Result> {
    this.plainText = plainText
    return this.result
  }
}

export class DecrypterSpy implements Decrypter {
  plainText: Decrypter.Params
  result: Decrypter.Result = 'any_token'
  async decrypt (plainText: Decrypter.Params): Promise<Decrypter.Result> {
    this.plainText = plainText
    return this.result
  }
}
