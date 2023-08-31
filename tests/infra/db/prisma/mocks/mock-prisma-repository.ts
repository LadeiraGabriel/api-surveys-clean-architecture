import { prismaClientHelper } from '@/infra/helpers/prisma-client-helper'

export const mockCreateAccount = async (): Promise<any> => {
  const account = await prismaClientHelper.account.create({
    data: {
      name: 'any_name',
      email: 'any_email',
      password: '$2b$12$0.L9KbPTZtGFz6C5kTpiN.MT8HmTyqpPMfAXxZi5CP9uGuWT45Upu'
    }
  })

  return account
}
