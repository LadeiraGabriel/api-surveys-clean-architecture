import { setupApp } from './config/app'

const app = setupApp()
app.listen(3000, () => { console.log(`Server is running in port: ${3000}`) })
