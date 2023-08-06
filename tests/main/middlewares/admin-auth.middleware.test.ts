import { setupApp } from '../../../src/main/config/app'
import request from 'supertest'
import type { Express } from 'express'
import { prismaClientHelper } from '../../../src/infra/helpers/prisma-client-helper'
import { adminAuthMiddleware } from '../../../src/main/middlewares/admin-auth-middleware'

let app: Express
describe('Admin auth Middleware', () => {
  beforeAll(async () => {
    app = await setupApp()
    await prismaClientHelper.account.deleteMany({})
    await prismaClientHelper.account.deleteMany({})
  })

  afterAll(async () => {
    await prismaClientHelper.account.deleteMany({})
    await prismaClientHelper.account.deleteMany({})
  })
  test('should access the admin route', async () => {
    await prismaClientHelper.account.create({
      data: {
        name: 'any_name',
        email: 'any_email@gmail.com',
        password: '$2b$12$vE.nSc9qmclKapl15JxG/exfGpSHUzY2MCIjs/hLYlVNC3ITW.kt.',
        token: 'any_token',
        role: 'admin'
      }
    })

    app.post('/test_admin_auth_middleware', adminAuthMiddleware, (req, res) => {
      res.send(req.body)
    })

    await request(app).post('/test_admin_auth_middleware').set('x-access-token', 'any_token').send({ name: 'gabriel' }).expect({ name: 'gabriel' })
  })
})
