import MockDate from 'mockdate'
import { SaveSurveyResultController } from '@/presentation/controllers/survey-result/save-survey-result-controller'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden, ok, serverError } from '@/presentation/helpers/http-helper'
import { LoadAnwersBySurveySpy, SaveSurveyResultSpy } from '../../mocks/mock-survey-result'

beforeAll(() => {
  MockDate.set(new Date())
})

afterAll(() => {
  MockDate.reset()
})
type SutType = {
  sut: SaveSurveyResultController
  loadAnwersBySurveySpy: LoadAnwersBySurveySpy
  saveSurveyResultSpy: SaveSurveyResultSpy
}

const makeSut = (): SutType => {
  const saveSurveyResultSpy = new SaveSurveyResultSpy()
  const loadAnwersBySurveySpy = new LoadAnwersBySurveySpy()
  const sut = new SaveSurveyResultController(loadAnwersBySurveySpy, saveSurveyResultSpy)
  return {
    sut,
    loadAnwersBySurveySpy,
    saveSurveyResultSpy
  }
}

describe('Save survey result controller', () => {
  test('should call load anwers by survey with correct value', async () => {
    const httpRequest = {
      surveyId: 'any_id'
    }
    const { sut, loadAnwersBySurveySpy } = makeSut()
    await sut.handle(httpRequest)
    expect(loadAnwersBySurveySpy.id).toEqual(httpRequest.surveyId)
  })
  test('should return 403 if load anwers by survey return null', async () => {
    const httpRequest = {
      surveyId: 'any_id'
    }
    const { sut, loadAnwersBySurveySpy } = makeSut()
    loadAnwersBySurveySpy.result = []
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')))
  })

  test('should return 403 if anwer not is valid', async () => {
    const httpRequest = {
      surveyId: 'any_id',
      anwer: 'any_anwer'
    }
    const { sut, loadAnwersBySurveySpy } = makeSut()
    loadAnwersBySurveySpy.result = ['invalid_anwer', 'other_invalid_anwer']
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('anwer')))
  })

  test('should call save survey result with correct values', async () => {
    const httpRequest = {
      accountId: 'any_id',
      surveyId: 'any_id',
      anwer: 'any_anwer',
      date: new Date()
    }
    const { sut, saveSurveyResultSpy } = makeSut()
    saveSurveyResultSpy.data = httpRequest
    await sut.handle(httpRequest)
    expect(saveSurveyResultSpy.data).toEqual(httpRequest)
  })

  test('should return 500 if save survey result fails', async () => {
    const httpRequest = {
      accountId: 'any_id',
      surveyId: 'any_id',
      anwer: 'any_anwer',
      date: new Date()
    }
    const { sut, saveSurveyResultSpy } = makeSut()
    jest.spyOn(saveSurveyResultSpy, 'save').mockReturnValueOnce(Promise.reject(new Error()))
    const httpReponse = await sut.handle(httpRequest)
    expect(httpReponse).toEqual(serverError(new Error()))
  })

  test('should return 200 on success', async () => {
    const httpRequest = {
      accountId: 'any_id',
      surveyId: 'any_id',
      anwer: 'any_anwer',
      date: new Date()
    }
    const { sut } = makeSut()
    const httpReponse = await sut.handle(httpRequest)
    expect(httpReponse).toEqual(ok({
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
