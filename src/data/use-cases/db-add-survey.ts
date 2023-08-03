import type { AddSurvey } from '../../domain/use-cases/add-survey'
import type { AddSurveyRepository } from '../protocols/db/survey/add-survey-repository'

export class DbAddSurvey implements AddSurvey {
  constructor (private readonly addSurveyRepository: AddSurveyRepository) {}
  async add (data: AddSurvey.Params): AddSurvey.Result {
    await this.addSurveyRepository.add(data)
    return Promise.resolve(null)
  }
}
