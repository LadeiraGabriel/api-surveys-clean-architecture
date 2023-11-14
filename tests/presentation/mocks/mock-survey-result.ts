import type { LoadAnwersBySurvey } from '@/domain/use-cases/load-anwers-by-survey'
import type { SaveSurveyResult } from '@/domain/use-cases/save-survey-result'

export class LoadAnwersBySurveyStub implements LoadAnwersBySurvey {
  async loadAnwers (id: string): Promise<LoadAnwersBySurvey.Result> {
    return Promise.resolve(['any_anwer', 'other_anwer'])
  }
}

export class SaveSurveyResultStub implements SaveSurveyResult {
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

export const mockSaveSurveyResultStub = (): SaveSurveyResult => {
  return new SaveSurveyResultStub()
}

export const mockLoadAnwersBySurveyStub = (): LoadAnwersBySurvey => {
  return new LoadAnwersBySurveyStub()
}
