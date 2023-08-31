import { setupApp } from '@/main/config/app'
import request from 'supertest'
import { prismaClientHelper } from '@/infra/helpers/prisma-client-helper'
import Jwt from 'jsonwebtoken'
import type { Express } from 'express'

let app: Express

beforeAll(async () => {
  app = await setupApp()
  await prismaClientHelper.account.deleteMany({})
  await prismaClientHelper.anwer.deleteMany({})
  await prismaClientHelper.survey.deleteMany({})
})

afterAll(async () => {
  await prismaClientHelper.account.deleteMany({})
  await prismaClientHelper.anwer.deleteMany({})
  await prismaClientHelper.survey.deleteMany({})
})

describe('Survey Routes', () => {
  describe('Add Survey Route', () => {
    test('Should return 204 on success', async () => {
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
      await request(app).post('/api/add-survey').set('x-access-token', account.token).send({
        question: 'any_question',
        anwers: [{
          anwer: 'any_anwern',
          image: 'any_image'
        }]
      }).expect(204)
    })
  })

  describe('Load Survey Route', () => {
    test('Should return 200 on success', async () => {
      let account = await prismaClientHelper.account.create({
        data: {
          name: 'any_name',
          email: 'other_email@gmail.com',
          password: '$2b$12$vE.nSc9qmclKapl15JxG/exfGpSHUzY2MCIjs/hLYlVNC3ITW.kt.'
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
      await request(app).get('/api/surveys').set('x-access-token', account.token).expect(200)
    })
  })
})
