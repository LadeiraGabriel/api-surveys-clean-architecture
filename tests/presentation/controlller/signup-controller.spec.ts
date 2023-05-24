import { SignUpController } from '../../../src/presentation/controllers/SignUp-controller'
describe('SignUp Controller', () => {
  test('Should return 400 if name not is provided', () => {
    const request = {
      email: 'gabriel@mail.com',
      password: '123456',
      passwordConfirmation: '123456'
    }
    const sut = new SignUpController()
    const httpResponse = sut.handle(request)
    expect(httpResponse.statusCode).toEqual(400)
    expect(httpResponse.body).toEqual(new Error('Missing param error!'))
  })
})
