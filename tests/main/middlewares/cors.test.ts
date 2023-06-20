import request from 'supertest'
import { setupApp } from './../../../src/main/config/app'
describe('Middlewere Cors', () => {
  test('should open comunication between other devices', async () => {
    const app = setupApp()
    app.get('/test-cors', (req, res) => {
      res.send('')
    })

    await request(app).get('/test-cors').expect('access-control-allow-origin', '*')
    await request(app).get('/test-cors').expect('access-control-allow-methods', '*')
    await request(app).get('/test-cors').expect('access-control-request-headers', '*')
  })
})
