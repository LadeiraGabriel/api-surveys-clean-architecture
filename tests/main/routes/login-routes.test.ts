import request from 'supertest'
import type { Express } from 'express'
import { setupApp } from '../../../src/main/config/app'

let app: Express

describe('Routes', () => {
  beforeAll(async () => {
    app = await setupApp()
  })
  test('Should return 200 on success', async () => {
    await request(app).post('/api/sign-up').send({
      name: 'gabriel',
      email: 'gabrielladeira8@gmail.com',
      password: '123',
      passwordConfirmation: '123'
    }).expect(200)
  })
})
