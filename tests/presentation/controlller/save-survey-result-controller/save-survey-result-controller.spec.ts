import type { CheckSurveyById } from '@/domain/use-cases/check-survey-by-id'
import { SaveSurveyResultController } from '@/presentation/controllers/survey-result/save-survey-result-controller'

type SutType = {
  sut: SaveSurveyResultController
  checkSurveyById: CheckSurveyById
}

class DbCheckSyrveyByIdStub implements CheckSurveyById {
  async checkById (id: string): Promise<CheckSurveyById.Result> {
    return Promise.resolve(true)
  }
}

const makeSut = (): SutType => {
  const checkSurveyById = new DbCheckSyrveyByIdStub()
  const sut = new SaveSurveyResultController(checkSurveyById)
  return {
    sut,
    checkSurveyById
  }
}

describe('Save survey result controller', () => {
  test('Should call check survey by id with correct value', async () => {
    const dataRequirements = {
      surveyId: 'any_id',
      accountId: 'any_id'
    }
    const { sut, checkSurveyById } = makeSut()
    const check = jest.spyOn(checkSurveyById, 'checkById')
    await sut.handle(dataRequirements)
    expect(check).toHaveBeenCalledWith(dataRequirements.surveyId)
  })
})
