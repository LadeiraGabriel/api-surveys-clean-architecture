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

beforeEach(async () => {
  app = await setupApp()
  await prismaClientHelper.account.deleteMany({})
  await prismaClientHelper.anwer.deleteMany({})
  await prismaClientHelper.survey.deleteMany({})
})

afterEach(async () => {
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
  describe('Save Survey Result Route', () => {
    test('Should return 200 on success', async () => {
      const survey = await prismaClientHelper.survey.create({
        data: {
          question: 'any_question',
          date: new Date(),
          anwers: {
            createMany: {
              data: [
                {
                  anwer: 'any_anwer',
                  image: 'any_iamge'
                },
                {
                  anwer: 'other_anwer',
                  image: 'other_image'
                }
              ]
            }
          }
        }
      })
      let account = await prismaClientHelper.account.create({
        data: {
          name: 'any_name',
          email: 'any_email@gmail.com',
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
      await request(app).put(`/api/surveys/${survey.id}/results`).set('x-access-token', account.token).send({
        anwer: 'other_anwer'
      }).expect(200)
    })
  })

  describe('Load Survey Result Route', () => {
    test('Should return 200 on success', async () => {
      const survey = await prismaClientHelper.survey.create({
        data: {
          question: 'any_question',
          date: new Date(),
          anwers: {
            createMany: {
              data: [
                {
                  anwer: 'any_anwer',
                  image: 'any_iamge'
                },
                {
                  anwer: 'other_anwer',
                  image: 'other_image'
                }
              ]
            }
          }
        }
      })
      let account = await prismaClientHelper.account.create({
        data: {
          name: 'any_name',
          email: 'any_email@gmail.com',
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
      await request(app)
        .get(`/api/surveys/${survey.id}/results`)
        .set('x-access-token', account.token)
        .send()
        .expect(200)
    })
  })
})
