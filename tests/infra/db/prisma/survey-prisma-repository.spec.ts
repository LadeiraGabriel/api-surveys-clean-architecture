import type { AddSurveyRepository } from '../../../../src/data/protocols/db/survey/add-survey-repository'
import { SurveyPrismaRepository } from '../../../../src/infra/db/prisma/survey-prisma-repository'
import { prismaClientHelper } from '../../../../src/infra/helpers/prisma-client-helper'
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
  }]
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
})
