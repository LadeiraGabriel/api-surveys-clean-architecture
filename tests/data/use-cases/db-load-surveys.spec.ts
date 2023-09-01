import type { LoadSurveysRepository } from '@/data/protocols/db/survey/load-surveys-repository'
import { DbLoadSurveys } from '@/data/use-cases/db-load-surveys'
import { mockLoadSurveysRepositoryStub } from '@/tests/data/mocks/mock-load-surveys'
import MockDate from 'mockdate'
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
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })
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
      ],
      date: new Date()
    }])
  })

  test('should throws if load surveys repository throws', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    jest.spyOn(loadSurveysRepositoryStub, 'loadSurveys').mockReturnValueOnce(Promise.reject(new Error()))
    const listSurveys = sut.load()
    await expect(listSurveys).rejects.toThrow()
  })
})
