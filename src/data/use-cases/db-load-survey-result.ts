import type { LoadSurveyResult } from '@/domain/use-cases/load-survey-result'
import type { LoadSurveyResultRepository } from '@/data/protocols/db/survey/load-survey-result-repository'
import type { LoadSurveyByIdRepository } from '@/data/protocols/db/survey/load-survey-by-id-repository'

export class DbLoadSurveyResult implements LoadSurveyResult {
  constructor (private readonly loadSurveyResultRepository: LoadSurveyResultRepository, private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository) { }
  async load (data: LoadSurveyResult.Params): Promise<LoadSurveyResult.Result> {
    const loadResult = await this.loadSurveyResultRepository.loadBySurveyId(data.surveyId, data.accountId)

    if (!loadResult) {
      await this.loadSurveyByIdRepository.loadSurveyById(data.surveyId)
      return {
        surveyId: 'any_surveyid',
        question: 'any_question',
        anwers: [
          {
            image: 'any_image',
            anwer: 'any_anwer',
            count: 0,
            percent: 0,
            isCurrentAccountAnwer: false
          }
        ],
        date: new Date()
      }
    }
    return Promise.resolve(null)
  }
}
