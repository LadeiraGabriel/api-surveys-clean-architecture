import type { AddSurveyRepository } from '../../../src/data/protocols/db/survey/add-survey-repository'
import { DbAddSurvey } from '../../../src/data/use-cases/db-add-survey'
import { mockRequest } from '../../presentation/mocks/mock-survey'

describe('DbAddSurvey UseCase', () => {
  test('Should call addSurveyRepository with correct values', async () => {
    class AddSurveyRepositoryStub implements AddSurveyRepository {
      async add (data: AddSurveyRepository.Params): AddSurveyRepository.Result {
        return Promise.resolve(null)
      }
    }
    const addSurveyRepositoryStub = new AddSurveyRepositoryStub()
    const sut = new DbAddSurvey(addSurveyRepositoryStub)
    const spyAddRepo = jest.spyOn(addSurveyRepositoryStub, 'add')
    await sut.add(mockRequest())
    expect(spyAddRepo).toHaveBeenCalledWith(mockRequest())
  })
})
