import type { CheckSurveyByIdRepository } from '@/data/protocols/db/survey/check-survey-by-id-repository'

class CheckSurveyByIdRepositoryStub implements CheckSurveyByIdRepository {
  async checkById (id: string): Promise<CheckSurveyByIdRepository.Result> {
    return Promise.resolve(true)
  }
}

export const makeCheckSurveyByIdRepositoryStub = (): CheckSurveyByIdRepository => {
  return new CheckSurveyByIdRepositoryStub()
}
