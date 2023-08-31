import { setupApp } from '@/main/config/app'
import request from 'supertest'
import type { Express } from 'express'

let app: Express
describe('Body Parser Middleware', () => {
  beforeAll(async () => {
    app = await setupApp()
  })
  test('should parse body as json ', async () => {
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body)
    })

    await request(app).post('/test_body_parser').send({ name: 'gabriel' }).expect({ name: 'gabriel' })
  })
})
