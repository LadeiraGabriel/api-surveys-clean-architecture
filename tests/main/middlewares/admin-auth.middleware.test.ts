import { setupApp } from '@/main/config/app'
import { adminAuthMiddleware } from '@/main/middlewares/admin-auth-middleware'
import { prismaClientHelper } from '@/infra/helpers/prisma-client-helper'
import Jwt from 'jsonwebtoken'
import request from 'supertest'
import type { Express } from 'express'

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
    let account = await prismaClientHelper.account.create({
      data: {
        name: 'any_name',
        email: 'any_email@gmail.com',
        password: '$2b$12$vE.nSc9qmclKapl15JxG/exfGpSHUzY2MCIjs/hLYlVNC3ITW.kt.',
        role: 'admin'
      }
    })
    account = await prismaClientHelper.account.update({
      where: {
        id: account.id
      },
      data: {
        token: Jwt.sign({ id: account.id }, process.env.SECRET_KEY)
      }
    })

    app.post('/test_admin_auth_middleware', adminAuthMiddleware, (req, res) => {
      res.send(req.body)
    })

    await request(app).post('/test_admin_auth_middleware').set('x-access-token', account.token).send({ name: 'gabriel' }).expect({ name: 'gabriel' })
  })
})
