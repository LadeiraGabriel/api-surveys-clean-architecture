import type { AddSurvey } from '../../../src/domain/use-cases/add-survey'

export const mockAddSurveyStub = (): AddSurvey => {
  class AddSurveyStub implements AddSurvey {
    async add (data: AddSurvey.Params): AddSurvey.Result {
      return null
    }
  }

  return new AddSurveyStub()
}
