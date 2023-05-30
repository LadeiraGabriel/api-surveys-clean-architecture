import { BcryptAdapter } from '../../../src/infra/cryptography/bcrypt-adapter'
import bcrypt from 'bcrypt'

jest.mock('bcrypt', () => ({
  hash: () => 'any_hash'
}))

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct values', async () => {
    const salt = 12
    const value = 'any_value'
    const sut = new BcryptAdapter(salt)
    const spyHash = jest.spyOn(bcrypt, 'hash')
    await sut.hash(value)
    expect(spyHash).toHaveBeenCalledWith(value, salt)
  })

  test('Should throws if bcrypt throws', async () => {
    const salt = 12
    const value = 'any_value'
    const sut = new BcryptAdapter(salt)
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.hash(value)
    await expect(promise).rejects.toThrow()
  })
})
