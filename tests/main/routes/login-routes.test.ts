import request from 'supertest'
import type { Express } from 'express'
import { setupApp } from '../../../src/main/config/app'

let app: Express

describe('Routes', () => {
  beforeAll(async () => {
    app = await setupApp()
  })

  test('Should return 200 on success', async () => {
    await request(app).post('/api/signup').send({
      name: 'any_name',
      email: 'any_email@gmail.com',
      password: 'any_password',
      passwordConfirmation: 'any_password'
    }).expect(200)
  })
})
