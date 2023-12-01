import { type CheckSurveyByIdSpy, mockCheckSurveyByIdSpy } from '../../mocks/mock-survey'
import { InvalidParamError } from '@/presentation/errors'
import { type LoadSurveyResultSpy, mockLoadSurveyResultSpy } from '../../mocks/mock-survey-result'
import { LoadSurveyResultController } from '@/presentation/controllers/survey-result/load-survey-result-controller'
import { forbidden, ok, serverError } from '@/presentation/helpers/http-helper'
import MockDate from 'mockdate'

beforeAll(() => {
  MockDate.set(new Date())
})

afterAll(() => {
  MockDate.reset()
})
type SutType = {
  sut: LoadSurveyResultController
  checkSurveyByIdSpy: CheckSurveyByIdSpy
  loadSurveyResultSpy: LoadSurveyResultSpy
}

const makeSut = (): SutType => {
  const checkSurveyByIdSpy = mockCheckSurveyByIdSpy()
  const loadSurveyResultSpy = mockLoadSurveyResultSpy()
  const sut = new LoadSurveyResultController(checkSurveyByIdSpy, loadSurveyResultSpy)
  return {
    sut,
    checkSurveyByIdSpy,
    loadSurveyResultSpy
  }
}

describe('Load survey result controller', () => {
  test('should call check survey by id with correct value', async () => {
    const httpRequest = {
      surveyId: 'any_id'
    }
    const { sut, checkSurveyByIdSpy } = makeSut()
    await sut.handle(httpRequest)
    expect(checkSurveyByIdSpy.id).toEqual(httpRequest.surveyId)
  })

  test('should return 403 if check survey by id return false', async () => {
    const httpRequest = {
      surveyId: 'any_id'
    }
    const { sut, checkSurveyByIdSpy } = makeSut()
    checkSurveyByIdSpy.result = false
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')))
  })

  test('should return 500 if check survey by id throws', async () => {
    const httpRequest = {
      surveyId: 'any_id'
    }
    const { sut, checkSurveyByIdSpy } = makeSut()
    jest.spyOn(checkSurveyByIdSpy, 'checkById').mockResolvedValueOnce(Promise.reject(new Error()))
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('should call load survey result with correct value', async () => {
    const httpRequest = {
      surveyId: 'any_id',
      accountId: 'any_id'
    }
    const { sut, loadSurveyResultSpy } = makeSut()
    await sut.handle(httpRequest)
    expect(loadSurveyResultSpy.surveyId).toEqual(httpRequest.surveyId)
    expect(loadSurveyResultSpy.accountId).toEqual(httpRequest.accountId)
  })
  test('should return 500 if load survey result throws', async () => {
    const httpRequest = {
      surveyId: 'any_id',
      accountId: 'any_id'
    }
    const { sut, loadSurveyResultSpy } = makeSut()
    jest.spyOn(loadSurveyResultSpy, 'load').mockResolvedValueOnce(Promise.reject(new Error()))
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('should return 200 on success', async () => {
    const httpRequest = {
      surveyId: 'any_id',
      accountId: 'any_id'
    }
    const { sut } = makeSut()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok({
      surveyId: 'any_id',
      question: 'any_question',
      anwers: [
        {
          image: 'any_image',
          anwer: 'any_anwer',
          count: 100,
          percent: 50,
          isCurrentAccountAnwer: true
        }
      ],
      date: new Date()
    }))
  })
})
