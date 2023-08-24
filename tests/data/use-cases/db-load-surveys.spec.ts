import type { LoadSurveysRepository } from '../../../src/data/protocols/db/survey/load-surveys-repository'
import { DbLoadSurveys } from '../../../src/data/use-cases/db-load-surveys'
import { mockLoadSurveysRepositoryStub } from '../mocks/mock-load-surveys'

type SutType = {
  sut: DbLoadSurveys
  loadSurveysRepositoryStub: LoadSurveysRepository
}

const makeSut = (): SutType => {
  const loadSurveysRepositoryStub = mockLoadSurveysRepositoryStub()
  const sut = new DbLoadSurveys(loadSurveysRepositoryStub)
  return {
    sut,
    loadSurveysRepositoryStub
  }
}
describe('Db load surveys', () => {
  test('should call load surveys repository', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    const spyloadRepo = jest.spyOn(loadSurveysRepositoryStub, 'loadSurveys')
    await sut.load()
    expect(spyloadRepo).toHaveBeenCalled()
  })
})
