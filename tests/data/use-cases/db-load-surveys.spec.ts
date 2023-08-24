
import type { LoadSurveysRepository } from '../../../src/data/protocols/db/survey/load-surveys-repository'
import { DbLoadSurveys } from '../../../src/data/use-cases/db-load-surveys'

class LoadSurveysRepositoryStub implements LoadSurveysRepository {
  async loadSurveys (): Promise<LoadSurveysRepository.Result[]> {
    return Promise.resolve([{
      id: 'any_id',
      question: 'any_question',
      anwers: [
        {
          anwer: 'any_anwer',
          image: 'any_image'
        }
      ]
    }])
  }
}
describe('Db load surveys', () => {
  test('should call load surveys repository', async () => {
    const loadSurveysRepositoryStub = new LoadSurveysRepositoryStub()
    const sut = new DbLoadSurveys(loadSurveysRepositoryStub)
    const spyloadRepo = jest.spyOn(loadSurveysRepositoryStub, 'loadSurveys')
    await sut.load()
    expect(spyloadRepo).toHaveBeenCalled()
  })
})
