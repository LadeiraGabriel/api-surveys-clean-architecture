import type { SaveSurveyResultRepository } from '@/data/protocols/db/survey/save-survey-result-repository'
import { DbSaveSurveyResult } from '@/data/use-cases/db-save-survey-result'
import { mockSaveSurveyByIdRepositorySpy, type SaveSurveyByIdRepositorySpy } from '@/tests/data/mocks/mock-save-survey-result'
import { mockLoadSurveyResultRepositorySpy, type LoadSurveyResultRepositorySpy } from '@/tests/data/mocks/mock-load-survey-result'
import MockDate from 'mockdate'

type SutType = {
  sut: DbSaveSurveyResult
  saveSurveyResultRepository: SaveSurveyByIdRepositorySpy
  loadSurveyResultRepositorySpy: LoadSurveyResultRepositorySpy
}

const makeSut = (): SutType => {
  const loadSurveyResultRepositorySpy = mockLoadSurveyResultRepositorySpy()
  const saveSurveyResultRepository = mockSaveSurveyByIdRepositorySpy()
  const sut = new DbSaveSurveyResult(saveSurveyResultRepository, loadSurveyResultRepositorySpy)
  return {
    sut,
    saveSurveyResultRepository,
    loadSurveyResultRepositorySpy
  }
}

const makeFakeRequest = (): SaveSurveyResultRepository.Params => ({
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
    await sut.save(makeFakeRequest())
    expect(saveSurveyResultRepository.data).toEqual(makeFakeRequest())
  })

  test('should return throws if save survey repository throws', async () => {
    const { sut, saveSurveyResultRepository } = makeSut()
    jest.spyOn(saveSurveyResultRepository, 'saveSurveyResult').mockReturnValueOnce(Promise.reject(new Error()))
    const result = sut.save(makeFakeRequest())
    await expect(result).rejects.toThrow()
  })

  test('should call load survey result repository with correct values', async () => {
    const request = makeFakeRequest()
    const { sut, loadSurveyResultRepositorySpy } = makeSut()
    await sut.save(request)
    expect(loadSurveyResultRepositorySpy.accountId).toEqual(request.accountId)
    expect(loadSurveyResultRepositorySpy.surveyId).toEqual(request.surveyId)
  })

  test('should return throws if load survey repository throws', async () => {
    const { sut, loadSurveyResultRepositorySpy } = makeSut()
    jest.spyOn(loadSurveyResultRepositorySpy, 'loadBySurveyId').mockReturnValueOnce(Promise.reject(new Error()))
    const result = sut.save(makeFakeRequest())
    await expect(result).rejects.toThrow()
  })
})
