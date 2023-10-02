import type { SurveyModel } from '@/domain/models/survey-model'
import { prismaClientHelper } from '@/infra/helpers/prisma-client-helper'
import Mockdate from 'mockdate'
import { SurveyResultPrismaRepository } from '@/infra/db/prisma/survey-result-prisma-repository'
import { beforeEach } from 'node:test'

type AccountModel = {
  id: string
  name: string
  email: string
  password: string
}

type SurveyResultModel = {
  accountId: string
  surveyId: string
  anwer: string
  date: Date
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

const makeSurveyResult = async (): Promise<SurveyResultModel> => {
  const account = await prismaClientHelper.account.findFirst({
    where: {
      email: 'any_email@mail.com'
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
  const surveyResult = await prismaClientHelper.surveyResult.create({
    data: {
      accountId: account.id,
      surveyId: survey.id,
      anwer: 'any_anwer',
      date: new Date()
    }
  })
  return surveyResult
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

beforeEach(async () => {
  await prismaClientHelper.account.deleteMany({})
  await prismaClientHelper.anwer.deleteMany({})
  await prismaClientHelper.survey.deleteMany({})
  await prismaClientHelper.surveyResult.deleteMany({})
  Mockdate.set(new Date())
})

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

afterEach(async () => {
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

    test('should update survey result on success', async () => {
      const account = await makeAccount()
      const survey = await makeSurvey()
      await makeSurveyResult()
      const resultOne = await prismaClientHelper.surveyResult.findFirst({
        where: {
          accountId: account.id
        }
      })
      expect(resultOne.anwer).toEqual('any_anwer')
      const surveyResultPrismaRepository = new SurveyResultPrismaRepository()
      await surveyResultPrismaRepository.saveSurveyResult({
        accountId: account.id,
        surveyId: survey.id,
        anwer: 'update_anwer',
        date: new Date()
      })
      const result = await prismaClientHelper.surveyResult.findFirst({
        where: {
          accountId: account.id
        }
      })
      expect(result.anwer).toEqual('update_anwer')
    })
  })
})
