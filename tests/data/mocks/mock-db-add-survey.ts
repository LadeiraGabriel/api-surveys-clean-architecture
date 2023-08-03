import type { AddSurveyRepository } from '../../../src/data/protocols/db/survey/add-survey-repository'

export class AddSurveyRepositoryStub implements AddSurveyRepository {
  async add (data: AddSurveyRepository.Params): AddSurveyRepository.Result {
    return Promise.resolve(null)
  }
}
