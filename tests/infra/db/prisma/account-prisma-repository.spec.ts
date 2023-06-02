import { AccountPrismaRepository } from '../../../../src/infra/db/prisma/account-prisma-repository'
import { prismaClientHelper } from '../../../../src/infra/helpers/prisma-client-helper'
import { makeCreateAccount } from './mocks/mock-prisma-repository'

beforeEach(async () => {
  await prismaClientHelper.account.deleteMany({})
})

afterEach(async () => {
  await prismaClientHelper.account.deleteMany({})
})

const makeSut = (): AccountPrismaRepository => {
  return new AccountPrismaRepository()
}
describe('Account Prisma Repository', () => {
  describe('check account by email repository', () => {
    test('Should connect to the database create a user and return it through findUnique', async () => {
      const result = await makeCreateAccount()
      const account = await prismaClientHelper.account.findUnique({ where: { email: 'any_email' } })
      expect(account.id).toBeTruthy()
      expect(account.name).toEqual(result.name)
      expect(account.email).toEqual(result.email)
      expect(account.password).toEqual(result.password)
    })

    test('Should call prisma with correct value', async () => {
      const sut = makeSut()
      const prismaSpy = jest.spyOn(prismaClientHelper.account, 'findUnique')
      await sut.checkByEmail('any_email')
      expect(prismaSpy).toHaveBeenCalledWith({
        where: { email: 'any_email' }
      })
    })

    test('Should return false if FindUnique not return account', async () => {
      const sut = makeSut()
      const result = await sut.checkByEmail('any_email')
      expect(result).toBeFalsy()
    })

    test('Should return true if prisma return a account', async () => {
      await makeCreateAccount()
      const sut = makeSut()
      const result = await sut.checkByEmail('any_email')
      expect(result).toBeTruthy()
    })
  })

  describe('add account repository', () => {
    test('Should call create with correct values', async () => {
      const sut = makeSut()
      const account = {
        name: 'any_name',
        email: 'any_email',
        password: '$2b$12$0.L9KbPTZtGFz6C5kTpiN.MT8HmTyqpPMfAXxZi5CP9uGuWT45Upu'
      }
      const createSpy = jest.spyOn(prismaClientHelper.account, 'create')
      await sut.add(account)
      expect(createSpy).toHaveBeenCalledWith({ data: account })
    })
  })
})
