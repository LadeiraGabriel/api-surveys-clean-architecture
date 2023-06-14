import { setupApp } from './../../../src/main/config/app'
import request from 'supertest'
describe('Body Parser Middleware', () => {
  test('should parse body as json ', async () => {
    const app = setupApp()
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body)
    })

    await request(app).post('/test_body_parser').send({ name: 'gabriel' }).expect({ name: 'gabriel' })
  })
})
