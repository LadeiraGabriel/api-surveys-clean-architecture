import type { AddSurvey } from '@/domain/use-cases/add-survey'
import { AddSurveyController } from '@/presentation/controllers/survey/add-survey-controller'
import { badRequest, noContent, serverError } from '@/presentation/helpers/http-helper'
import type { Controller, Validation } from '@/presentation/protocols'
import { mockValidationSpy } from '@/tests/presentation/mocks'
import { mockAddSurveyStub } from '@/tests/presentation/mocks/mock-survey'
import MockDate from 'mockdate'

type SutType = {
  sut: Controller
  validationStub: Validation
  addSuveyStub: AddSurvey
}

const makeSut = (): SutType => {
  const validationStub = mockValidationSpy()
  const addSuveyStub = mockAddSurveyStub()
  const sut = new AddSurveyController(validationStub, addSuveyStub)
  return {
    sut,
    validationStub,
    addSuveyStub
  }
}

export const mockRequest = (): Omit<AddSurvey.Params, 'date'> => ({
  question: 'any_question',
  anwers: [{
    anwer: 'any_anwern',
    image: 'any_image'
  }]
})

describe('Add Survey controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })
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
    expect(spyAdd).toHaveBeenCalledWith({ ...mockRequest(), date: new Date() })
  })

  test('should return 500 if add survey throws', async () => {
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
