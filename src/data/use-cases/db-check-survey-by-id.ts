import type { CheckSurveyById } from '@/domain/use-cases/check-survey-by-id'
import type { CheckSurveyByIdRepository } from '@/data/protocols/db/survey/check-survey-by-id-repository'

export class DbCheckSurveyById implements CheckSurveyById {
  constructor (private readonly checkSurveyByIdRepository: CheckSurveyByIdRepository) { }
  async checkById (id: string): Promise<CheckSurveyById.Result> {
    const check = await this.checkSurveyByIdRepository.checkById(id)
    return check
  }
}
