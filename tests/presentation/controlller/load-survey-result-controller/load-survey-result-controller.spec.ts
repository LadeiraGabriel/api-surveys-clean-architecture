import MockDate from 'mockdate'
import type { CheckSurveyById } from '@/domain/use-cases/check-survey-by-id'
import { mockCheckSurveyById } from '../../mocks/mock-survey'
import { LoadSurveyResultController } from '@/presentation/controllers/survey-result/load-survey-result-controller'
import { forbidden, serverError } from '@/presentation/helpers/http-helper'
import { InvalidParamError } from '@/presentation/errors'
import type { LoadSurveyResult } from '@/domain/use-cases/load-survey-result'
import { mockLoadSurveyResultStub } from '../../mocks/mock-survey-result'

beforeAll(() => {
  MockDate.set(new Date())
})

afterAll(() => {
  MockDate.reset()
})
type SutType = {
  sut: LoadSurveyResultController
  checkSurveyById: CheckSurveyById
  loadSurveyResultStub: LoadSurveyResult
}

const makeSut = (): SutType => {
  const checkSurveyById = mockCheckSurveyById()
  const loadSurveyResultStub = mockLoadSurveyResultStub()
  const sut = new LoadSurveyResultController(checkSurveyById, loadSurveyResultStub)
  return {
    sut,
    checkSurveyById,
    loadSurveyResultStub
  }
}

describe('Load survey result controller', () => {
  test('should call check survey by id with correct value', async () => {
    const httpRequest = {
      surveyId: 'any_id'
    }
    const { sut, checkSurveyById } = makeSut()
    const checkSpy = jest.spyOn(checkSurveyById, 'checkById')
    await sut.handle(httpRequest)
    expect(checkSpy).toHaveBeenCalledWith(httpRequest.surveyId)
  })

  test('should return 403 if check survey by id return false', async () => {
    const httpRequest = {
      surveyId: 'any_id'
    }
    const { sut, checkSurveyById } = makeSut()
    jest.spyOn(checkSurveyById, 'checkById').mockResolvedValueOnce(Promise.resolve(false))
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')))
  })

  test('should return 500 if check survey by id throws', async () => {
    const httpRequest = {
      surveyId: 'any_id'
    }
    const { sut, checkSurveyById } = makeSut()
    jest.spyOn(checkSurveyById, 'checkById').mockResolvedValueOnce(Promise.reject(new Error()))
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('should call load survey result with correct value', async () => {
    const httpRequest = {
      surveyId: 'any_id',
      accountId: 'any_id'
    }
    const { sut, loadSurveyResultStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveyResultStub, 'load')
    await sut.handle(httpRequest)
    expect(loadSpy).toHaveBeenCalledWith(httpRequest.surveyId, httpRequest.accountId)
  })
})
