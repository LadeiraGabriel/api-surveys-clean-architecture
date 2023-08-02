import { LogPrismaRepository } from './../../infra/db/prisma/log-prisma-repository'
import { DbAddAccount } from '../../data/use-cases/db-add-acount'
import { DbAthentication } from '../../data/use-cases/db-authentication'
import { BcryptAdapter } from '../../infra/cryptography/bcrypt-adapter'
import { JwtAdapter } from '../../infra/cryptography/jwt-adapter'
import { AccountPrismaRepository } from '../../infra/db/prisma/account-prisma-repository'
import { SignUpController } from '../../presentation/controllers/login/SignUp-controller'
import type { Controller } from '../../presentation/protocols'
import { LogControllerDecorator } from '../decorator/log-controller-decorator'
import { makeSignUpValidation } from './signup-validations'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const bcrytpAdapter = new BcryptAdapter(salt)
  const accountPrismaRepository = new AccountPrismaRepository()
  const jwtAdapter = new JwtAdapter(process.env.SECRET_KEY)
  const dbAddAccount = new DbAddAccount(bcrytpAdapter, accountPrismaRepository, accountPrismaRepository)
  const dbAuthentication = new DbAthentication(accountPrismaRepository, bcrytpAdapter, jwtAdapter, accountPrismaRepository)
  const signupController = new SignUpController(makeSignUpValidation(), dbAddAccount, dbAuthentication)
  const logPrismaRepository = new LogPrismaRepository()
  return new LogControllerDecorator(signupController, logPrismaRepository)
}
