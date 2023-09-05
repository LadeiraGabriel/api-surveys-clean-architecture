import { DbCheckSurveyById } from '@/data/use-cases/db-check-survey-by-id'
import { makeCheckSurveyByIdRepositoryStub } from '../mocks/mock-check-survey-by-id'
import type { CheckSurveyByIdRepository } from '@/data/protocols/db/survey/check-survey-by-id-repository'

type SutType = {
  sut: DbCheckSurveyById
  checkSurveyByIdRepository: CheckSurveyByIdRepository
}

const makeSut = (): SutType => {
  const checkSurveyByIdRepository = makeCheckSurveyByIdRepositoryStub()
  const sut = new DbCheckSurveyById(checkSurveyByIdRepository)
  return {
    sut,
    checkSurveyByIdRepository
  }
}

describe('Db check survey by id', () => {
  test('should call check survey by id repository with correct values', async () => {
    const surveyId = 'any_id'
    const { sut, checkSurveyByIdRepository } = makeSut()
    const spyCheck = jest.spyOn(checkSurveyByIdRepository, 'checkById')
    await sut.checkById(surveyId)
    expect(spyCheck).toHaveBeenCalledWith(surveyId)
  })
})
