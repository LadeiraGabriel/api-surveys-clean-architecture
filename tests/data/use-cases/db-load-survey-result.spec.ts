import type { LoadSurveyByIdRepository } from '../protocols/db/survey/load-survey-by-id-repository'
import type { LoadSurveyResultRepository } from '@/data/protocols/db/survey/load-survey-result-repository'
import { makeLoadSurveyResultRepositoryStub } from '../mocks/mock-load-survey-result'
import { DbLoadSurveyResult } from '@/data/use-cases/db-load-survey-result'
import { makeLoadSurveyByIdRepositoryStub } from '../mocks/load-survey-by-id-repository'

type SutType = {
  sut: DbLoadSurveyResult
  loadSurveyResultRepository: LoadSurveyResultRepository
  loadSurveyByIdRepository: LoadSurveyByIdRepository
}

const makeSut = (): SutType => {
  const loadSurveyByIdRepository = makeLoadSurveyByIdRepositoryStub()
  const loadSurveyResultRepository = makeLoadSurveyResultRepositoryStub()
  const sut = new DbLoadSurveyResult(loadSurveyResultRepository, loadSurveyByIdRepository)
  return {
    sut,
    loadSurveyResultRepository,
    loadSurveyByIdRepository
  }
}

describe('Db load survey result', () => {
  test('should call load survey result repository with correct values', async () => {
    const params = {
      accountId: 'any_id',
      surveyId: 'any_id'
    }
    const { sut, loadSurveyResultRepository } = makeSut()
    const spyloadResult = jest.spyOn(loadSurveyResultRepository, 'loadBySurveyId')
    await sut.load(params)
    expect(spyloadResult).toHaveBeenCalledWith(params.surveyId, params.accountId)
  })

  test('should return survey result with values null if survey result return null', async () => {
    const params = {
      accountId: 'any_accountId',
      surveyId: 'any_surveyId'
    }
    const { sut, loadSurveyResultRepository } = makeSut()
    jest.spyOn(loadSurveyResultRepository, 'loadBySurveyId').mockReturnValueOnce(Promise.resolve(null))
    const loadResult = await sut.load(params)
    expect(loadResult).toEqual({
      surveyId: 'any_surveyid',
      question: 'any_question',
      anwers: [
        {
          image: 'any_image',
          anwer: 'any_anwer',
          count: 0,
          percent: 0,
          isCurrentAccountAnwer: false
        }
      ],
      date: new Date()
    })
  })

  test('should call load survey by Id survey repository with correct value', async () => {
    const params = {
      accountId: 'any_id',
      surveyId: 'any_id'
    }
    const { sut, loadSurveyResultRepository, loadSurveyByIdRepository } = makeSut()
    jest.spyOn(loadSurveyResultRepository, 'loadBySurveyId').mockReturnValueOnce(Promise.resolve(null))
    const spyloadById = jest.spyOn(loadSurveyByIdRepository, 'loadSurveyById')
    await sut.load(params)
    expect(spyloadById).toHaveBeenCalledWith(params.surveyId)
  })
})
