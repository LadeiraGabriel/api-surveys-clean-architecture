import type { LoadSurveys, AddSurvey } from '@/domain/use-cases'
import type { CheckSurveyById } from '@/domain/use-cases/check-survey-by-id'

export const mockRequest = (): AddSurvey.Params => ({
  question: 'any_question',
  anwers: [{
    anwer: 'any_anwern',
    image: 'any_image'
  }],
  date: new Date()
})

export const mockAddSurveyStub = (): AddSurvey => {
  class AddSurveyStub implements AddSurvey {
    async add (data: AddSurvey.Params): AddSurvey.Result {
      return null
    }
  }

  return new AddSurveyStub()
}

export const mockLoadSurveysStub = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async load (): Promise<LoadSurveys.Result[]> {
      return [{
        id: 'any_id',
        question: 'any_question',
        anwers: [
          {
            anwer: 'any_anwer',
            image: 'any_image'
          }
        ],
        date: new Date()
      }]
    }
  }
  return new LoadSurveysStub()
}

export const mockCheckSurveyById = (): CheckSurveyById => {
  class CheckSurveyByIdStub implements CheckSurveyById {
    async checkById (id: string): Promise<CheckSurveyById.Result> {
      return Promise.resolve(true)
    }
  }
  return new CheckSurveyByIdStub()
}
