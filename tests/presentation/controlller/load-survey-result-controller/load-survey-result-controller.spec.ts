import MockDate from 'mockdate'
import type { CheckSurveyById } from '@/domain/use-cases/check-survey-by-id'
import { mockCheckSurveyById } from '../../mocks/mock-survey'
import { LoadSurveyResultController } from '@/presentation/controllers/survey-result/load-survey-result-controller'

beforeAll(() => {
  MockDate.set(new Date())
})

afterAll(() => {
  MockDate.reset()
})
type SutType = {
  sut: LoadSurveyResultController
  checkSurveyById: CheckSurveyById
}

const makeSut = (): SutType => {
  const checkSurveyById = mockCheckSurveyById()
  const sut = new LoadSurveyResultController(checkSurveyById)
  return {
    sut,
    checkSurveyById
  }
}

describe('Save survey result controller', () => {
  test('should call load anwers by survey with correct value', async () => {
    const httpRequest = {
      surveyId: 'any_id'
    }
    const { sut, checkSurveyById } = makeSut()
    const checkSpy = jest.spyOn(checkSurveyById, 'checkById')
    await sut.handle(httpRequest)
    expect(checkSpy).toHaveBeenCalledWith(httpRequest.surveyId)
  })
})
