import type { AddSurvey } from '../../../../src/domain/use-cases/add-survey'
import { AddSurveyController } from '../../../../src/presentation/controllers/survey/add-survey-controller'
import { badRequest } from '../../../../src/presentation/helpers/http-helper'
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

describe('Add Survey controller', () => {
  test('should call validation with correct values', async () => {
    const request = {
      question: 'any_question',
      anwerns: {
        anwerns: 'any_anwern',
        image: 'any_image'
      }
    }
    const { sut, validationStub } = makeSut()
    const spyValidate = jest.spyOn(validationStub, 'validate')
    await sut.handle(request)
    expect(spyValidate).toHaveBeenCalledWith(request)
  })

  test('should return 400 if validation return a error', async () => {
    const request = {
      question: 'any_question',
      anwerns: {
        anwerns: 'any_anwern',
        image: 'any_image'
      }
    }
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('should call add survey with correct values', async () => {
    const request = {
      question: 'any_question',
      anwerns: {
        anwerns: 'any_anwern',
        image: 'any_image'
      }
    }
    const { sut, addSuveyStub } = makeSut()
    const spyAdd = jest.spyOn(addSuveyStub, 'add')
    await sut.handle(request)
    expect(spyAdd).toHaveBeenCalledWith(request)
  })
})
