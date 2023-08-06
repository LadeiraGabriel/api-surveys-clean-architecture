import { DbLoadAccountByToken } from './../../../data/use-cases/db-load-account-by-token'
import { AuthMiddleware } from '../../../presentation/middlewares/auth-middleware'
import type { Middleware } from '../../../presentation/protocols/middleware'
import { AccountPrismaRepository } from '../../../infra/db/prisma/account-prisma-repository'

export const makeAuthMiddlewareFactory = (role: string): Middleware => {
  const accountPrismaRepository = new AccountPrismaRepository()
  const dbLoadAccountByToken = new DbLoadAccountByToken(accountPrismaRepository)
  return new AuthMiddleware(dbLoadAccountByToken, role)
}
