import 'module-alias/register'
import { setupApp } from './config/app'

setupApp().then(app => app.listen(3000, () => { console.log(`Server is running in port: ${3000}`) })).catch(e => {
  console.log(e)
})
