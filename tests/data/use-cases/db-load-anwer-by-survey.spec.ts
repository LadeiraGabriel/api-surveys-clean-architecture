import { DbLoadAnwersBySurvey } from '@/data/use-cases/db-load-anwers-by-survey'
import type { LoadAnwersBySurveyRepository } from '@/data/protocols/db/survey/load-anwer-by-survey-repository'

type SutType = {
  sut: DbLoadAnwersBySurvey
  loadAnwersBySurveyRepository: LoadAnwersBySurveyRepository
}

const makeSut = (): SutType => {
  const loadAnwersBySurveyRepository = new LoadAnwersBySurveyRepositoryStub()
  const sut = new DbLoadAnwersBySurvey(loadAnwersBySurveyRepository)
  return {
    sut,
    loadAnwersBySurveyRepository
  }
}

class LoadAnwersBySurveyRepositoryStub implements LoadAnwersBySurveyRepository {
  async loadAnwersBySurvey (id: string): Promise<LoadAnwersBySurveyRepository.Result> {
    return Promise.resolve(['any_anwer', 'other_anwer'])
  }
}
describe('Db Load Anwer By Survey', () => {
  test('should call load anwer by survey with correct value', async () => {
    const id = 'any_id'
    const { sut, loadAnwersBySurveyRepository } = makeSut()
    const loadSpy = jest.spyOn(loadAnwersBySurveyRepository, 'loadAnwersBySurvey')
    await sut.loadAnwers(id)
    expect(loadSpy).toHaveBeenCalledWith(id)
  })
})
