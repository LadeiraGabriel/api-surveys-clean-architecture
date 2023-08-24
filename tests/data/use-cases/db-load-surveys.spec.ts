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
  test('should return list surveys on success', async () => {
    const { sut } = makeSut()
    const listSurveys = await sut.load()
    expect(listSurveys).toEqual([{
      id: 'any_id',
      question: 'any_question',
      anwers: [
        {
          anwer: 'any_anwer',
          image: 'any_image'
        }
      ]
    }])
  })

  test('should throws if load surveys repository throws', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    jest.spyOn(loadSurveysRepositoryStub, 'loadSurveys').mockReturnValueOnce(Promise.reject(new Error()))
    const listSurveys = sut.load()
    await expect(listSurveys).rejects.toThrow()
  })
})
