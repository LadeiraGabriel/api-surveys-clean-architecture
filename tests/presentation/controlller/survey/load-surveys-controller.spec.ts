import type { LoadSurveys } from '@/domain/use-cases'
import { LoadSurveysController } from '@/presentation/controllers/survey/load-surveys-controller'
import { ok, serverError } from '@/presentation/helpers/http-helper'
import { mockLoadSurveysStub } from '@/tests/presentation/mocks/mock-survey'

type SutType = {
  sut: LoadSurveysController
  loadSurveysStub: LoadSurveys
}

const makeSut = (): SutType => {
  const loadSurveysStub = mockLoadSurveysStub()
  const sut = new LoadSurveysController(loadSurveysStub)
  return {
    sut,
    loadSurveysStub
  }
}

describe('Load Surveys Controller', () => {
  test('should call load surveys', async () => {
    const { sut, loadSurveysStub } = makeSut()
    const spyLoad = jest.spyOn(loadSurveysStub, 'load')
    await sut.handle()
    expect(spyLoad).toHaveBeenCalled()
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
      ]
    }]))
  })

  test('should return 500 if load surveys throws', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest.spyOn(loadSurveysStub, 'load').mockReturnValueOnce(Promise.reject(new Error()))
    const httpRepose = await sut.handle()
    expect(httpRepose).toEqual(serverError(new Error()))
  })
})
