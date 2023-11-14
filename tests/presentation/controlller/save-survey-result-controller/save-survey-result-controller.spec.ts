import MockDate from 'mockdate'
import type { LoadAnwersBySurvey } from '@/domain/use-cases/load-anwers-by-survey'
import type { SaveSurveyResult } from '@/domain/use-cases/save-survey-result'
import { SaveSurveyResultController } from '@/presentation/controllers/survey-result/save-survey-result-controller'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden, ok, serverError } from '@/presentation/helpers/http-helper'

beforeAll(() => {
  MockDate.set(new Date())
})

afterAll(() => {
  MockDate.reset()
})
type SutType = {
  sut: SaveSurveyResultController
  loadAnwersBySurvey: LoadAnwersBySurvey
  saveSurveyResult: SaveSurveyResult
}

const makeSut = (): SutType => {
  const saveSurveyResult = new SaveSurveyResultStub()
  const loadAnwersBySurvey = new LoadAnwersBySurveyStub()
  const sut = new SaveSurveyResultController(loadAnwersBySurvey, saveSurveyResult)
  return {
    sut,
    loadAnwersBySurvey,
    saveSurveyResult
  }
}

class LoadAnwersBySurveyStub implements LoadAnwersBySurvey {
  async loadAnwers (id: string): Promise<LoadAnwersBySurvey.Result> {
    return Promise.resolve(['any_anwer', 'other_anwer'])
  }
}

class SaveSurveyResultStub implements SaveSurveyResult {
  async save (data: SaveSurveyResult.Params): Promise<SaveSurveyResult.Result> {
    return Promise.resolve({
      surveyId: 'any_id',
      question: 'any_question',
      anwers: [
        {
          image: 'any_image',
          anwer: 'any_anwer',
          count: 100,
          percent: 50,
          isCurrentAccountAnwer: true
        }
      ],
      date: new Date()
    })
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
    jest.spyOn(loadAnwersBySurvey, 'loadAnwers').mockReturnValueOnce(Promise.resolve([]))
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')))
  })

  test('should return 403 if anwer not is valid', async () => {
    const httpRequest = {
      surveyId: 'any_id',
      anwer: 'any_anwer'
    }
    const { sut, loadAnwersBySurvey } = makeSut()
    jest.spyOn(loadAnwersBySurvey, 'loadAnwers').mockReturnValueOnce(Promise.resolve(['invalid_anwer', 'other_invalid_anwer']))
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('anwer')))
  })

  test('should call save survey result with correct values', async () => {
    const httpRequest = {
      accountId: 'any_id',
      surveyId: 'any_id',
      anwer: 'any_anwer',
      date: new Date()
    }
    const { sut, saveSurveyResult } = makeSut()
    const saveResultSpy = jest.spyOn(saveSurveyResult, 'save')
    await sut.handle(httpRequest)
    expect(saveResultSpy).toHaveBeenCalledWith(httpRequest)
  })

  test('should return 500 if save survey result fails', async () => {
    const httpRequest = {
      accountId: 'any_id',
      surveyId: 'any_id',
      anwer: 'any_anwer',
      date: new Date()
    }
    const { sut, saveSurveyResult } = makeSut()
    jest.spyOn(saveSurveyResult, 'save').mockReturnValueOnce(Promise.reject(new Error()))
    const httpReponse = await sut.handle(httpRequest)
    expect(httpReponse).toEqual(serverError(new Error()))
  })

  test('should return 200 on success', async () => {
    const httpRequest = {
      accountId: 'any_id',
      surveyId: 'any_id',
      anwer: 'any_anwer',
      date: new Date()
    }
    const { sut } = makeSut()
    const httpReponse = await sut.handle(httpRequest)
    expect(httpReponse).toEqual(ok({
      surveyId: 'any_id',
      question: 'any_question',
      anwers: [
        {
          image: 'any_image',
          anwer: 'any_anwer',
          count: 100,
          percent: 50,
          isCurrentAccountAnwer: true
        }
      ],
      date: new Date()
    }))
  })
})
