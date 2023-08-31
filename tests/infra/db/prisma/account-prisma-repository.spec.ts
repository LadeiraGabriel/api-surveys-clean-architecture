import { AccountPrismaRepository } from '@/infra/db/prisma/account-prisma-repository'
import { prismaClientHelper } from '@/infra/helpers/prisma-client-helper'
import { mockCreateAccount } from './mocks/mock-prisma-repository'

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
    test('Should return false if checkByEmail not return account', async () => {
      const sut = makeSut()
      const result = await sut.checkByEmail('any_email')
      expect(result).toBeFalsy()
    })

    test('Should return true if prisma return a account', async () => {
      await mockCreateAccount()
      const sut = makeSut()
      const result = await sut.checkByEmail('any_email')
      expect(result).toBeTruthy()
    })
  })

  describe('add account repository', () => {
    test('Should return false if create return null', async () => {
      const sut = makeSut()
      const account = {
        name: 'any_name',
        email: 'any_email',
        password: '$2b$12$0.L9KbPTZtGFz6C5kTpiN.MT8HmTyqpPMfAXxZi5CP9uGuWT45Upu'
      }
      jest.spyOn(prismaClientHelper.account, 'create').mockImplementationOnce(() => {
        return null
      })
      const result = await sut.add(account)
      expect(result).toBeFalsy()
    })

    test('Should return true on sucess', async () => {
      const sut = makeSut()
      const account = {
        name: 'any_name',
        email: 'any_email',
        password: '$2b$12$0.L9KbPTZtGFz6C5kTpiN.MT8HmTyqpPMfAXxZi5CP9uGuWT45Upu'
      }
      const result = await sut.add(account)
      expect(result).toBeTruthy()
    })
  })

  describe('Load Account By EmailRepository', () => {
    test('Should return account on success', async () => {
      await mockCreateAccount()
      const sut = makeSut()
      const result = await sut.loadByEmail('any_email')
      expect(result.id).toBeTruthy()
      expect(result.name).toEqual('any_name')
      expect(result.email).toEqual('any_email')
      expect(result.password).toEqual('$2b$12$0.L9KbPTZtGFz6C5kTpiN.MT8HmTyqpPMfAXxZi5CP9uGuWT45Upu')
    })

    test('Should return null if load by email repository fails', async () => {
      const sut = makeSut()
      const result = await sut.loadByEmail('any_email')
      expect(result).toBeNull()
    })
  })

  describe('update access token repository', () => {
    test('Should return token on success', async () => {
      const initialAccount = await mockCreateAccount()
      const sut = makeSut()
      await sut.update(initialAccount.id, 'any_token')
      const account = await sut.loadByEmail(initialAccount.email)
      expect(account.token).toEqual('any_token')
    })
  })

  describe('load account by token repository', () => {
    test('Should return null if account not found', async () => {
      const accessToken: string = 'any_token'
      const role = 'any_role'
      const sut = makeSut()
      const result = await sut.loadAccountByToken(accessToken, role)
      expect(result).toBeNull()
    })

    test('Should return null if role not matching', async () => {
      await prismaClientHelper.account.create({
        data: {
          name: 'any_name',
          email: 'any_email',
          password: '$2b$12$0.L9KbPTZtGFz6C5kTpiN.MT8HmTyqpPMfAXxZi5CP9uGuWT45Upu',
          token: 'any_token'
        }
      })
      const accessToken: string = 'any_token'
      const sut = makeSut()
      const result = await sut.loadAccountByToken(accessToken, 'admin')
      expect(result).toBeNull()
    })

    test('Should return id if role not is provided', async () => {
      await prismaClientHelper.account.create({
        data: {
          name: 'any_name',
          email: 'any_email',
          password: '$2b$12$0.L9KbPTZtGFz6C5kTpiN.MT8HmTyqpPMfAXxZi5CP9uGuWT45Upu',
          token: 'any_token'
        }
      })
      const accessToken: string = 'any_token'
      const sut = makeSut()
      const result = await sut.loadAccountByToken(accessToken)
      expect(result).toBeTruthy()
    })

    test('Should return id if role is provided and role"s matched', async () => {
      await prismaClientHelper.account.create({
        data: {
          name: 'any_name',
          email: 'any_email',
          password: '$2b$12$0.L9KbPTZtGFz6C5kTpiN.MT8HmTyqpPMfAXxZi5CP9uGuWT45Upu',
          token: 'any_token',
          role: 'admin'
        }
      })
      const accessToken: string = 'any_token'
      const sut = makeSut()
      const result = await sut.loadAccountByToken(accessToken, 'admin')
      expect(result).toBeTruthy()
    })
  })
})
