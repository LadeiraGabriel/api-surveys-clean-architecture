import type { CheckSurveyByIdRepository } from '@/data/protocols/db/survey/check-survey-by-id-repository'
import { DbCheckSurveyById } from '@/data/use-cases/db-check-survey-by-id'

describe('Db check survey by id', () => {
  test('should call check survey by id repository with correct values', async () => {
    class CheckSurveyByIdRepositoryStub implements CheckSurveyByIdRepository {
      async checkById (id: string): Promise<CheckSurveyByIdRepository.Result> {
        return Promise.resolve(true)
      }
    }

    const checkSurveyByIdRepository = new CheckSurveyByIdRepositoryStub()
    const sut = new DbCheckSurveyById(checkSurveyByIdRepository)
    const spyCheck = jest.spyOn(checkSurveyByIdRepository, 'checkById')
    await sut.checkById('any_id')
    expect(spyCheck).toHaveBeenCalledWith('any_id')
  })
})
