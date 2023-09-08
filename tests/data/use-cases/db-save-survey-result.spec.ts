import type { SaveSurveyResult } from '@/domain/use-cases/save-survey-result'
import type { SaveSurveyResultRepository } from '@/data/protocols/db/survey/save-survey-result-repository'
import type { LoadSurveyResultRepository } from '@/data/protocols/db/survey/load-survey-result-repository'
import { DbSaveSurveyResult } from '@/data/use-cases/db-save-survey-result'
import { makeSaveSurveyByIdRepositoryStub } from '@/tests/data/mocks/mock-save-survey-result'
import { makeLoadSurveyResultRepositoryStub } from '@/tests/data/mocks/mock-load-survey-result'
import MockDate from 'mockdate'

type SutType = {
  sut: DbSaveSurveyResult
  saveSurveyResultRepository: SaveSurveyResultRepository
  loadSurveyResultRepositoryStub: LoadSurveyResultRepository
}

const makeSut = (): SutType => {
  const loadSurveyResultRepositoryStub = makeLoadSurveyResultRepositoryStub()
  const saveSurveyResultRepository = makeSaveSurveyByIdRepositoryStub()
  const sut = new DbSaveSurveyResult(saveSurveyResultRepository, loadSurveyResultRepositoryStub)
  return {
    sut,
    saveSurveyResultRepository,
    loadSurveyResultRepositoryStub
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

  test('should call load survey result repository with correct values', async () => {
    const request = makeFakeRequest()
    const { sut, loadSurveyResultRepositoryStub } = makeSut()
    const spySaveResult = jest.spyOn(loadSurveyResultRepositoryStub, 'loadSurveyResult')
    await sut.save(request)
    expect(spySaveResult).toHaveBeenCalledWith(request.surveyId, request.accountId)
  })

  test('should return throws if load survey repository throws', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(loadSurveyResultRepositoryStub, 'loadSurveyResult').mockReturnValueOnce(Promise.reject(new Error()))
    const result = sut.save(makeFakeRequest())
    await expect(result).rejects.toThrow()
  })
})