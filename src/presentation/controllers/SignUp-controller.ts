export class SignUpController {
  handle (request: any): any {
    const requiredFields = ['name', 'email']
    for (const field of requiredFields) {
      if (!request[field]) {
        return {
          statusCode: 400,
          body: new Error(`Missing param: ${field}`)

        }
      }
    }
  }
}
