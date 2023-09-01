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
})
