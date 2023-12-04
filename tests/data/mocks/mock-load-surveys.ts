import type { LoadSurveysRepository } from '@/data/protocols/db/survey/load-surveys-repository'

export class LoadSurveysRepositorySpy implements LoadSurveysRepository {
  call: boolean = false
  result = [{
    id: 'any_id',
    question: 'any_question',
    anwers: [
      {
        anwer: 'any_anwer',
        image: 'any_image'
      }
    ],
    date: new Date()
  }]

  async loadSurveys (): Promise<LoadSurveysRepository.Result[]> {
    this.call = true
    return this.result
  }
}

export const mockLoadSurveysRepositorySpy = (): LoadSurveysRepositorySpy => {
  return new LoadSurveysRepositorySpy()
}
