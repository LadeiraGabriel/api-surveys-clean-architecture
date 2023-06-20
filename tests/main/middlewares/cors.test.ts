import request from 'supertest'
import { setupApp } from './../../../src/main/config/app'
import type { Express } from 'express'

let app: Express

describe('Middlewere Cors', () => {
  beforeAll(async () => {
    app = await setupApp()
  })
  test('should open comunication between other devices', async () => {
    app.get('/test-cors', (req, res) => {
      res.send('')
    })

    await request(app).get('/test-cors').expect('access-control-allow-origin', '*')
    await request(app).get('/test-cors').expect('access-control-allow-methods', '*')
    await request(app).get('/test-cors').expect('access-control-request-headers', '*')
  })
})
