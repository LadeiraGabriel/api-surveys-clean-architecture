import type { LoadAnwersBySurvey } from '@/domain/use-cases/load-anwers-by-survey'
import { SaveSurveyResultController } from '@/presentation/controllers/survey-result/save-survey-result-controller'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden } from '@/presentation/helpers/http-helper'

type SutType = {
  sut: SaveSurveyResultController
  loadAnwersBySurvey: LoadAnwersBySurvey
}

const makeSut = (): SutType => {
  const loadAnwersBySurvey = new LoadAnwersBySurveyStub()
  const sut = new SaveSurveyResultController(loadAnwersBySurvey)
  return {
    sut,
    loadAnwersBySurvey
  }
}

class LoadAnwersBySurveyStub implements LoadAnwersBySurvey {
  async loadAnwers (id: string): Promise<LoadAnwersBySurvey.Result> {
    return Promise.resolve(['any_anwer', 'other_anwer'])
  }
}

describe('Save survey result controller', () => {
  test('should call load anwers by survey with correct value', async () => {
    const httpRequest = {
      surveyId: 'any_id'
    }
    const { sut, loadAnwersBySurvey } = makeSut()
    const loadSpy = jest.spyOn(loadAnwersBySurvey, 'loadAnwers')
    await sut.handle(httpRequest)
    expect(loadSpy).toHaveBeenCalledWith(httpRequest.surveyId)
  })
  test('should return 403 if load anwers by survey return null', async () => {
    const httpRequest = {
      surveyId: 'any_id'
    }
    const { sut, loadAnwersBySurvey } = makeSut()
    jest.spyOn(loadAnwersBySurvey, 'loadAnwers').mockReturnValueOnce(null)
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')))
  })
})
