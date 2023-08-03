import type { AddSurvey } from '../../../src/domain/use-cases/add-survey'

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
