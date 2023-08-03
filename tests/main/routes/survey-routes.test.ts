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
      await request(app).post('/api/add-survey').send({
        question: 'any_question',
        anwers: [{
          anwer: 'any_anwern',
          image: 'any_image'
        }]
      }).expect(204)
    })
  })
})
