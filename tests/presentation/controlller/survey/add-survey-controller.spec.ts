import type { AddSurvey } from '../../../../src/domain/use-cases/add-survey'
import { AddSurveyController } from '../../../../src/presentation/controllers/survey/add-survey-controller'
import { badRequest, noContent, serverError } from '../../../../src/presentation/helpers/http-helper'
import type { Controller, Validation } from '../../../../src/presentation/protocols'
import { mockValidationStub } from '../../mocks'
import { mockAddSurveyStub } from '../../mocks/mock-survey'

type SutType = {
  sut: Controller
  validationStub: Validation
  addSuveyStub: AddSurvey
}

const makeSut = (): SutType => {
  const validationStub = mockValidationStub()
  const addSuveyStub = mockAddSurveyStub()
  const sut = new AddSurveyController(validationStub, addSuveyStub)
  return {
    sut,
    validationStub,
    addSuveyStub
  }
}

export const mockRequest = (): AddSurvey.Params => ({
  question: 'any_question',
  anwers: [{
    anwer: 'any_anwern',
    image: 'any_image'
  }]
})

describe('Add Survey controller', () => {
  test('should call validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const spyValidate = jest.spyOn(validationStub, 'validate')
    await sut.handle(mockRequest())
    expect(spyValidate).toHaveBeenCalledWith(mockRequest())
  })

  test('should return 400 if validation return a error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('should call add survey with correct values', async () => {
    const { sut, addSuveyStub } = makeSut()
    const spyAdd = jest.spyOn(addSuveyStub, 'add')
    await sut.handle(mockRequest())
    expect(spyAdd).toHaveBeenCalledWith(mockRequest())
  })

  test('should call add survey with correct values', async () => {
    const { sut, addSuveyStub } = makeSut()
    jest.spyOn(addSuveyStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
