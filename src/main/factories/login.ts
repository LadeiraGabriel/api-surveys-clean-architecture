import { DbAthentication } from '../../data/use-cases/db-authentication'
import { BcryptAdapter } from '../../infra/cryptography/bcrypt-adapter'
import { JwtAdapter } from '../../infra/cryptography/jwt-adapter'
import { AccountPrismaRepository } from '../../infra/db/prisma/account-prisma-repository'
import { LogPrismaRepository } from '../../infra/db/prisma/log-prisma-repository'
import { LoginController } from '../../presentation/controllers/login-controller'
import type { Controller } from '../../presentation/protocols'
import { EmailValidatorApdater } from '../../infra/validators/Email-validator-adapter'
import { LogControllerDecorator } from '../decorator/log-controller-decorator'

export const makeLoginController = (): Controller => {
  const salt = 12
  const emailValidatorAdapter = new EmailValidatorApdater()
  const accountPrismaRepository = new AccountPrismaRepository()
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(process.env.SECRET_KEY)
  const dbAuthentication = new DbAthentication(accountPrismaRepository, bcryptAdapter, jwtAdapter, accountPrismaRepository)
  const loginController = new LoginController(emailValidatorAdapter, dbAuthentication)
  const logPrismaRepository = new LogPrismaRepository()
  return new LogControllerDecorator(loginController, logPrismaRepository)
}
