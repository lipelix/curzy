import express from 'express'
import { initializeDbConnection } from './db/init'
import rates from './api/rates'

const app = express()
const PORT = process.env.PORT || 3000;

(async (app: express.Application) => {
  await initializeDbConnection(app)
})(app)

app.use('/api/rates', rates)

app.get('/', async (req, res) => {
  res.send('Welcome on Curzy!')
})

app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`)
})