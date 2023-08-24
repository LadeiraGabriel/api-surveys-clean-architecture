import type { LoadSurveys } from '../../../../src/domain/use-cases'
import { LoadSurveysController } from '../../../../src/presentation/controllers/survey/load-surveys-controller'

describe('Load Surveys Controller', () => {
  test('should call load surveys', async () => {
    class LoadSurveysStub implements LoadSurveys {
      async load (): Promise<LoadSurveys.Result[]> {
        return [{
          id: 'any_id',
          question: 'any_question',
          anwers: [
            {
              anwer: 'any_anwer',
              image: 'any_image'
            }
          ]
        }]
      }
    }
    const loadSurveysStub = new LoadSurveysStub()
    const sut = new LoadSurveysController(loadSurveysStub)
    const spyLoad = jest.spyOn(loadSurveysStub, 'load')
    await sut.handle()
    expect(spyLoad).toHaveBeenCalled()
  })
})
