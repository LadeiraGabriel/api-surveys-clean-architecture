import { makeLoadSurveyResultRepositoryStub } from '../mocks/mock-load-survey-result'
import type { LoadSurveyResultRepository } from '@/data/protocols/db/survey/load-survey-result-repository'
import { DbLoadSurveyResult } from '@/data/use-cases/db-load-survey-result'

type SutType = {
  sut: DbLoadSurveyResult
  loadSurveyResultRepository: LoadSurveyResultRepository
}

const makeSut = (): SutType => {
  const loadSurveyResultRepository = makeLoadSurveyResultRepositoryStub()
  const sut = new DbLoadSurveyResult(loadSurveyResultRepository)
  return {
    sut,
    loadSurveyResultRepository
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
})
