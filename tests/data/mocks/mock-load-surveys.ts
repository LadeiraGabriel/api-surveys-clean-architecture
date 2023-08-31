import type { LoadSurveysRepository } from '@/data/protocols/db/survey/load-surveys-repository'

export const mockLoadSurveysRepositoryStub = (): LoadSurveysRepository => {
  class LoadSurveysRepositoryStub implements LoadSurveysRepository {
    async loadSurveys (): Promise<LoadSurveysRepository.Result[]> {
      return Promise.resolve([{
        id: 'any_id',
        question: 'any_question',
        anwers: [
          {
            anwer: 'any_anwer',
            image: 'any_image'
          }
        ]
      }])
    }
  }
  return new LoadSurveysRepositoryStub()
}
