import { App } from './app'
import { Router } from './router'

const port = process.env.PORT
const app = new App().expressApp
const router = new Router().expressRouter

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`)
})


// using express.Router middleware
// could group the route handlers for a particular part of a site together
// and access them using a common route-prefix
app.use('/', router)

