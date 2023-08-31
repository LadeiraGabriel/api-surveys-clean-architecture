import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter'
import bcrypt from 'bcrypt'

jest.mock('bcrypt', () => ({
  hash: () => 'any_hash',
  compare: () => true
}))

type SutType = {
  sut: BcryptAdapter
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
  describe('Hasher', () => {
    test('Should call Hasher with correct values', async () => {
      const value = 'any_value'
      const { sut, salt } = makeSut()
      const spyHash = jest.spyOn(bcrypt, 'hash')
      await sut.hash(value)
      expect(spyHash).toHaveBeenCalledWith(value, salt)
    })

    test('Should throws if Hasher throws', async () => {
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

  describe('Hash Comparer', () => {
    test('Should call hash comparer with correct values', async () => {
      const { sut } = makeSut()
      const spyCompare = jest.spyOn(bcrypt, 'compare')
      await sut.compare('any_value', 'any_hash')
      expect(spyCompare).toHaveBeenCalledWith('any_value', 'any_hash')
    })

    test('Should return false  if hash compare return false', async () => {
      const { sut } = makeSut()
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => false)
      const result = await sut.compare('any_value', 'any_hash')
      expect(result).toBeFalsy()
    })

    test('Should throws if hash comparer throws', async () => {
      const { sut } = makeSut()
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.compare('any_value', 'any_hash')
      await expect(promise).rejects.toThrow()
    })
    test('Should return true on success', async () => {
      const { sut } = makeSut()
      const result = await sut.compare('any_value', 'any_hash')
      expect(result).toBeTruthy()
    })
  })
})
