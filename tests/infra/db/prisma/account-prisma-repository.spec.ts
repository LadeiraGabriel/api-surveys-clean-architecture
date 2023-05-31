import { prismaClientHelper } from '../../../../src/infra/helpers/prisma-client-helper'

beforeAll(async () => {
  await prismaClientHelper().account.deleteMany({})
})
describe('Account Prisma Repository', () => {
  describe('check account by email', () => {
    test('Should connect to the database create a user and return it through findUnique', async () => {
      await prismaClientHelper().account.create({
        data: {
          name: 'any_name',
          email: 'any_email',
          password: '$2b$12$0.L9KbPTZtGFz6C5kTpiN.MT8HmTyqpPMfAXxZi5CP9uGuWT45Upu'
        }
      })
      const account = await prismaClientHelper().account.findUnique({
        where: {
          email: 'any_email'
        }
      })

      const result = {
        id: 'any_id',
        name: 'any_name',
        email: 'any_email',
        password: '$2b$12$0.L9KbPTZtGFz6C5kTpiN.MT8HmTyqpPMfAXxZi5CP9uGuWT45Upu'
      }
      expect(account.id).toBeTruthy()
      expect(account.name).toEqual(result.name)
      expect(account.email).toEqual(result.email)
      expect(account.password).toEqual(result.password)
    })
  })
})
