import type { LoadSurveys } from '../../../../src/domain/use-cases'
import { LoadSurveysController } from '../../../../src/presentation/controllers/survey/load-surveys-controller'
import { mockLoadSurveysStub } from '../../mocks/mock-survey'

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
})
