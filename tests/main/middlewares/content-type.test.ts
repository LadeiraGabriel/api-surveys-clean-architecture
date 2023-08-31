import request from 'supertest'
import { setupApp } from '@/main/config/app'
import type { Request, Response, Express } from 'express'

let app: Express
describe('Content type', () => {
  beforeAll(async () => {
    app = await setupApp()
  })
  test('Should have content type json default', async () => {
    app.get('/test-content-type', (req: Request, res: Response) => {
      res.send('')
    })
    await request(app).get('/test-content-type').expect('content-type', /json/)
  })

  test('Should have content type xml', async () => {
    app.get('/test-content-type-xml', (req: Request, res: Response) => {
      res.type('xml')
      res.send('')
    })
    await request(app).get('/test-content-type-xml').expect('content-type', /xml/)
  })
})
