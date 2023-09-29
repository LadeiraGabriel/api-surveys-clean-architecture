import type { SurveyModel } from '@/domain/models/survey-model'
import { prismaClientHelper } from '@/infra/helpers/prisma-client-helper'
import Mockdate from 'mockdate'
import { SurveyResultPrismaRepository } from '@/infra/db/prisma/survey-result-prisma-repository'

type AccountModel = {
  id: string
  name: string
  email: string
  password: string
}

const makeAccount = async (): Promise<AccountModel> => {
  const account = await prismaClientHelper.account.create({
    data: {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    }
  })
  return account
}

const makeSurvey = async (): Promise<SurveyModel> => {
  await prismaClientHelper.survey.create({
    data: {
      question: 'any_question',
      anwers: {
        createMany: {
          data: {
            anwer: 'any_anwer'
          }
        }
      },
      date: new Date()
    }
  })
  const survey = await prismaClientHelper.survey.findFirst({
    where: {
      question: 'any_question'
    },
    include: {
      anwers: true
    }
  })
  return survey
}

beforeAll(async () => {
  await prismaClientHelper.account.deleteMany({})
  await prismaClientHelper.anwer.deleteMany({})
  await prismaClientHelper.survey.deleteMany({})
  await prismaClientHelper.surveyResult.deleteMany({})
  Mockdate.set(new Date())
})

afterAll(async () => {
  await prismaClientHelper.account.deleteMany({})
  await prismaClientHelper.anwer.deleteMany({})
  await prismaClientHelper.survey.deleteMany({})
  await prismaClientHelper.surveyResult.deleteMany({})
  Mockdate.reset()
})
describe('Survey Result prisma repository', () => {
  describe('Save Survey Result prisma repository', () => {
    test('should save survey result on success', async () => {
      const account = await makeAccount()
      const survey = await makeSurvey()
      const surveyResultPrismaRepository = new SurveyResultPrismaRepository()
      await surveyResultPrismaRepository.saveSurveyResult({
        accountId: account.id,
        surveyId: survey.id,
        anwer: 'any_anwer',
        date: new Date()
      })
      const result = await prismaClientHelper.surveyResult.findFirst({
        where: {
          accountId: account.id
        }
      })
      expect(result).toBeTruthy()
    })
  })
})
