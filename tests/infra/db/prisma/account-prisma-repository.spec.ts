import { AccountPrismaRepository } from '../../../../src/infra/db/prisma/account-prisma-repository'
import { prismaClientHelper } from '../../../../src/infra/helpers/prisma-client-helper'

beforeEach(async () => {
  await prismaClientHelper.account.deleteMany({})
})

afterEach(async () => {
  await prismaClientHelper.account.deleteMany({})
})
describe('Account Prisma Repository', () => {
  describe('check account by email', () => {
    test('Should connect to the database create a user and return it through findUnique', async () => {
      await prismaClientHelper.account.create({
        data: {
          name: 'any_name',
          email: 'any_email',
          password: '$2b$12$0.L9KbPTZtGFz6C5kTpiN.MT8HmTyqpPMfAXxZi5CP9uGuWT45Upu'
        }
      })
      const account = await prismaClientHelper.account.findUnique({
        where: {
          email: 'any_email'
        }
      })

      const result = {
        name: 'any_name',
        email: 'any_email',
        password: '$2b$12$0.L9KbPTZtGFz6C5kTpiN.MT8HmTyqpPMfAXxZi5CP9uGuWT45Upu'
      }
      expect(account.id).toBeTruthy()
      expect(account.name).toEqual(result.name)
      expect(account.email).toEqual(result.email)
      expect(account.password).toEqual(result.password)
    })

    test('Should call prisma with correct value', async () => {
      const sut = new AccountPrismaRepository()
      const prismaSpy = jest.spyOn(prismaClientHelper.account, 'findUnique')
      await sut.checkByEmail('any_email')
      expect(prismaSpy).toHaveBeenCalledWith({
        where: { email: 'any_email' }
      })
    })

    test('Should return false if FindUnique return null', async () => {
      const sut = new AccountPrismaRepository()
      const result = await sut.checkByEmail('any_email')
      expect(result).toBeFalsy()
    })
  })
})
