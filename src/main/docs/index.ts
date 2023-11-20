import { loginPath, surveysPath, signupPath, saveSurveyResultPath } from './paths'
import { badRequest, anauthorized, serverError, notFound, forbidden } from '@/main/docs/components'
import {
  accountSchema,
  loginParamsSchema,
  errorSchema,
  surveysSchema,
  surveySchema,
  surveyAnwerSchema,
  apiKeyAuthSchema,
  addSurveyParamsSchema,
  signupParamsSchema,
  surveyResultSchema,
  surveyResultAnwerSchema,
  surveyResultParamsSchema
} from '@/main/docs/schemas'

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
  tags: [
    {
      name: 'Login'
    },
    {
      name: 'Surveys'
    }
  ],
  paths: {
    '/signup': signupPath,
    '/login': loginPath,
    '/surveys': surveysPath,
    '/surveys/{surveyId}/results': saveSurveyResultPath
  },
  schemas: {
    account: accountSchema,
    signupParams: signupParamsSchema,
    loginParams: loginParamsSchema,
    addSurveyParams: addSurveyParamsSchema,
    surveys: surveysSchema,
    survey: surveySchema,
    surveyAnwer: surveyAnwerSchema,
    surveyResult: surveyResultSchema,
    surveyResultAnwer: surveyResultAnwerSchema,
    surveyResultParams: surveyResultParamsSchema,
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
