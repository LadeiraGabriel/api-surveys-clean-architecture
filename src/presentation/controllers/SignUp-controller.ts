export class SignUpController {
  handle (request: any): any {
    const { name, email } = request

    if (!name) {
      return {
        statusCode: 400,
        body: new Error('Missing param error: name')

      }
    }

    if (!email) {
      return {
        statusCode: 400,
        body: new Error('Missing param error: email')
      }
    }
  }
}
