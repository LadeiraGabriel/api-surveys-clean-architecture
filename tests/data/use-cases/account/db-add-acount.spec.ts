import type { Hasher } from '../../../../src/data/protocols/cryptography/Hasher'
import { DbAddAccount } from '../../../../src/data/use-cases/db-add-acount'

class HasherStub implements Hasher {
  async hash (value: string): Promise<string> {
    return Promise.resolve('any_hash')
  }
}

describe('Db Add Account', () => {
  test('Should call Hasher with correct value', async () => {
    const account = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    }
    const hasherStub = new HasherStub()
    const sut = new DbAddAccount(hasherStub)
    const hashSpy = jest.spyOn(hasherStub, 'hash')
    await sut.add(account)
    expect(hashSpy).toHaveBeenCalledWith(account.password)
  })
})
