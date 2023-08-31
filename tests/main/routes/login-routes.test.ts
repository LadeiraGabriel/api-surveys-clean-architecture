import request from 'supertest'
import type { Express } from 'express'
import { setupApp } from '@/main/config/app'
import { prismaClientHelper } from '@/infra/helpers/prisma-client-helper'

let app: Express

describe('Routes', () => {
  beforeAll(async () => {
    app = await setupApp()
  })

  beforeEach(async () => {
    await prismaClientHelper.account.deleteMany({})
  })
  afterEach(async () => {
    await prismaClientHelper.account.deleteMany({})
  })

  describe('sign up', () => {
    test('Should return 200 on success', async () => {
      await request(app).post('/api/signup').send({
        name: 'any_name',
        email: 'any_email@gmail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }).expect(200)
    })
  })

  describe('Login', () => {
    test('Should return 200 on success', async () => {
      await prismaClientHelper.account.create({
        data: {
          name: 'any_name',
          email: 'any_email@gmail.com',
          password: '$2b$12$vE.nSc9qmclKapl15JxG/exfGpSHUzY2MCIjs/hLYlVNC3ITW.kt.'
        }
      })

      await request(app).post('/api/login').send({
        email: 'any_email@gmail.com',
        password: 'any_password'
      }).expect(200)
    })
  })
})
