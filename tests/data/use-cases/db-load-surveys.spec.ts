import { DbLoadSurveys } from '@/data/use-cases/db-load-surveys'
import { mockLoadSurveysRepositorySpy, type LoadSurveysRepositorySpy } from '@/tests/data/mocks/mock-load-surveys'
import MockDate from 'mockdate'
type SutType = {
  sut: DbLoadSurveys
  loadSurveysRepositorySpy: LoadSurveysRepositorySpy
}

const makeSut = (): SutType => {
  const loadSurveysRepositorySpy = mockLoadSurveysRepositorySpy()
  const sut = new DbLoadSurveys(loadSurveysRepositorySpy)
  return {
    sut,
    loadSurveysRepositorySpy
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
    const { sut, loadSurveysRepositorySpy } = makeSut()
    await sut.load()
    expect(loadSurveysRepositorySpy.call).toBeTruthy()
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
    const { sut, loadSurveysRepositorySpy } = makeSut()
    jest.spyOn(loadSurveysRepositorySpy, 'loadSurveys').mockReturnValueOnce(Promise.reject(new Error()))
    const listSurveys = sut.load()
    await expect(listSurveys).rejects.toThrow()
  })
})
