import type { LoadAnwersBySurvey } from '@/domain/use-cases/load-anwers-by-survey'
import type { LoadSurveyResult } from '@/domain/use-cases/load-survey-result'
import type { SaveSurveyResult } from '@/domain/use-cases/save-survey-result'

export class LoadAnwersBySurveySpy implements LoadAnwersBySurvey {
  id: string
  result: LoadAnwersBySurvey.Result = ['any_anwer', 'other_anwer']
  async loadAnwers (id: string): Promise<LoadAnwersBySurvey.Result> {
    this.id = id
    return this.result
  }
}

export class SaveSurveyResultSpy implements SaveSurveyResult {
  data: SaveSurveyResult.Params
  result: SaveSurveyResult.Result = {
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
  }

  async save (data: SaveSurveyResult.Params): Promise<SaveSurveyResult.Result> {
    this.data = data
    return this.result
  }
}

export class LoadSurveyResultSpy implements LoadSurveyResult {
  surveyId: string
  accountId: string
  result: LoadSurveyResult.Result = {
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
  }

  async load (surveyId: string, accountId: string): Promise<LoadSurveyResult.Result> {
    this.surveyId = surveyId
    this.accountId = accountId
    return this.result
  }
}

export const mockLoadSurveyResultSpy = (): LoadSurveyResultSpy => {
  return new LoadSurveyResultSpy()
}

export const mockSaveSurveyResultStub = (): SaveSurveyResultSpy => {
  return new SaveSurveyResultSpy()
}

export const mockLoadAnwersBySurveyStub = (): LoadAnwersBySurveySpy => {
  return new LoadAnwersBySurveySpy()
}
