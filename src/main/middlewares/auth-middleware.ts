import { adapterMiddleware } from '@/main/adapters/adapterMiddleware'
import { makeAuthMiddlewareFactory } from '@/main/factories/middleware-factories/auth-middleware-factory'

export const authMiddleware = adapterMiddleware(makeAuthMiddlewareFactory())
