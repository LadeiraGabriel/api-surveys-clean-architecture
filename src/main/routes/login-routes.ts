import type { Router } from 'express'
import { adapterRoute } from '@/main/adapters/adapterRoute'
import { makeSignUpController } from '@/main/factories/controllers/signup'
import { makeLoginController } from '@/main/factories/controllers/login'

export default (router: Router): void => {
  router.post('/signup', adapterRoute(makeSignUpController()))
  router.post('/login', adapterRoute(makeLoginController()))
}
