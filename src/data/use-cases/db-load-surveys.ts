import type { LoadSurveys } from '../../domain/use-cases'
import type { LoadSurveysRepository } from '../protocols/db/survey/load-surveys-repository'

export class DbLoadSurveys implements LoadSurveys {
  constructor (private readonly loadSurveysRepository: LoadSurveysRepository) {}
  async load (): Promise<LoadSurveys.Result[]> {
    await this.loadSurveysRepository.loadSurveys()
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
