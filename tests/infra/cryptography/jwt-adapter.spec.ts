import Jwt from 'jsonwebtoken'
import { JwtAdapter } from '../../../src/infra/cryptography/jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  sign: async () => Promise.resolve('any_token')
}))

describe('jwt adapter', () => {
  test('Should call jwt with correct values', async () => {
    const sut = new JwtAdapter('secret')
    const jwtSpy = jest.spyOn(Jwt, 'sign')
    await sut.encrypt('any_value')
    expect(jwtSpy).toHaveBeenCalledWith({ id: 'any_value' }, 'secret')
  })

  test('Should throws if sign throws', async () => {
    const sut = new JwtAdapter('secret')
    jest.spyOn(Jwt, 'sign').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.encrypt('any_value')
    await expect(promise).rejects.toThrow()
  })

  test('Should return token on success', async () => {
    const sut = new JwtAdapter('secret')
    const result = await sut.encrypt('any_value')
    expect(result).toEqual('any_token')
  })
})
