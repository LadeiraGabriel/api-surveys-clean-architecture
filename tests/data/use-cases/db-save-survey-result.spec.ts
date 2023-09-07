import type { SaveSurveyResult } from '@/domain/use-cases/save-survey-result'
import MockDate from 'mockdate'
import { DbSaveSurveyResult } from '@/data/use-cases/db-save-survey-result'
import type { SaveSurveyResultRepository } from '@/data/protocols/db/survey/save-survey-result-repository'
import { makeSaveSurveyByIdRepositoryStub } from '../mocks/mock-save-survey-result'

type SutType = {
  sut: DbSaveSurveyResult
  saveSurveyResultRepository: SaveSurveyResultRepository
}

const makeSut = (): SutType => {
  const saveSurveyResultRepository = makeSaveSurveyByIdRepositoryStub()
  const sut = new DbSaveSurveyResult(saveSurveyResultRepository)
  return {
    sut,
    saveSurveyResultRepository
  }
}

const makeFakeRequest = (): SaveSurveyResult.Params => ({
  accountId: 'any_account_id',
  surveyId: 'any_survey_id',
  anwer: 'any_anwer',
  date: new Date()
})

beforeAll(() => {
  MockDate.set(new Date())
})

afterAll(() => {
  MockDate.reset()
})

describe('Db save survey result', () => {
  test('should call save survey result repository with correct values', async () => {
    const { sut, saveSurveyResultRepository } = makeSut()
    const spySaveResult = jest.spyOn(saveSurveyResultRepository, 'saveSurveyResult')
    await sut.save(makeFakeRequest())
    expect(spySaveResult).toHaveBeenCalledWith(makeFakeRequest())
  })

  test('should return throws if save survey repository throws', async () => {
    const { sut, saveSurveyResultRepository } = makeSut()
    jest.spyOn(saveSurveyResultRepository, 'saveSurveyResult').mockReturnValueOnce(Promise.reject(new Error()))
    const result = sut.save(makeFakeRequest())
    await expect(result).rejects.toThrow()
  })
})
