import type { SurveyResultModel } from '@/domain/models/survey-result-model'
import type { SaveSurveyResult } from '@/domain/use-cases/save-survey-result'
import type { SaveSurveyResultRepository } from '@/data/protocols/db/survey/save-survey-result-repository'
import type { LoadSurveyResultRepository } from '../protocols/db/survey/load-survey-result-repository'

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor (private readonly saveSurveyResultRepository: SaveSurveyResultRepository, private readonly loadSurveyResultRepository: LoadSurveyResultRepository) {}
  async save (data: SaveSurveyResult.Params): Promise<SurveyResultModel> {
    await this.saveSurveyResultRepository.saveSurveyResult(data)
    return await this.loadSurveyResultRepository.loadSurveyResult(data.surveyId, data.accountId)
  }
}
