import { setupApp } from '@/main/config/app'
import { noCacheMiddleware } from '@/main/middlewares/no-cache-middleware'
import request from 'supertest'
import type { Express } from 'express'

let app: Express

describe('No cache Middlewere', () => {
  beforeAll(async () => {
    app = await setupApp()
  })
  test('should return headers with correct values', async () => {
    app.get('/test_no_cache', noCacheMiddleware, (req, res) => {
      res.send()
    })
    await request(app)
      .get('/test_no_cache')
      .expect('cache-control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
      .expect('pragma', 'no-cache')
      .expect('expires', '0')
      .expect('surrogate-control', 'no-store')
  })
})
