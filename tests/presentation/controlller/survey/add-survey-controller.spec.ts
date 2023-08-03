import { AddSurveyController } from '../../../../src/presentation/controllers/survey/add-survey-controller'
import { badRequest } from '../../../../src/presentation/helpers/http-helper'
import type { Controller, Validation } from '../../../../src/presentation/protocols'
import { mockValidationStub } from '../../mocks'

type SutType = {
  sut: Controller
  validationStub: Validation
}

const makeSut = (): SutType => {
  const validationStub = mockValidationStub()
  const sut = new AddSurveyController(validationStub)
  return {
    sut,
    validationStub
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
})
