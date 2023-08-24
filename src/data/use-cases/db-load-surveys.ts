import type { LoadSurveys } from '../../domain/use-cases'
import type { LoadSurveysRepository } from '../protocols/db/survey/load-surveys-repository'

export class DbLoadSurveys implements LoadSurveys {
  constructor (private readonly loadSurveysRepository: LoadSurveysRepository) {}
  async load (): Promise<LoadSurveys.Result[]> {
    const listSurveys = await this.loadSurveysRepository.loadSurveys()
    return listSurveys
  }
}
