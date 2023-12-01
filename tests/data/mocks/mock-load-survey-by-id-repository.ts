import type { LoadSurveyByIdRepository } from '../protocols/db/survey/load-survey-by-id-repository'

export const mockLoadSurveyByIdRepositorySpy = (): LoadSurveyByIdRepositorySpy => {
  return new LoadSurveyByIdRepositorySpy()
}

export class LoadSurveyByIdRepositorySpy implements LoadSurveyByIdRepository {
  surveyId: LoadSurveyByIdRepository.Params
  result: LoadSurveyByIdRepository.Result = {
    id: 'any_id',
    question: 'any_question',
    anwers: [
      {
        anwer: 'any_anwer',
        image: 'any_image'
      }
    ],
    date: new Date()
  }

  async loadSurveyById (surveyId: LoadSurveyByIdRepository.Params): Promise<LoadSurveyByIdRepository.Result> {
    this.surveyId = surveyId
    return this.result
  }
}
