import { adapterMiddleware } from '../../../src/main/adapters/adapterMiddleware'
import { makeAuthMiddlewareFactory } from '../../../src/main/factories/middleware-factories/auth-middleware-factory'

export const adminAuthMiddleware = adapterMiddleware(makeAuthMiddlewareFactory('admin'))