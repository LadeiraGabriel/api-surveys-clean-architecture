import type { CheckSurveyByIdRepository } from '@/data/protocols/db/survey/check-survey-by-id-repository'

export class CheckSurveyByIdRepositorySpy implements CheckSurveyByIdRepository {
  id: string
  result: CheckSurveyByIdRepository.Result = true
  async checkById (id: string): Promise<CheckSurveyByIdRepository.Result> {
    this.id = id
    return this.result
  }
}

export const makeCheckSurveyByIdRepositoryStub = (): CheckSurveyByIdRepositorySpy => {
  return new CheckSurveyByIdRepositorySpy()
}
