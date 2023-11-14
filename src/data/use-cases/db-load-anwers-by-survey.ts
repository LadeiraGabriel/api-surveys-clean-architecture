import type { LoadAnwersBySurvey } from '@/domain/use-cases/load-anwers-by-survey'
import type { LoadAnwersBySurveyRepository } from '../protocols/db/survey/load-anwer-by-survey-repository'

export class DbLoadAnwersBySurvey implements LoadAnwersBySurvey {
  constructor (private readonly loadAnwersBySurveyRepository: LoadAnwersBySurveyRepository) {}
  async loadAnwers (id: string): Promise<LoadAnwersBySurvey.Result> {
    await this.loadAnwersBySurveyRepository.loadAnwersBySurvey(id)
    return Promise.resolve([''])
  }
}
