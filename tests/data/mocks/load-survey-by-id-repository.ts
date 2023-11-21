import type { LoadSurveyByIdRepository } from '../protocols/db/survey/load-survey-by-id-repository'

export const makeLoadSurveyByIdRepositoryStub = (): LoadSurveyByIdRepositoryStub => {
  return new LoadSurveyByIdRepositoryStub()
}

class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
  async loadSurveyById (surveyId: LoadSurveyByIdRepository.Params): Promise<LoadSurveyByIdRepository.Result> {
    return {
      id: 'any_id',
      question: 'any_ question',
      anwers: [
        {
          anwer: 'any_anwer',
          image: 'any_image'
        }
      ],
      date: new Date()
    }
  }
}
