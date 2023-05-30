import { BcryptAdapter } from '../../../src/infra/cryptography/bcrypt-adapter'
import bcrypt from 'bcrypt'

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct values', async () => {
    const salt = 12
    const value = 'any_value'
    const sut = new BcryptAdapter(salt)
    const spyHash = jest.spyOn(bcrypt, 'hash')
    await sut.hash(value)
    expect(spyHash).toHaveBeenCalledWith(value, salt)
  })
})
