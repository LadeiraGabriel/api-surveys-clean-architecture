import { loginPath } from './paths'
import { badRequest, anauthorized, serverError, notFound } from '@/main/docs/components'
import { accountSchema, loginParamsSchema, errorSchema } from '@/main/docs/schemas'

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
  }],
  paths: {
    '/login': loginPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    error: errorSchema
  },
  components: {
    badRequest,
    anauthorized,
    serverError,
    notFound
  }
}
