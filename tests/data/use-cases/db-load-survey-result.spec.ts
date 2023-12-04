import { mockLoadSurveyResultRepositorySpy, type LoadSurveyResultRepositorySpy } from '../mocks/mock-load-survey-result'
import { DbLoadSurveyResult } from '@/data/use-cases/db-load-survey-result'
import { mockLoadSurveyByIdRepositorySpy, type LoadSurveyByIdRepositorySpy } from '../mocks/mock-load-survey-by-id-repository'
import MockDate from 'mockdate'

beforeAll(() => {
  MockDate.set(new Date())
})

afterAll(() => {
  MockDate.reset()
})
type SutType = {
  sut: DbLoadSurveyResult
  loadSurveyResultRepository: LoadSurveyResultRepositorySpy
  loadSurveyByIdRepositorySpy: LoadSurveyByIdRepositorySpy
}

const makeSut = (): SutType => {
  const loadSurveyByIdRepositorySpy = mockLoadSurveyByIdRepositorySpy()
  const loadSurveyResultRepository = mockLoadSurveyResultRepositorySpy()
  const sut = new DbLoadSurveyResult(loadSurveyResultRepository, loadSurveyByIdRepositorySpy)
  return {
    sut,
    loadSurveyResultRepository,
    loadSurveyByIdRepositorySpy
  }
}

describe('Db load survey result', () => {
  test('should call load survey result repository with correct values', async () => {
    const params = {
      accountId: 'any_id',
      surveyId: 'any_id'
    }
    const { sut, loadSurveyResultRepository } = makeSut()
    const spyloadResult = jest.spyOn(loadSurveyResultRepository, 'loadBySurveyId')
    await sut.load('any_id', 'any_id')
    expect(spyloadResult).toHaveBeenCalledWith(params.surveyId, params.accountId)
  })

  test('should return survey result with all values null if survey result return null', async () => {
    const params = {
      accountId: 'any_accountId',
      surveyId: 'any_surveyId'
    }
    const { sut, loadSurveyResultRepository, loadSurveyByIdRepositorySpy } = makeSut()
    jest.spyOn(loadSurveyResultRepository, 'loadBySurveyId').mockReturnValueOnce(Promise.resolve(null))
    loadSurveyByIdRepositorySpy.result = {
      id: 'any_id',
      question: 'any_question',
      anwers: [
        {
          image: 'any_image',
          anwer: 'any_anwer'
        },
        {
          image: 'other_image',
          anwer: 'other_anwer'
        }
      ],
      date: new Date()
    }
    const loadResult = await sut.load(params.accountId, params.surveyId)
    expect(loadResult).toEqual({
      surveyId: 'any_id',
      question: 'any_question',
      anwers: [
        {
          image: 'any_image',
          anwer: 'any_anwer',
          count: 0,
          percent: 0,
          isCurrentAccountAnwer: false
        },
        {
          image: 'other_image',
          anwer: 'other_anwer',
          count: 0,
          percent: 0,
          isCurrentAccountAnwer: false
        }
      ],
      date: new Date()
    })
  })

  test('should return survey result on success', async () => {
    const { sut } = makeSut()
    const loadResult = await sut.load('any_accountId', 'any_surveyId')
    expect(loadResult).toEqual({
      surveyId: 'any_surveyid',
      question: 'any_question',
      anwers: [
        {
          image: 'any_image',
          anwer: 'any_anwer',
          count: 1,
          percent: 1,
          isCurrentAccountAnwer: true
        }
      ],
      date: new Date()
    })
  })
})
