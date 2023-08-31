import type { LoadSurveys, AddSurvey } from '@/domain/use-cases'

export const mockRequest = (): AddSurvey.Params => ({
  question: 'any_question',
  anwers: [{
    anwer: 'any_anwern',
    image: 'any_image'
  }]
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
        ]
      }]
    }
  }
  return new LoadSurveysStub()
}
