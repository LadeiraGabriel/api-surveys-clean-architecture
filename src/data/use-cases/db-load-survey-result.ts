import type { LoadSurveyResult } from '@/domain/use-cases/load-survey-result'
import type { LoadSurveyResultRepository } from '@/data/protocols/db/survey/load-survey-result-repository'

export class DbLoadSurveyResult implements LoadSurveyResult {
  constructor (private readonly loadSurveyResultRepository: LoadSurveyResultRepository) { }
  async load (data: LoadSurveyResult.Params): Promise<LoadSurveyResult.Result> {
    await this.loadSurveyResultRepository.loadBySurveyId(data.surveyId, data.accountId)
    return Promise.resolve(null)
  }
}
