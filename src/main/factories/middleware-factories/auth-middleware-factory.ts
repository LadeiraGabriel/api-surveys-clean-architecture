import { DbLoadAccountByToken } from './../../../data/use-cases/db-load-account-by-token'
import { AuthMiddleware } from '../../../presentation/middlewares/auth-middleware'
import type { Middleware } from '../../../presentation/protocols/middleware'
import { AccountPrismaRepository } from '../../../infra/db/prisma/account-prisma-repository'
import { JwtAdapter } from '../../../infra/cryptography/jwt-adapter'

export const makeAuthMiddlewareFactory = (role: string): Middleware => {
  const jwrAdapter = new JwtAdapter(process.env.SECRET_KEY)
  const accountPrismaRepository = new AccountPrismaRepository()
  const dbLoadAccountByToken = new DbLoadAccountByToken(accountPrismaRepository, jwrAdapter)
  return new AuthMiddleware(dbLoadAccountByToken, role)
}
