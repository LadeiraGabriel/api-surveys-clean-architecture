import type { AddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository'

export class AddSurveyRepositorySpy implements AddSurveyRepository {
  data: AddSurveyRepository.Params
  result = null
  async add (data: AddSurveyRepository.Params): AddSurveyRepository.Result {
    this.data = data
    return this.result
  }
}
