import type { AddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository'
import type { AddSurvey } from '@/domain/use-cases/add-survey'
import { DbAddSurvey } from '@/data/use-cases/db-add-survey'
import { AddSurveyRepositoryStub } from '@/tests/data/mocks/mock-db-add-survey'
type SutType = {
  sut: DbAddSurvey
  addSurveyRepositoryStub: AddSurveyRepository
}

const makeSut = (): SutType => {
  const addSurveyRepositoryStub = new AddSurveyRepositoryStub()
  const sut = new DbAddSurvey(addSurveyRepositoryStub)
  return {
    sut,
    addSurveyRepositoryStub
  }
}

export const mockRequest = (): AddSurvey.Params => ({
  question: 'any_question',
  anwers: [{
    anwer: 'any_anwern',
    image: 'any_image'
  }]
})

describe('DbAddSurvey UseCase', () => {
  test('Should call addSurveyRepository with correct values', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()
    const spyAddRepo = jest.spyOn(addSurveyRepositoryStub, 'add')
    await sut.add(mockRequest())
    expect(spyAddRepo).toHaveBeenCalledWith(mockRequest())
  })

  test('Should throws if addSurveyRepository throws', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()
    jest.spyOn(addSurveyRepositoryStub, 'add').mockReturnValueOnce(Promise.reject(new Error()))
    const response = sut.add(mockRequest())
    await expect(response).rejects.toThrow()
  })
})
