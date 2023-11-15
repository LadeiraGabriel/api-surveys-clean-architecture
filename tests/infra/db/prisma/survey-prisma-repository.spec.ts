import type { AddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository'
import { SurveyPrismaRepository } from '@/infra/db/prisma/survey-prisma-repository'
import { prismaClientHelper } from '@/infra/helpers/prisma-client-helper'
beforeEach(async () => {
  await prismaClientHelper.anwer.deleteMany({})
  await prismaClientHelper.survey.deleteMany({})
})

afterEach(async () => {
  await prismaClientHelper.anwer.deleteMany({})
  await prismaClientHelper.survey.deleteMany({})
})
const makeSut = (): SurveyPrismaRepository => {
  return new SurveyPrismaRepository()
}

export const mockRequest = (): AddSurveyRepository.Params => ({
  question: 'any_question',
  anwers: [{
    anwer: 'any_anwern'
  },

  {
    anwer: 'any_anwern',
    image: 'any_image'
  }],
  date: new Date()
})

describe('Survey Prisma Repository', () => {
  describe('Add Survey Repository', () => {
    test('should add survey on success', async () => {
      const sut = makeSut()
      await sut.add(mockRequest())
      const result = prismaClientHelper.survey.findFirst({
        where: {
          question: 'any_question'
        }
      })
      expect(result).toBeTruthy()
    })
  })

  describe('Load Survey Repository', () => {
    test('should return list surveys on success', async () => {
      const sut = makeSut()
      await sut.add(mockRequest())
      const surveys = await sut.loadSurveys()
      const result = await prismaClientHelper.survey.findMany({
        include: {
          anwers: true
        }
      })
      expect(surveys).toEqual(result)
    })
  })

  describe('check Survey by Id Repository', () => {
    test('should  return true on success', async () => {
      await prismaClientHelper.survey.create({
        data: {
          question: 'any_question',
          date: new Date()
        }
      })
      const surveyId = await prismaClientHelper.survey.findFirst({
        where: {
          question: 'any_question'
        }
      })
      const sut = makeSut()
      const survey = await sut.checkById(surveyId.id)
      expect(survey).toBeTruthy()
    })
  })

  describe('load Anwer by Survey  Repository', () => {
    test('should  return anwers on success', async () => {
      await prismaClientHelper.survey.create({
        data: {
          question: 'any_question',
          date: new Date(),
          anwers: {
            createMany: {
              data: [
                {
                  anwer: 'any_anwer',
                  image: 'any_iamge'
                },
                {
                  anwer: 'other_anwer',
                  image: 'other_image'
                }
              ]
            }
          }
        }
      })
      const surveyId = await prismaClientHelper.survey.findFirst({
        where: {
          question: 'any_question'
        }
      })
      const sut = makeSut()
      const loadAnwers = await sut.loadAnwersBySurvey(surveyId.id)
      expect(loadAnwers).toEqual([
        'any_anwer', 'other_anwer'
      ])
    })
  })
})
