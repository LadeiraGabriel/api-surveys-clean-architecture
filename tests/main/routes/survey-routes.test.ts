import type { Express } from 'express'
import { setupApp } from '../../../src/main/config/app'
import request from 'supertest'
import { prismaClientHelper } from '../../../src/infra/helpers/prisma-client-helper'

let app: Express

beforeAll(async () => {
  app = await setupApp()
  await prismaClientHelper.anwer.deleteMany({})
  await prismaClientHelper.survey.deleteMany({})
})

afterAll(async () => {
  await prismaClientHelper.anwer.deleteMany({})
  await prismaClientHelper.survey.deleteMany({})
})

describe('Survey Routes', () => {
  describe('Add Survey Route', () => {
    test('Should return 204 on success', async () => {
      await prismaClientHelper.account.create({
        data: {
          name: 'any_name',
          email: 'any_email@gmail.com',
          password: '$2b$12$vE.nSc9qmclKapl15JxG/exfGpSHUzY2MCIjs/hLYlVNC3ITW.kt.',
          token: 'any_token',
          role: 'admin'
        }
      })
      await request(app).post('/api/add-survey').set('x-access-token', 'any_token').send({
        question: 'any_question',
        anwers: [{
          anwer: 'any_anwern',
          image: 'any_image'
        }]
      }).expect(204)
    })
  })
})
