import { SignUpController } from '../../../src/presentation/controllers/SignUp-controller'
describe('SignUp Controller', () => {
  test('Should return 400 if name not is provided', () => {
    const request = {
      email: 'any_email',
      password: 'any_password',
      passwordConfirmation: 'any_password'
    }
    const sut = new SignUpController()
    const httpResponse = sut.handle(request)
    expect(httpResponse.statusCode).toEqual(400)
    expect(httpResponse.body).toEqual(new Error('Missing param: name'))
  })

  test('Should return 400 if email not is provided', () => {
    const request = {
      name: 'any_name',
      password: 'any_password',
      passwordConfirmation: 'any_password'
    }
    const sut = new SignUpController()
    const httpResponse = sut.handle(request)
    expect(httpResponse.statusCode).toEqual(400)
    expect(httpResponse.body).toEqual(new Error('Missing param: email'))
  })

  test('Should return 400 if password not is provided', () => {
    const request = {
      name: 'any_name',
      email: 'any_email',
      passwordConfirmation: 'any_password'
    }
    const sut = new SignUpController()
    const httpResponse = sut.handle(request)
    expect(httpResponse.statusCode).toEqual(400)
    expect(httpResponse.body).toEqual(new Error('Missing param: password'))
  })

  test('Should return 400 if password not is provided', () => {
    const request = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    }
    const sut = new SignUpController()
    const httpResponse = sut.handle(request)
    expect(httpResponse.statusCode).toEqual(400)
    expect(httpResponse.body).toEqual(new Error('Missing param: passwordConfirmation'))
  })
})
