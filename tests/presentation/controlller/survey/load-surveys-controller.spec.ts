import { LoadSurveysController } from '@/presentation/controllers/survey/load-surveys-controller'
import { ok, serverError } from '@/presentation/helpers/http-helper'
import { type LoadSurveysSpy, mockLoadSurveysSpy } from '@/tests/presentation/mocks/mock-survey'
import MockDate from 'mockdate'

type SutType = {
  sut: LoadSurveysController
  loadSurveysSpy: LoadSurveysSpy
}

const makeSut = (): SutType => {
  const loadSurveysSpy = mockLoadSurveysSpy()
  const sut = new LoadSurveysController(loadSurveysSpy)
  return {
    sut,
    loadSurveysSpy
  }
}

describe('Load Surveys Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })
  test('should call load surveys', async () => {
    const { sut, loadSurveysSpy } = makeSut()
    await sut.handle()
    expect(loadSurveysSpy.call).toBeTruthy()
  })

  test('should return surveys on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(ok([{
      id: 'any_id',
      question: 'any_question',
      anwers: [
        {
          anwer: 'any_anwer',
          image: 'any_image'
        }
      ],
      date: new Date()
    }]))
  })

  test('should return 500 if load surveys throws', async () => {
    const { sut, loadSurveysSpy } = makeSut()
    jest.spyOn(loadSurveysSpy, 'load').mockReturnValueOnce(Promise.reject(new Error()))
    const httpRepose = await sut.handle()
    expect(httpRepose).toEqual(serverError(new Error()))
  })
})
