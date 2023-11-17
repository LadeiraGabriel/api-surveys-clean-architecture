import { surveyAnwerSchema } from './schemas/survey-anwer-schema'
import { surveySchema } from './schemas/survey-schema'
import { loginPath, surveysPath } from './paths'
import { badRequest, anauthorized, serverError, notFound, forbidden } from '@/main/docs/components'
import { accountSchema, loginParamsSchema, errorSchema, surveysSchema, apiKeyAuthSchema } from '@/main/docs/schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean Node API',
    description: 'API de enquetes construida em node js com foco no estudo de arquitetura limpa e TDD',
    version: '1.0.0'
  },
  license: {
    name: 'GPL-3.0-or-later',
    url: 'https://spdx.org/licenses/GPL-3.0-or-later.html'
  },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'Login'
  },
  {
    name: 'Surveys'
  }
  ],
  paths: {
    '/login': loginPath,
    '/surveys': surveysPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    surveys: surveysSchema,
    survey: surveySchema,
    surveyAnwer: surveyAnwerSchema,
    error: errorSchema
  },
  components: {
    securitySchemes: {
      apiKeyAuth: apiKeyAuthSchema
    },
    forbidden,
    badRequest,
    anauthorized,
    serverError,
    notFound
  }
}
