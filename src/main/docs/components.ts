import { apiKeyAuthSchema } from './schemas/'
import { forbidden, badRequest, anauthorized, serverError, notFound } from './components/'

export default {
  securitySchemes: {
    apiKeyAuth: apiKeyAuthSchema
  },
  forbidden,
  badRequest,
  anauthorized,
  serverError,
  notFound
}
