import type { Hasher } from '../../../src/data/protocols/cryptography/Hasher'
import { BcryptAdapter } from '../../../src/infra/cryptography/bcrypt-adapter'
import bcrypt from 'bcrypt'

jest.mock('bcrypt', () => ({
  hash: () => 'any_hash'
}))

type SutType = {
  sut: Hasher
  salt: number
}

const makeSut = (): SutType => {
  const salt = 12
  const sut = new BcryptAdapter(salt)
  return {
    sut,
    salt
  }
}

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct values', async () => {
    const value = 'any_value'
    const { sut, salt } = makeSut()
    const spyHash = jest.spyOn(bcrypt, 'hash')
    await sut.hash(value)
    expect(spyHash).toHaveBeenCalledWith(value, salt)
  })

  test('Should throws if bcrypt throws', async () => {
    const value = 'any_value'
    const { sut } = makeSut()
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.hash(value)
    await expect(promise).rejects.toThrow()
  })

  test('Should return a hash on success', async () => {
    const value = 'any_value'
    const { sut } = makeSut()
    const result = await sut.hash(value)
    expect(result).toEqual('any_hash')
  })
})
