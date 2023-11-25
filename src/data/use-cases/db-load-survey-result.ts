import type { LoadSurveyResult } from '@/domain/use-cases/load-survey-result'
import type { LoadSurveyResultRepository } from '@/data/protocols/db/survey/load-survey-result-repository'
import type { LoadSurveyByIdRepository } from '@/data/protocols/db/survey/load-survey-by-id-repository'
import type { SurveyModel } from '@/domain/models/survey-model'
import type { SurveyResultModel } from '@/domain/models/survey-result-model'

export class DbLoadSurveyResult implements LoadSurveyResult {
  constructor (private readonly loadSurveyResultRepository: LoadSurveyResultRepository, private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository) { }
  async load (accountId: string, surveyId: string): Promise<LoadSurveyResult.Result> {
    const loadResult = await this.loadSurveyResultRepository.loadBySurveyId(accountId, surveyId)

    if (!loadResult) {
      const survey = await this.loadSurveyByIdRepository.loadSurveyById(surveyId)
      return this.loadSurveyResultEmpty(survey)
    }
    return loadResult
  }

  loadSurveyResultEmpty (survey: SurveyModel): SurveyResultModel {
    return {
      surveyId: survey.id,
      question: survey.question,
      date: survey.date,
      anwers: survey.anwers.map((anwer) => {
        return {
          anwer: anwer.anwer,
          image: anwer.image,
          count: 0,
          percent: 0,
          isCurrentAccountAnwer: false
        }
      })
    }
  }
}
