import { loginPath } from './paths/login-path'
import { accountSchema } from '@/main/docs/schemas/account-schema'
import { loginParamsSchema } from '@/main/docs/schemas/login-params-schema'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean Node API',
    description: 'API de enquetes construida em node js com foco no estudo de arquitetura limpa e TDD',
    version: '1.0.0'
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
    loginParams: loginParamsSchema
  }
}
